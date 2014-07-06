import Ember from 'ember';
import ScrambleGenerator from "timinator/utils/scramble-generator";

export default Ember.Controller.extend({
	needs: ["solveMethod", "solve", "solves"],
	solveMethodBinding: "controllers.solveMethod",
	solveBinding: "controllers.solve",
	solvesBinding: "controllers.solves",

	solveMethodStepNames: Ember.computed.mapBy("solveMethod.steps", "name"),

	stepIndex: 0,

	time: 0,
	startTime: 0,
	isTiming: false,

	animationHandle: null,

	newSolve: function(){
		var solveMethod = this.get("solveMethod.model");
		var puzzle = this.get("solveMethod.puzzle");

		var scramble = ScrambleGenerator.generate(puzzle);

		return this.store.createRecord("solve", {
			scramble: scramble,
			solveMethod: solveMethod
		});
	},

	logSolve: function(){
		var oldSolve = this.get("solve.model");

		// Save the solve, then save the steps
		oldSolve.save().then(function(record){
			Ember.RSVP.Promise.all(record.get("stepResults").invoke("save")).then(function(){
				console.log("step results saved ok");
			},
			function(){
				console.log("problem saving step results");
			});
		});

		this.get("solves").unshiftObject(oldSolve); // Probably move this into full save OK handler

		var newSolve = this.newSolve();
		this.get("solve").set("model", newSolve);
	},

	currentStep: function(){
		var stepIndex = this.get("solve.currentStepIndex");
		return this.objectAt(stepIndex);
	}.property("solve.currentStepIndex", "@each"),

	totalTime: function(){
		return this.get("solve.totalTime") + this.get("time");
	}.property("solve.totalTime", "time"),

	timeStep: function(){
		if(!this.get("isTiming")){
			return;
		}
		var elapsed = Date.now() - this.get("startTime");
		this.set("time", elapsed);

		var controller = this;
		var animationHandle = requestAnimationFrame(function(){
			controller.timeStep();
		});

		this.set("animationHandle", animationHandle);
	},

	resetTime: function(){
		this.setProperties({
			time: 0,
			startTime: Date.now()
		});
	},

	actions: {
		step: function(){
			var solve = this.get("solve");

			if(!this.get("isTiming")){
				this.set("isTiming", true);
				this.resetTime();
				this.timeStep();
			}
			else if(solve.advance(this.get("time"))){
				this.resetTime();
			}
			else{
				this.send("stop");
			}
		},

		stop: function(){
			if(!this.get("isTiming")){
				return;
			}

			this.set("isTiming", false);
			cancelAnimationFrame(this.get("animationHandle"));

			this.logSolve();

			// this.set("solve.currentStepIndex");
			this.set("time", 0);
		}
	}
});

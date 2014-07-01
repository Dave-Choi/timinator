export default Ember.ObjectController.extend({
	currentStepIndex: 0,
	numSteps: Ember.computed.alias("solveMethod.steps.length"),

	currentStep: function(){
		var index = this.get("currentStepIndex");
		return this.get("solveMethod.steps").objectAt(index);
	}.property("currentStepIndex", "solveMethod.steps"),

	advance: function(time){
		this.addTime(time);
		
		var index = this.get("currentStepIndex");
		var numSteps = this.get("numSteps");

		if(index < numSteps - 1){
			this.incrementProperty("currentStepIndex");
			return true;
		}
		this.set("currentStepIndex", 0);
		return false;
	},

	addTime: function(time){
		var stepResult = this.store.createRecord("stepResult", {
			solve: this.get("model"),
			step: this.get("currentStep"),
			time: time
		});

		this.get("stepResults").then(function(results){
			results.addObject(stepResult);
		});
	},

	actions: {
		delete: function(){
			this.get("model").destroyRecord();
		}
	}
});

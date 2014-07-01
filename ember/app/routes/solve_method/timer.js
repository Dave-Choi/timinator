export default Ember.Route.extend({
	shortcuts: {
		"space": "step",
		"esc": "stop"
	},

	actions: {
		step: function(){
			this.controllerFor("solveMethod.timer").send("step");
		},
		stop: function(){
			this.controllerFor("solveMethod.timer").send("stop");
		}
	},

	setupController: function(controller){
		var newSolve = controller.newSolve();
		this.controllerFor("solve").set("model", newSolve);
	}
});

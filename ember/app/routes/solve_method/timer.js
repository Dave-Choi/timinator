export default Ember.Route.extend({
	shortcuts: {
		"space": "step"
	},

	setupController: function(controller){
		var newSolve = controller.newSolve();
		this.controllerFor("solve").set("model", newSolve);
	}
});

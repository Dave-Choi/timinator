export default Ember.Route.extend({
	setupController: function(controller){
		var newSolve = controller.newSolve();
		this.controllerFor("solve").set("model", newSolve);
	}
});

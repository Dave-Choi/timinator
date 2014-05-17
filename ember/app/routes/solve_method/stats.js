export default Ember.Route.extend({
	model: function(){
		var solveMethodId = this.modelFor("solveMethod").get("id");

		var personalResults = $.get("api/methodResults/" + solveMethodId);
		var globalBreakdown = $.get("api/methodResults/global/breakdown/" + solveMethodId);

		return Ember.RSVP.hash({
			personalResults: personalResults,
			globalBreakdown: globalBreakdown
		});
	}
});

export default Ember.Route.extend({
	model: function(){
		var solveMethodId = this.modelFor("solveMethod").get("id");

		var personalResults = Ember.$.getJSON("api/methodResults/" + solveMethodId);
		var globalBreakdown = Ember.$.getJSON("api/methodResults/global/breakdown/" + solveMethodId);

		return Ember.RSVP.hash({
			solveMethod: this.modelFor("solveMethod"),
			personalResults: personalResults,
			globalBreakdown: globalBreakdown
		});
	}
});

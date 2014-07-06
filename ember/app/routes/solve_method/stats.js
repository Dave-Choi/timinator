import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var solveMethodId = this.modelFor("solveMethod").get("id");

		var personalResults = Ember.$.getJSON("api/method_results/" + solveMethodId);
		var globalBreakdown = Ember.$.getJSON("api/method_results/global/breakdown/" + solveMethodId);

		return Ember.RSVP.hash({
			solveMethod: this.modelFor("solveMethod"),
			personalResults: personalResults,
			globalBreakdown: globalBreakdown
		});
	}
});

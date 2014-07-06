import Ember from 'ember';
import DS from 'ember-data';

Ember.Inflector.inflector.irregular("solve", "solves");

export default DS.Model.extend({
	scramble: DS.attr("string"),

	stepResults: DS.hasMany("stepResult", { async: true }),
	solveMethod: DS.belongsTo("solveMethod"),

	user: DS.belongsTo("user"),

	puzzleBinding: "solveMethod.puzzle",
	totalTime: DS.attr("number", { defaultValue: 0 }),

	recalculateTotalTime: function(){
		var stepResults = this.get("stepResults");
		var total = 0;

		stepResults.forEach(function(item, index, enumerable){
			total += item.get("time");
		});

		this.set("totalTime", total);
	}.observes("stepResults.@each.time")
});

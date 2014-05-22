Ember.Inflector.inflector.irregular("solve", "solves");

var Solve = DS.Model.extend({
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

function generateFixtures(count){
	var i;
	var fixtures = [];
	for(i = 1; i <= count; i++){
		fixtures.push({
			id: i,
			scramble: "FIXTURE SCRAMBLE",
			solveMethod: 1,
			user: 1
		});
	}

	return fixtures;
}

Solve.reopenClass({
	FIXTURES: generateFixtures(100)
});

export default Solve;
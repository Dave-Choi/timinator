var Puzzle = DS.Model.extend({
	name: DS.attr("string"),
	slug: DS.attr("string"),

	solveMethods: DS.hasMany("solveMethod", { async: true })
});

Puzzle.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "3x3x3",
			slug: "3x3x3",
			solveMethods: [1, 2, 3]
		}
	]
});

export default Puzzle;
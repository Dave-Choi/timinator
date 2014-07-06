import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr("string"),
	slug: DS.attr("string"),

	solveMethods: DS.hasMany("solveMethod", { async: true })
});

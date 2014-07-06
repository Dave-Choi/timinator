import DS from 'ember-data';

export default DS.Model.extend({
	puzzle: DS.belongsTo("puzzle"),
	name: DS.attr("string"),
	description: DS.attr("string")
});

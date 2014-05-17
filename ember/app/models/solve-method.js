export default DS.Model.extend({
	name: DS.attr("string"),
	steps: DS.hasMany("step", {async: true}),
	puzzle: DS.belongsTo("puzzle"),

	isMultiStep: function(){
		return this.get("steps.length") > 1;
	}.property("steps.length")
});

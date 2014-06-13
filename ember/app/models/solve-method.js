export default DS.Model.extend({
	name: DS.attr("string"),
	steps: DS.hasMany("step", {async: true}),
	puzzle: DS.belongsTo("puzzle"),

	isMultiStep: function(){
		var ret = this.get("steps.length") > 1;
		console.log(ret);
		return ret;
	}.property("steps.length")
});

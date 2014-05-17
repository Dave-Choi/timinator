export default DS.Model.extend({
	solve: DS.belongsTo("solve"),
	step: DS.belongsTo("step"),

	time: DS.attr("number")
});

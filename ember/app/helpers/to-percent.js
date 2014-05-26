export default Ember.Handlebars.makeBoundHelper(function(val) {
	// Takes a floating point number, and returns the equivalent whole percent
	// e.g. .12 -> "12%"
	return Math.round(val * 100) + "%";
});

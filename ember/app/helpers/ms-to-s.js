export default Ember.Handlebars.makeBoundHelper(function(val) {
	// Takes a number of milliseconds, returns a fixed precision version in seconds.
	return (val / 1000).toFixed(2);
});

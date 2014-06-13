/*
	Displays a list of Bootstrap nav pills, and sets the one
	that corresponds to currentIndex to class ".active"
*/

export default Ember.Component.extend({
	pills: null, // Array of strings to display as pills
	currentIndex: null,	// index of pill to set as active

	currentIndexChanged: function(){
		var index = this.get("currentIndex");
		this.$("li")
			.removeClass("active")
			.eq(index).addClass("active");
	}.observes("currentIndex", "pills.@each").on("didInsertElement")
});

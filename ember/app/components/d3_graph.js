/* global d3 */

//export default
var D3GraphComponent = Ember.Component.extend({
	d3Container: null,
	graph: null,
	
	attributeBindings: ["width", "height"],
	width: null,
	height: null,

	marginTop: 0,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0,

	innerHeight: function(){    
		return this.get("height") - this.get("marginTop") - this.get("marginBottom");
	}.property("height", "marginTop", "marginBottom"),

	innerWidth: function(){
		return this.get("width") - this.get("marginLeft") - this.get("marginRight");
	}.property("width", "marginLeft", "marginRight"),

	setupGraph: function(){
		var container = this.$()[0];

		var d3Container = d3.select(container).append("svg"); /*
			Appending the SVG element fills out the container, so we
			don't do the height and width calcs until afterward.
		*/

		var width = this.get("width");
		var height = this.get("height");
		if(width === null){
			this.set("width", container.clientWidth);
		}
		if(height === null){
			this.set("height", container.clientHeight);
		}
		var marginLeft = this.get("marginLeft"), marginTop = this.get("marginTop");


		d3Container
			.attr("width", width)
			.attr("height", height);
		this.set("d3Container", d3Container);

		var graph = d3Container.append("g")
			.attr("width", this.get("innerWidth"))
			.attr("height", this.get("innerHeight"))
			.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
		this.set("graph", graph);
	}.on("didInsertElement"),

	updateDimensions: function(){
		var graph = this.get("graph");
		if(!graph) return;

		graph
			.attr("height", this.get("innerHeight"))
			.attr("width", this.get("innerWidth"))
			.attr("transform", "translate(" + this.get("marginLeft") + "," + this.get("marginTop") + ")");
	}.observes("height", "width", "marginTop", "marginRight", "marginBottom", "marginLeft")
});

export default D3GraphComponent;
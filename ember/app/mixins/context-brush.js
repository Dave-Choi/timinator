import Ember from 'ember';

/*
	This mixin is specifically for the D3GraphComponent family of objects.

	It just sets up a brush over the graph body area of the graph component,
	and emits an action, "setContext", which has a low bound and high bound
	parameter, and defaults to the xDomain of the graph if the brush is cleared
	by clicking outside of the brushed area.
 */

export default Ember.Mixin.create({
	onBrush: function(){
		var brush = this.get("brush");
		var extent = brush.extent();
		if(brush.empty()){
			extent = this.get("xDomain");
		}

		this.sendAction("setContext", extent[0], extent[1]);
	},

	setupBrush: function(){
		var component = this;
		var graph = this.get("graph");
		var xScale = this.get("xScale");

		var brush = d3.svg.brush()
			.x(xScale)
			.on("brush", function(e){
				component.onBrush(e);
			});

		var brushContainer = graph.append("g")
			.attr("class", "brush")
			.call(brush);

		brushContainer.selectAll("rect")
			.attr("height", this.get("innerHeight"));

		this.set("brush", brush);
		this.set("brushContainer", brushContainer);
	}
});

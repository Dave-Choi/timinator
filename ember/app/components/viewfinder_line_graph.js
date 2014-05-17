/* global nv, d3 */

/*
	This is a two part graph from the nvd3 library.  The upper segment
	shows a focused segment to view fine detail, while the bottom shows
	an overview where the user can drag out a region of interest.

	Known issues:
		If there are no lines with more than 2 data points, the upper
		segment won't render.
*/
export default Ember.Component.extend({
	tagName: "svg",
	chart: null,
	data: null, /*
		Data is expected as an array of objects of the form:
		{
			key: <string>,
			values: <array of 2D points>
		}

		where points are in the form:
		{
			x: <number>
			y: <number>
		}
	*/

	// Axis tick formats.  y2 is the y axis on the view finder
	xTickFormat: "d",
	yTickFormat: ",.2f",
	y2TickFormat: ",.2f",

	didInsertElement: function(){
		this._super();
		this.setupGraph();
	},

	updateDisabled: function(){
		var component = this;
		var data = component.get("data");
		var disabled = component.get("disabled");
		var len = (data.length < disabled.length) ? data.length : disabled.length;

		for(var i=0; i<len; i++){
			data[i].disabled = disabled[i];
		}

		component.get("chart").update();
	}.observes("disabled"),


	setupGraph: function(){
		var component = this;
		this.$().empty();

		var data = this.get("data") || [];
		var container = this.$()[0];

		var xTickFormat = this.get("xTickFormat");
		var yTickFormat = this.get("yTickFormat");
		var y2TickFormat = this.get("y2TickFormat");

		nv.addGraph(function(){
			var chart = nv.models.lineWithFocusChart();
			chart.lines.scatter.useVoronoi(false);
			chart.lines2.scatter.useVoronoi(false);

			chart.xAxis.tickFormat(d3.format(xTickFormat));
			chart.yAxis.tickFormat(d3.format(yTickFormat));
			chart.y2Axis.tickFormat(d3.format(y2TickFormat));

			d3.select(container)
			.datum(data)
			.transition()
			.duration(500)
			.call(chart);

			nv.utils.windowResize(chart.update);

			component.set("chart", chart);
			window.chart = chart;

			chart.dispatch.on("brush.timinator", function(e){
				var lowBound = e.extent[0];
				var highBound = e.extent[1];
				component.sendAction("setBounds", lowBound, highBound);
			});

			chart.legend.dispatch.on("stateChange.timinator", function(e){
				component.sendAction("setDisabled", e.disabled);
			});

			return chart;
		});
	},

	regraph: function(){
		var data = this.get("data");
		if(!data){
			return;
		}

		var container = this.$()[0];
		var view = this;
		var chart = this.get("chart");

		d3.select(container)
		.datum(data)
		.transition()
		.duration(500)
		.call(chart);

	}.observes("data")
});
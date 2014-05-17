/* global nv, d3 */

export default Ember.Component.extend({
	tagName: "svg",
	chart: null,
	data: null, /*
		Data is expected as an array of objects of the form:
		{
			label: <string>,
			value: <number>
		}
	*/

	updateDisabled: function(){
		var component = this;
		var data = component.get("data");
		var disabled = component.get("disabled");
		var len = (data.length < disabled.length) ? data.length : disabled.length;

		console.log("spread disabled to pie chart", disabled);

		for(var i=0; i<len; i++){
			data[i].disabled = disabled[i];
		}

		component.get("chart").update();
	}.observes("disabled"),

	didInsertElement: function(){
		this._super();
		this.setupGraph();
	},

	setupGraph: function(){
		var component = this;
		this.$().empty();

		var data = this.get("data") || [];
		var container = this.$()[0];

		var showLegend = this.get("showLegend");

		nv.addGraph(function(){
			var chart = nv.models.pieChart().showLegend(showLegend);

			chart.x(function(d){
				return d.label;
			});
			chart.y(function(d){
				return d.value;
			});
			chart.showLabels(true);
			chart.donut(true);

			d3.select(container)
			.datum(data)
			.transition()
			.duration(500)
			.call(chart);

			nv.utils.windowResize(chart.update);

			component.set("chart", chart);

			// chart.legend.dispatch.on("stateChange.pieTiminator", function(e){
			chart.legend.dispatch.on("stateChange.timinator", function(e){
				Ember.run(function(){
					console.log("setting disabled from pie chart", e);
					component.sendAction("setDisabled", e.disabled);
				});
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
		var chart = this.get("chart");

		d3.select(container)
		.datum(data)
		.transition()
		.duration(500)
		.call(chart);

	}.observes("data")
});
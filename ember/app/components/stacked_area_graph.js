/* global d3 */

import D3GraphComponent from 'timinator/components/d3_graph';

export default D3GraphComponent.extend({
	data: [],
	dataValues: Ember.computed.mapBy("data", "values"),

	domainFilteredData: function(){
		var dataValues = this.get("dataValues");
		var xDomainLow = this.get("xDomainLow");
		var xDomainHigh = this.get("xDomainHigh");

		return dataValues.map(function(dataSet){
			return dataSet.filter(function(item){
				return (item.x >= xDomainLow && item.x <= xDomainHigh);
			});
		});
	}.property("dataValues.@each", "xDomainLow", "xDomainHigh"),

	graphLayout: d3.layout.stack(), // "layout" seems to be used for something else in Ember

	layers: function(){
		var domainFilteredData = this.get("domainFilteredData");
		var graphLayout = this.get("graphLayout");
		if(domainFilteredData.length === 0){
			return [];
		}

		return graphLayout(domainFilteredData);
	}.property("domainFilteredData", "graphLayout"),

	marginTop: 30,
	marginBottom: 30,
	marginLeft: 50,
	marginRight: 30,

	// Having these separate lets you bind to them easily from outside the component
	xDomainLow: 0,	
	xDomainHigh: 0,
	xDomain: function(){
		return [this.get("xDomainLow"), this.get("xDomainHigh")];
	}.property("xDomainLow", "xDomainHigh"),

	xDomainChanged: function(){
		var graph = this.get("graph");
		var xScale = this.get("xScale");
		xScale.domain(this.get("xDomain"));
		this.set("xScale", xScale);
		var xAxis = this.get("xAxis");
		xAxis.scale(xScale);
		
		var yScale = this.get("yScale");
		var yAxis = this.get("yAxis");
		yAxis.scale(yScale);

		var area = this.get("area");
		graph.selectAll(".area").attr("d", area);
		graph.select(".x.axis").call(xAxis);
		graph.select(".y.axis").call(yAxis);
	}.observes("xDomain"),

	yDomain: [0, 0],

	xTicks: 10,
	yTicks: 10,

	dataLengthChanged: function(){
		// TODO: Refactor with dataLength property
		this.setupPaths();
		console.log("dataLengthChanged");
		var dataLength = 0;
		var dataValues = this.get("dataValues");
		if(dataValues.length){
			dataLength = dataValues[0].length;
		}

		this.set("xDomainLow", 0);
		this.set("xDomainHigh", dataLength - 1); // Subtract 1, because of zero indexing
	}.observes("dataValues.@each").on("init"),

	xScale: function(){
		console.log("update xScale");
		var data = this.get("data");
		var innerWidth = this.get("innerWidth");

		return d3.scale.linear()
			.domain(this.get("xDomain"))
			.range([0, innerWidth]);
	}.property("innerWidth", "xDomain"),

	yScale: function(){
		console.log("computing yScale");
		var layers = this.get("layers");
		var innerHeight = this.get("innerHeight");

		return d3.scale.linear()
			.domain([
				0, 
				d3.max(layers, function(layer) { 
					return d3.max(
						layer,
						function(d) { 
							return d.y0 + d.y; 
						}
					);
				}) || 0
			])
			.range([innerHeight, 0]);
	}.property("layers", "innerHeight"),

	setupXAxis: function(){
		var graph = this.get("graph");
		var xScale = this.get("xScale");
		var xTicks = this.get("xTicks");

		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(xTicks);

		graph.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this.get("innerHeight") + ")")
			.call(xAxis);

		this.set("xAxis", xAxis);
	},

	setupYAxis: function(){
		var graph = this.get("graph");
		var yScale = this.get("yScale");
		var yTicks = this.get("yTicks");

		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(yTicks);

		graph.append("g")
			.attr("class", "y axis")
			.call(yAxis);
		this.set("yAxis", yAxis);
	},

	area: function(){
		console.log("recompute area");
		var x = this.get("xScale"), y = this.get("yScale");
		return d3.svg.area()
			.x(function(d){
				return x(d.x); 
			})
			.y0(function(d){
				return y(d.y0);
			})
			.y1(function(d){
				return y(d.y0 + d.y);
			});
	}.property("xScale", "yScale"),

	setupPaths: function(){
		var graph = this.get("graph");
		if(!graph) return;

		var layers = this.get("layers");
		var area = this.get("area");

		var color = d3.scale.category20();
		// var count = 0;
		var count = layers.length;

		// graph.selectAll("path.area").remove();
		var paths = graph.selectAll("path.area").data(layers);

		paths.enter()
			.append("path")
				.attr("class", "area");

		paths
			.attr("d", area)
			.style("fill", function(){ 
				return color(count++);
			});

		paths.exit()
			.remove();
	},

	setupGraph: function(){
		this._super();

		this.setupPaths();

		this.setupXAxis();
		this.setupYAxis();
	}.on("didInsertElement")
});

/*
	From: http://jsbin.com/sowep/13/edit

	When practicing a task to develop speed, it can be useful to 
	break it down into steps, and look at individual steps and 
	practice them in isolation, rather than perform the whole task 
	over and over. One way to structure this practice is to find 
	established idealized norms, by looking at top performers, 
	and using their proportions as a target, and simply practicing 
	your worst step until it's no longer your worst step.

	This graph attempts to help visualize the relationship between 
	your own times, and the ideal target, providing a prescriptive 
	course of action at a glance.

	The inner pie chart represents an idealized target proportion. 
	The outer donut represents your own times. The angle of the 
	donut arcs represents the percentage of total time, as expected. 
	The radius of the outer arcs is representative of how great the 
	difference is between your step and the ideal step, as a 
	fraction of your total time.

	For example, if the ideal breakdown is 2:3:2:3, and your times 
	are 6:8:4:4, differences are calculated as [4, 5, 2, 1], 
	by subtracting the ideal from your own. The second step has the 
	greatest difference, so the second segment radius will be the 
	largest, followed by the first, then the third, and finally the 
	fourth. If some of the differences had been equal, the 
	corresponding donut segments would also have been equal in radius.

	Hovering over a pie segment, will also align the starting angle 
	of the corresponding segment of the outer donut, so direct arc 
	comparisons may be done.
*/

var RelativePieChart = Ember.Component.extend({
	tagName: "svg",

	priorities: function(){
		/*
			Priorities are calculated by comparing own percentages to ideal percentages
			These are then normalized to a range of:
				0 (smallest difference in set) to 1 (biggest difference in set)

			The resulting number can then be multiplied by a maximum pixel radius
			to show emphasis on higher priorities
		*/

		var own = this.get("own");
		var ideal = this.get("ideal");

		var ownPercentages = RelativePieChart.normalizeToPercentage(own.mapProperty("value"));
		var idealPercentages = RelativePieChart.normalizeToPercentage(ideal.mapProperty("value"));
		
		var max = -Infinity, min = Infinity;
		
		var diffs = ownPercentages.map(function(obj, index){
			var idealValue = idealPercentages[index];
			var diff = obj - idealValue;
			if(diff > max){
				max = diff;
			}
			if(diff < min){
				min = diff;
			}
			return diff;
		});
		
		var i, len = diffs.length;
		max -= min; /* 
			Diffs will be normalized by subtracting the min, 
			so the max must be adjusted accordingly to have division normalize the max to 1
		*/
		
		for(i=0; i<len; i++){
			var diff = diffs[i];
			
			diff -= min; // Normalize so the lowest value is 0
			diff /= max; // Normalize so the highest value is 1

			diffs[i] = diff;
		}
		
		return diffs;
	}.property("own", "ideal"),
	
	setupGraph: function(){
		var ownData = this.get("own");
		var idealData = this.get("ideal");
	
		var priorities = this.get("priorities");

		var container = this.$()[0];
		var containerCapacity = Math.min(container.clientHeight, container.clientWidth);

		var width = this.get('width') || containerCapacity;
		var height = this.get('height') || containerCapacity;
	
		var radius = Math.min(width, height) / 2; // Maximum radius that fits in the graph
		var innerRadius = radius / 2; // Radius of inner pie
		var outerRadius = radius - innerRadius; // Remaining radius for outer donut
		var minDonutRadius = outerRadius / 4; // Smallest radius for outer donut, for lowest priority
		var outerRadiusRemainder = outerRadius - minDonutRadius; // Available radius for priority scaling
	
		var color = d3.scale.category20();
			
		var innerArc = d3.svg.arc()
			.outerRadius(innerRadius);
		this.set("innerArc", innerArc);

		var outerArc = d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(function(d, i){
				var priority = this.get("priorities")[i]; /* 
					binding `this` and `this.get("priorities")` is used, 
					instead of just `priorities[i]`, because the updated value is needed. 
				*/
				return innerRadius + minDonutRadius + priority * outerRadiusRemainder; 
			}.bind(this));
		this.set("outerArc", outerArc);

		var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) { return d.value; });
		this.set("pie", pie);

		var id = this.$().attr('id');
		var svg = d3.select("#"+id)
				.attr("width", width)
				.attr("height", height);
	
		var initialTransform = "translate(" + width / 2 + "," + height / 2 + ")";
		
		var innerPie = svg.append("g")
			.attr("transform", initialTransform);
		this.set("innerPie", innerPie);

		var outerDonut = svg.append("g")
			.attr("transform", initialTransform);
		this.set("outerDonut", outerDonut);

		var innerArcs = innerPie.selectAll(".arc")
			.data(pie(idealData))
		.enter().append("g")
			.attr("class", "arc")
			.on("mouseover", function(d, i){
				// angleDiff isn't changing when data changes
				var startAngle = d.startAngle;
				var outerStartAngle = d3.select(outerArcs[0][i]).datum().startAngle;
				var angleDiff = startAngle - outerStartAngle;

				outerDonut.selectAll(".arc").transition()
					.duration(500)
					.attr("transform", "rotate(" + RelativePieChart.rad2Deg(angleDiff) + ")")
					.ease();
			}.bind(this));
	
		innerArcs.append("path")
			.attr("d", innerArc)
			.style("fill", function(d, i){ return color(i); });
		
		var outerArcs = outerDonut.selectAll(".arc")
			.data(pie(ownData), function(d){
				if(d){
					return d.data.label;
				}
				// Key function is falsy
				return d;
			})
		.enter().append("g")
			.attr("class", "arc");
		
		outerArcs.append("path")
			.attr("d", outerArc)
			.style("fill", function(d, i){ return color(i); });

	}.on("didInsertElement"),

	updateGraph: function(){
		var own = this.get("own");
		var pie = this.get("pie");
		var outerDonut = this.get("outerDonut");
		var outerArc = this.get("outerArc");

		outerDonut.selectAll(".arc path")
			.data(pie(own), function(d){
				return Ember.get(d, "data.label");
			})
			.attr("d", outerArc);

	}.observes("own", "ideal")
});

RelativePieChart.reopenClass({
	rad2Deg: function(rads){
		return rads * 180 / Math.PI;
	},

	normalizeToPercentage: function(values){
		// Takes an array of values, and turns them into percentages of the sum of all the values.
		var total = 0;
		var i, len = values.length;
		for(i=0; i<len; i++){
			total += values[i];
		}
		return values.map(function(item){
			if(total === 0){
				// Don't divide by zero.
				return 1;
			}
			return item / total;
		});
	}
});

export default RelativePieChart;
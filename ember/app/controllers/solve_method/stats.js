export default Ember.ObjectController.extend({
	// needs: ["solveMethod"],
	lowBound: 0,
	highBound: Infinity,
	disabled: [],

	actions: {
		setContext: function(low, high){
			this.set("lowBound", low);
			this.set("highBound", high);
		},

		setDisabled: function(disabledList){
			this.set("disabled", disabledList);
		}
	},

	pieData: function(){
		// Totals normalized to values between 0 and 1.
		var personalResults = this.get("personalResults");
		var lowBound = this.get("lowBound");
		var highBound = this.get("highBound");
		var disabled = this.get("disabled");
		var overallTotal = 0;

		// Remove the totals for the pie graph
		var stepResults = personalResults.filter(function(item){
			if(item.key === "total"){
				return false;
			}
			return true;
		});

		var stepTotals = stepResults.map(function(item, index){
			var total = 0;
			var i, len = item.values.length;

			for(i=0; i<len; i++){
				var value = item.values[i];
				if(value.x >= lowBound){
					if(value.x > highBound){
						break;
					}
					total += value.y;
				}
			}

			var isDisabled = disabled[index];
			overallTotal += total;
			return {
				label: item.key,
				value: total,
				disabled: isDisabled
			};
		});

		var stepPercentages = stepTotals.map(function(item){
			item.value = item.value / overallTotal;
			return item;
		});

		return stepPercentages;
	}.property("personalResults.@each", "lowBound", "highBound"),

	stepDifferences: function(){
		var pieData = this.get("pieData");
		var globalBreakdown = this.get("globalBreakdown");
		return pieData.map(function(item, index){
			return {
				label: item.label,
				difference: item.value - globalBreakdown[index].value
			};
		});
	}.property("pieData", "globalBreakdown"),

	worstStep: function(){
		var stepDifferences = this.get("stepDifferences");
		if(stepDifferences.length == 0){
			return undefined;
		}
		var worst = stepDifferences[0];
		stepDifferences.forEach(function(item){
			if(item.difference > worst.difference){
				worst = item;
			}
		});
		return worst;
	}.property("stepDifferences"),

	worstPercentDifference: function(){
		return this.get("worstStep.difference");
	}.property("worstStep")
});
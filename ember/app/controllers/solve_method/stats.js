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
		var personalResults = this.get("personalResults");
		var lowBound = this.get("lowBound");
		var highBound = this.get("highBound");
		var disabled = this.get("disabled");

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
			return {
				label: item.key,
				value: total,
				disabled: isDisabled
			};
		});

		return stepTotals;
	}.property("personalResults.@each", "lowBound", "highBound")
});
import Ember from 'ember';

export default Ember.ArrayController.extend({
	totalTimes: Ember.computed.mapBy("model", "totalTime"),
	totalTime: Ember.computed.sum("totalTimes"),

	totalMean: function(){
		return (this.get("totalTime") / this.get("length")) || 0;
	}.property("totalTime", "length")
});

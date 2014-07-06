import Ember from 'ember';
var Em = Ember;

export default Ember.Route.extend({
	model: function(){
		return [
			Ember.Object.create({
				key: "set1",
				values: Em.A([
					{ x: 0, y: 1 },
					{ x: 1, y: 2 },
					{ x: 2, y: 1 }
				])
			})
		];
	}
});
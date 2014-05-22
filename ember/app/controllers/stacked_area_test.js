export default Ember.ArrayController.extend({
	valuesLength: function(){
		return this.get("firstObject.values.length");
	}.property("firstObject.values.length"),

	actions: {
		pushValue: function(){
			this.forEach(function(item, index){
				var values = item.get("values");
				var len = values.length;
				values.pushObject({
					x: len,
					y: Math.floor(Math.random() * 10)
				});
			});
		},

		popValue: function(){
			this.forEach(function(item, index){
				var values = item.get("values");
				values.popObject();
			});
		},

		pushSet: function(){
			var model = this.get("model");
			
			var len = this.get("valuesLength");
			var data = Em.A([]);

			for(var i=0; i<len; i++){
				data.pushObject({
					x: i,
					y: Math.floor(Math.random() * 10)
				});
			}

			model.pushObject(Ember.Object.create({
				key: "set" + (this.get("length") + 1),
				values: data
			}));
		},

		popSet: function(){
			var model = this.get("model");
			model.popObject();
		}
	}

});

function jsonSuccessResponse(obj){
	return [
		200,
		{
			"Content-Type": "application/json"
		},
		JSON.stringify(obj)
	];
}

function mockMethodResults(){
	var steps = ["F2B-1", "F2B-2", "CMLL", "L6E"];
	var results = steps.map(function(item){
		var formatted = {
			key: item,
			values: []
		};
		for(var i=0; i<100; i++){
			var randy = Math.floor(Math.random() * 10000/(i/5+1));
			formatted.values.push({
				x: i,
				y: randy
			});
		}

		return formatted;
	});
	return results;
}

function mockGlobalMethodBreakdown(){
	return [
		{
			"label": "F2B-1",
			"value": 0.2
		},
		{
			"label": "F2B-2",
			"value": 0.3
		},
		{
			"label": "CMLL",
			"value": 0.2
		},
		{
			"label": "L6E",
			"value": 0.2
		}
	];
}

export default {
	name: "api-stub",
	initialize: function(){
		// TODO: Attach this to the container.  This var might end up getting garbage collected.
		var server = new Pretender(function(){
			this.get("/api/methodResults/:id", function(request){
				return jsonSuccessResponse(mockMethodResults());
			});

			this.get("/api/methodResults/global/breakdown/:id", function(request){
				return jsonSuccessResponse(mockGlobalMethodBreakdown());
			});

			this.get("/api/test", function(request){
				return jsonSuccessResponse({
					msg: "This is working."
				});
			});
		});
	}
};

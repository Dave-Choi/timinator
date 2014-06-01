module.exports = function(app) {
  app.get('/api/methodResults/:id', function(req, res) {
    var steps = ["F2B-1", "F2B-2", "CMLL", "L6E"];
	var results = steps.map(function(item, index){
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
	res.send(results);
  });

  app.get('/api/methodResults/global/breakdown/:id', function(req, res){
		res.send([
			{
				"label": "F2B-1",
				"value": 2
			},
			{
				"label": "F2B-2",
				"value": 3
			},
			{
				"label": "CMLL",
				"value": 2
			},
			{
				"label": "L6E",
				"value": 2
			}
		]);
	});
};

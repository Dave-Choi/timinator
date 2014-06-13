var fixtures = require("./fixtures.js")();

module.exports = function(app) {
	app.get('/api/step_results', function(req, res) {
		var stepResults = {
			"step_results": fixtures.stepResults
		};
		res.send(stepResults);
	});

	app.post('/api/step_results', function(req, res){
		// console.log(req);
		var newStepResult = fixtures.create("stepResults", req.body.step_result);
		console.log(newStepResult);
		res.send({
			step_result: newStepResult
		});
	});

	app.get('/api/step_results/:id', function(req, res) {
		var solve = {
			"solve": fixtures.stepResults[0]
		};
		res.send(solve);
	});


};

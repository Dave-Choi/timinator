var fixtures = require("./fixtures.js")();

module.exports = function(app) {
	app.get('/api/solves', function(req, res) {
		var solves = {
			"solves": fixtures.solves
		};
		res.send(solves);
	});

	app.post('/api/solves', function(req, res){
		// console.log(req);
		var newSolve = fixtures.create("solves", req.body.solve);

		res.send({
			solve: newSolve
		});
	});

	app.get('/api/solves/:id', function(req, res) {
		var solve = {
			"solve": fixtures.solves[0]
		};
		res.send(solve);
	});


};

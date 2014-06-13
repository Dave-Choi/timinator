var fixtures = require("./fixtures.js")();

module.exports = function(app) {
  app.get('/api/solve_methods', function(req, res) {
    var solveMethods = {
		"solve-methods": fixtures.solveMethods
	};
	console.log("requested solve-methods", fixtures.find("solveMethods", 3));
	res.send(solveMethods);
  });

  app.get('/api/solve_methods/:id', function(req, res) {

    var solveMethod = {
		"solve-method": fixtures.find("solveMethods", req.params.id)
	};
	console.log("requested single solve-method", req.params.id);
	res.send(solveMethod);
  });
};

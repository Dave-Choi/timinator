var fixtures = require("./fixtures.js")();

module.exports = function(app) {
  app.get('/api/steps', function(req, res) {
    var steps = {
		"steps": fixtures.steps
	};
	res.send(steps);
  });

  app.get('/api/steps/:id', function(req, res) {
    var step = {
		"step": fixtures.steps[0]
	};
	res.send(step);
  });
};

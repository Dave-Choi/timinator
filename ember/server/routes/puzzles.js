var fixtures = require("./fixtures.js")();

module.exports = function(app) {
  app.get('/api/puzzles', function(req, res) {
    var puzzles = {
		"puzzles": fixtures.puzzles
	};
	res.send(puzzles);
  });

  app.get('/api/puzzles/:id', function(req, res) {
    var puzzle = {
		"puzzle": fixtures.puzzles[0]
	};
	res.send(puzzle);
  });
};

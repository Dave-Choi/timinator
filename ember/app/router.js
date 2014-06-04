var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function(){
	this.resource("stackedAreaTest");
	this.resource("puzzles");
	this.resource("puzzle", { path: "puzzles/:puzzle_id" }, function(){
		this.resource("solveMethod", { path: "solveMethods/:solveMethod_id" }, function(){
			this.route("stats");
			this.route("timer");
		});
	});
});

export default Router;

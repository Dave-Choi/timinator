

var StepResult = DS.Model.extend({
	solve: DS.belongsTo("solve"),
	step: DS.belongsTo("step"),

	time: DS.attr("number")
});

function generateFixtures(count){
	var i, j;
	var fixtures = [];
	for(i = 1; i <= count; i++){
		// Make random times, but influence the shape of the curve to start high, and reduce over time
		var randTime = Math.floor(Math.random() * 10000/(i/5+1));
		for(j=1; j<=4; j++){
			fixtures.push({
				id: i,
				solve: i,
				step: j,
				time: randTime
			});
		}
	}

	return fixtures;
}

StepResult.reopenClass({
	FIXTURES: generateFixtures(100)
});

export default StepResult;
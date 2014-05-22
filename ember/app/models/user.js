var User = DS.Model.extend({
	email: DS.attr("string")
});

User.reopenClass({
	FIXTURES: [
		{
			"id": 1,
			"email": "example@example.com"
		}
	]
});

export default User;
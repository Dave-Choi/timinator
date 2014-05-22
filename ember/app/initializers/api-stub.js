function jsonSuccessResponse(obj){
	return [
		200,
		{
			"Content-Type": "application/json"
		},
		JSON.stringify(obj)
	];
}
export default {
	name: "api-stub",
	initialize: function(){
		// TODO: Attach this to the container.  This var might end up getting garbage collected.
		var server = new Pretender(function(){
		});
	}
};

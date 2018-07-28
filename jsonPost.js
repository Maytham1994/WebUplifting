var request = new XMLHttpRequest();
request.open("POST", "https://apiv2.indico.io/emotion", true);
request.send(JSON.stringify({
	'api_key': "cea890a94becdfba119aa7330b0e0250",
	'data': "I did it. I got into Grad School. Not just any program, but a GREAT program. :-)",
	'threshold': 0.0
}));

request.onreadystatechange = function () {
	if(request.readyState === 4 && request.status === 200) {
		console.log(JSON.parse(request.response));
	}
};
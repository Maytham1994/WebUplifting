
// This should get all paragraphs on the page
/* var paragraphs = document.getElementsByTagName('p');
var i;
for (i = 0; i < paragraphs.length; i++) {
    // Now split by sentences
    console.log(paragraphs[i].innerHTML);
	queryParagraphUpliftingFactor(paragraphs[i].innerHTML);
}



function queryParagraphUpliftingFactor(sentence) {
    var request = new XMLHttpRequest();
	request.open("POST", "https://apiv2.indico.io/emotion", true);
	request.send(JSON.stringify({
		'api_key': "cea890a94becdfba119aa7330b0e0250",
		'data': sentence,
		'threshold': 0.0
	}));

	request.onreadystatechange = function () {
		if(request.readyState === 4 && request.status === 200) {
			console.log("Received Response!!");
			console.log(JSON.parse(request.response));
		}
	};
} */

var stringArray = [];
var paragraphs = document.getElementsByTagName('p');
var i;
for (i = 0; i < paragraphs.length; i++) {
    // Now split by sentences
	if ((paragraphs[i].innerHTML !== null) && (paragraphs[i].innerHTML !== ''))
	{
		console.log(strip_html_tags(paragraphs[i].innerHTML));
		stringArray.push(strip_html_tags(paragraphs[i].innerHTML));
	}
}
queryBatchParagraphUpliftingFactor(stringArray);

function queryBatchParagraphUpliftingFactor(sentence) {
    var request = new XMLHttpRequest();
	request.open("POST", "https://apiv2.indico.io/emotion/batch", true);
	request.send(JSON.stringify({
		'api_key': "cea890a94becdfba119aa7330b0e0250",
		'data': sentence,
		'threshold': 0.0
	}));

	request.onreadystatechange = function () {
		if(request.readyState === 4 && request.status === 200) {
			console.log("Received Response!!");
			console.log(JSON.parse(request.response));
		}
	};
}

function strip_html_tags(str)
{
	if ((str===null) || (str===''))
		return false;
	else
		str = str.toString();

	return str.replace(/<[^>]*>/g, '');
}
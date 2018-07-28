var indexArray = [];
var stringArray = [];
var paragraphs = document.getElementsByTagName('p');
var i;
for (i = 0; i < paragraphs.length; i++) {
	if ((paragraphs[i].innerHTML !== null) && (paragraphs[i].innerHTML !== ''))
	{
		stringArray.push(strip_html_tags(paragraphs[i].innerHTML));
		indexArray.push(i);
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
			handleResponse(JSON.parse(request.response));
		}
	};
}

function strip_html_tags(str)
{
	if ((str === null) || (str === ''))
		return false;
	else
		str = str.toString();
	
	return str.replace(/<[^>]*>/g, '');
}

function handleResponse(jSonResponse)
{
	console.log("Got JSON Response, Updating Page");
	console.log(jSonResponse);
	var multiArray = [];
	var i;
	for (i = 0; i < indexArray.length; i++)
	{
		multiArray.push([getValue(jSonResponse.results[i].anger,
								  jSonResponse.results[i].fear,
								  jSonResponse.results[i].joy,
								  jSonResponse.results[i].sadness,
								  jSonResponse.results[i].surprise), indexArray[i]]);
	}
	sortByCol(multiArray, 0);
	
	for (i = 0; i < indexArray.length; i++)
	{
		paragraphs[indexArray[i]].innerHTML = stringArray[multiArray[i][1]].toString();
	}
}

function sortByCol(arr, colIndex){
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[colIndex]
        b = b[colIndex]
        return (a === b) ? 0 : (a > b) ? -1 : 1
    }
}

function getValue(anger, fear, joy, sadness, surprise)
{
	return ((joy * 3)
			- (fear * 1)
			- (anger * 2)
			- (sadness * 0.5)
			+ (surprise * 0))
}
	
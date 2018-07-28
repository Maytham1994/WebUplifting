
// Constant Values
var SENTENCE_MIN_CHAR_COUNT = 25;
var JOY_FACTOR = 3;
var FEAR_FACTOR = -1;
var ANGER_FACTOR = -2;
var SADNESS_FACTOR = -0.5;
var SURPRISE_FACTOR = 0;
var regex = /\d+:\s/g;


// Global Arrays
var pageParagraphCount = [];
var pageSentenceCount = [];
var pageSentences = [];
var pageParagraphElements = document.getElementsByTagName('p');


var i;
for (i = 0; i < pageParagraphElements.length; i++) {
	// Loop through all non empty paragraph elements on the page
	if ((pageParagraphElements[i].innerHTML !== null)
		&& (pageParagraphElements[i].innerHTML !== ''))
	{
		// Remove all HTML tags from paragraphs
		var str = paragraphRemoveHtmlTags(pageParagraphElements[i].innerHTML);
		
		// THIS IS NEEDED FOR SOME REASON
		regex.test(" ");
		// Discard paragraphs with less than SENTENCE_MIN_CHAR_COUNT characters
		if ((str.length > SENTENCE_MIN_CHAR_COUNT)
			&& (regex.test(str) == false))
		{
			// Split paragraph into sentences based on "."
			var sentences = str.split(".");
			
			var goodSentenceCount = 0;

			// Loop through all sentences in the paragraph
			var j;
			for (j = 0; j < sentences.length; j++)
			{
				if ((sentences[j] !== null)
					&& (sentences[j] !== '')
					&& (sentences[j].length > SENTENCE_MIN_CHAR_COUNT)
					&& (sentences[j].indexOf("Last Accessed:") == -1))
				{
					// Add sentence to the total page sentences if it is not empty,
					// and has more than SENTENCE_MIN_CHAR_COUNT characters, then increment good count
					pageSentences.push(sentences[j]);
					goodSentenceCount++;
				}

			}

			// Increment total page paragraph/sentence count if paragraph had any good sentences
			if (goodSentenceCount > 0)
			{
				pageSentenceCount.push(goodSentenceCount);
				pageParagraphCount.push(i);
			}
		}
	}
}

// Query the uplifting factors for the page sentences
querySentencesUpliftingFactors(pageSentences);


function paragraphRemoveHtmlTags(str)
{
	if ((str === null) || (str === ''))
		return false;
	else
		str = str.toString();
	
	return str.replace(/<[^>]*>/g, '');
}


function querySentencesUpliftingFactors(sentencesArray) {
    var request = new XMLHttpRequest();
	request.open("POST", "https://apiv2.indico.io/emotion/batch", true);
	request.send(JSON.stringify({
		'api_key': "cea890a94becdfba119aa7330b0e0250",
		'data': sentencesArray,
		'threshold': 0.0
	}));

	request.onreadystatechange = function () {
		if(request.readyState === 4 && request.status === 200) {
			handleUpliftingServerResponse(JSON.parse(request.response));
		}
	};
}

function handleUpliftingServerResponse(jSonResponse)
{
	console.log("Got JSON Uplifting Response");

	// Loop through and calculate single value uplifting factor
	var upliftingFactorsArray = [];
	var i;
	for (i = 0; i < pageSentences.length; i++)
	{
		upliftingFactorsArray.push([calculateUpliftingSingleFactor(jSonResponse.results[i].anger,
								  jSonResponse.results[i].fear,
								  jSonResponse.results[i].joy,
								  jSonResponse.results[i].sadness,
								  jSonResponse.results[i].surprise), i]);
	}
	// Sort uplifting factors array
	sortUpliftingFactorsMultiArray(upliftingFactorsArray, 0);
	
	console.log("Updating Page With Uplifted Sentences");

	// Update the page paragraphs and sentences based on the uplifting factors calculated
	var j;
	var k = 0;
	for (i = 0; i < pageParagraphCount.length; i++)
	{
		pageParagraphElements[i].innerHTML = "";
		for (j = 0; j < pageSentenceCount[i]; j++)
		{
			pageParagraphElements[i].innerHTML = pageParagraphElements[i].innerHTML + pageSentences[upliftingFactorsArray[j + k][1]].toString();
			k++;
		}
	}
}

function sortUpliftingFactorsMultiArray(arr, colIndex){
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[colIndex]
        b = b[colIndex]
        return (a === b) ? 0 : (a > b) ? -1 : 1
    }
}

function calculateUpliftingSingleFactor(anger, fear, joy, sadness, surprise)
{
	return ((joy * JOY_FACTOR)
			+ (fear * FEAR_FACTOR)
			+ (anger * ANGER_FACTOR)
			+ (sadness * SADNESS_FACTOR)
			+ (surprise * SURPRISE_FACTOR))
}
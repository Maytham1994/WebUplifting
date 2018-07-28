
// This should get all paragraphs on the page
var paragraphs = document.getElementsByTagName('p');
var i;
for (i = 0; i < paragraphs.length; i++) {
    // Now split by sentences
    console.log(paragraphs[i].innerHTML);
}
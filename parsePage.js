
// This should get all paragraphs on the page
document.getElementsByTagName("p").forEach(
    elem => {
        // Will need to further divide by sentence
        console.log(elem.innerHtml);
    }
);
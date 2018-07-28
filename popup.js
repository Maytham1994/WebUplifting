// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
			
let upliftMe = document.getElementById('upliftMe');
upliftMe.style.background="url('images/upliftMe48.png')";   
upliftMe.onclick = function(element) {
	// Change the background of the page to the lovely photo
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			// {code: 'document.body.style.backgroundImage = "url(\'https://image.ibb.co/niVxYo/habib_final_sticker_inverse.png\')";'},
			{code: 'document.body.style.backgroundImage = "url(\'https://www.spreadshirt.com/image-server/v1/mp/designs/12819934,width=178,height=178/happy-stick-figure.png\')";'},
		);
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundSize = "500px 533px";'}
		);
    });

	// Trigger the page parsing and changing
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{file: '/parsePage.js'}
		);
	});	
};

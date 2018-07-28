// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
			
let upliftMe = document.getElementById('upliftMe');
upliftMe.style.background="url('images/upliftMe32.png')";   
upliftMe.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundImage = "url(\'https://image.ibb.co/niVxYo/habib_final_sticker_inverse.png\')";'},
		);
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundSize = "500px 533px";'}
		);
    });

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{file : '/jsonPost.js'}
		);
	});
		
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: '/parsePage.js'}
		);
	});

;

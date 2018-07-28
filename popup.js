// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundColor = "' + color + '";'});
	
/* 		chrome.tabs.executeScript(
			var request = new XMLHttpRequest();
			request.open("POST", "https://apiv2.indico.io/emotion", true);
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			request.send(JSON.stringify({
				'api_key': "cea890a94becdfba119aa7330b0e0250",
				'data': "I did it. I got into Grad School. Not just any program, but a GREAT program. :-)",
				'threshold': 0.1
			}));
		); */
		  
    });
};
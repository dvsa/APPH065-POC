/*

	If the elements marked with the class formHelpBox do not have an id, then one
	is created by this script.
	
	The format is formHelp<n> where n is a positive integer.
	
	RJHurst: 2008-01-17 - This version has been adapted from DirectGov example
	
*/

function createHelpToggle() {
	if (document.getElementById) {
		createHelpToggleDom();
	}
}

function createHelpToggleDom() {
	var mainContent = document.getElementById("TOP_main");
	if (mainContent != null) {
		var allDivs = mainContent.getElementsByTagName("div");
		for(var arrayIndex = 0; arrayIndex < allDivs.length; arrayIndex++){
			var div = allDivs[arrayIndex];
			if (div.className.match("\\bTOP_formElement\\b")) {
				var helpLink = getElement(div, "a", "helpLink");
				var formHelp = getElement(div, "div", "formHelpBox");
				var closeLink = getElement(div, "p", "helpClose");
				
				// display help link
				if (helpLink != null && formHelp != null && closeLink != null) {
					/*
						the onclick responds to a mouse click and also if the user 
						has tabbed to the link they can press the Enter key
					*/
					helpLink.onclick = displayHelp;
					helpLink.display = 1;
					helpLink.formHelp = formHelp;
					
					if (formHelp.id == "") {
						formHelp.id = "formHelp" + arrayIndex;
					}
					
					// for IE
					if (closeLink.childNodes[0] != null && closeLink.childNodes[0].tagName == "A") {
					  
						closeLink.childNodes[0].onclick = displayHelp;
						closeLink.childNodes[0].display = 0;
						closeLink.childNodes[0].formHelp = formHelp;
						closeLink.childNodes[0].setAttribute("href", "#" + formHelp.id);
						
					}
					
					// for firefox
					if (closeLink.childNodes[1] != null && closeLink.childNodes[1].tagName == "A") {
					  
						closeLink.childNodes[1].onclick = displayHelp;
						closeLink.childNodes[1].display = 0;
						closeLink.childNodes[1].formHelp = formHelp;
						closeLink.childNodes[1].setAttribute("href", "#" + formHelp.id);
						
					}
					
					if (closeLink.childNodes[0] != null) {
					
						helpLink.style.display = "inline";
						helpLink.setAttribute("href", "#" + formHelp.id);
						formHelp.style.display = "none";
						closeLink.style.display = "block";
					}
				}
			}
		}
	}
}


function getElement(parentDiv, tagName, className) {
	var foundElement = null;
	var allElements = parentDiv.getElementsByTagName(tagName);
	for(var arrayIndex = 0; arrayIndex < allElements.length; arrayIndex++){
		var element = allElements[arrayIndex];
		if (element.className.match("\\b" + className + "\\b")) {
			foundElement = element;
			break;
		}
	}
	return foundElement;
}


function displayHelp(evt) {
	var evt = (evt) ? evt : event;

	// Netscape 6 needs currentTarget rather then targer
	var link = (evt.currentTarget != null) ? evt.currentTarget : event.srcElement;
	if (link != null && link.formHelp != null) {
	   
		if (link.display) {
			link.formHelp.style.display = "block";
		} else {
			link.formHelp.style.display = "none";
		}
	}
}

window.onload = createHelpToggle;

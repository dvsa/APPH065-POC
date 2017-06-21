var bookingWindow;
var isDSACancellationComplete = "false";
var isExitApp = false;
function launchTestCentres(){
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	document.getElementById("tclink").style.display = "block";
	var urlParameters = "?app=testcentre";
	var url = urlNetui + urlParameters;
	this.openNewWindow(url, "testCentreScreen", 800, 520);
}
function launchSectors() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=sector";
	var url = urlNetui + urlParameters;
	openNewWindowWithOptions(url, "Sectors", 800,500, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	//window.open(url, "Sectors", "width=800,height=500,top= 250,left= 15,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchAreas() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=area";
	var url = urlNetui + urlParameters;
	openNewWindowWithOptions(url, "Areas", 800,380, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	//window.open(url, "Areas", "width=800,height=380,top= 250,left= 15,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchBooking() {
	//Check if the window is already open
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=booking";
	var url = urlNetui + urlParameters;
	if (!bookingWindow || bookingWindow.closed) {
		bookingWindow = this.openNewWindow(url, "Booking", 800, 560);		
	}else if(!bookingWindow.closed && isBookingWindowBusy()){
		bookingWindow.focus();
	}else{
		bookingWindow.close();
		bookingWindow = this.openNewWindow(url, "Booking", 800, 560);
	}
}


//May be Necessary to move this function into its own Javascript libraray
//at some point in the future as it is to do with the Booking Screen.
//however when this is done some imports on Different Screen may require updating.
/**
 * Function Checks to see if the booking window is busy.
 * @return true if the Window is busy, false if not.
 */ 
function isBookingWindowBusy() {
	if (window.document.leftpane) {
		if (window.document.leftpane.bookingWindowBusy.value == "true") {
			return true;
		}
	}
	if(window.opener) {		
		if(window.opener.document.leftpane) {
			if (window.opener.document.leftpane.bookingWindowBusy.value == "true") {
				return true;
			}
		}
		if(window.opener.window.opener) {
			if(window.opener.window.opener.document.leftpane) {
				if (window.opener.window.opener.document.leftpane.bookingWindowBusy.value == "true") {
					return true;
				}
			}
		}
	}
	return false;
}

function setDSACancellationCompleted(isExitApp1) {
	if(window.opener) {		
		if(window.opener.document.leftpane) {
			window.opener.isDSACancellationComplete = true;
			if(isExitApp1 == true) {
				window.opener.isExitApp = true;
			}else {
				window.opener.isExitApp = false;
			}
		}
		if(window.opener.window.opener) {
			if(window.opener.window.opener.document.leftpane) {
				if(isExitApp1 == true) {
					window.opener.window.opener.isExitApp = true;
				}else {
					window.opener.window.opener.isExitApp = false;
				}
			}
		}
	}
}

function openBooking(url) {
	if(bookingWindow && !bookingWindow.closed) {
		bookingWindow.navigate(url);
		bookingWindow.focus();
	}else {
		bookingWindow = openNewWindow(url, "Booking", 800, 600);
	}
	isDSACancellationComplete = false;
	opener.isExitApp = false;
}
/**
 * Function Checks to see if the booking window is open.
 * bookingWindowOpen is the value that is being checked.
 * @return true if the Booking Window is open, false if not.
 */
function isBookingWindowOpen() {
	//Check if the Booking Window Varaible is set
	if (window.document.leftpane) {
		if (window.document.leftpane.bookingWindowOpen.value == "true") {
			return true;
		}
	}
	//Check if there is a window opener
	if(window.opener) {
		//Check if there is a left pane in the window opener 
		if(window.opener.document.leftpane) {			
			if (window.opener.document.leftpane.bookingWindowOpen.value == "true") {
				return true;
			}
		} 
		//Check if there is a left pane nested in the window opener 
		if(window.opener.window.opener) {
			if(window.opener.window.opener.document.leftpane) {
				if (window.opener.window.opener.document.leftpane.bookingWindowOpen.value == "true") {
					return true;
				}
			}
		}
	}
	//If there is no value found then it is assumed that this is no window open
	return false;
}

/**
 * Function Sets the Open status of the booking window (bookingWindowOpen).
 * if the statusValue is false then the Busy Status will also be set to false.
 * @param statusValue	The Status Value to set the open window to. "true" = open and "false" = closed.
 */
function setBookingWindowOpenStatus(statusValue) {
	//Set the Value in the window level
	if (window.document.leftpane) {
		window.document.leftpane.bookingWindowOpen.value = statusValue;
	}
	//Check there is a window opener
	if(window.opener) {
		//Set the Value in the Window Opener
		if(window.opener.document.leftpane) {
			window.opener.document.leftpane.bookingWindowOpen.value = statusValue;
		} 
		//Set the value in the nested window opener
		if(window.opener.window.opener) {
			if(window.opener.window.opener.document.leftpane) {
				window.opener.window.opener.document.leftpane.bookingWindowOpen.value = statusValue;
			}
		}
	}
	//If the Status of the Window is being set to closed then the Window will be closed
	if (statusValue == "false") {
		setBookingWindowBusyStatus(false);
	}
}

/**
 * Function Sets the Busy status of the booking window (bookingWindowBusy).
 * @param statusValue	The Status Value to set the busy window to. "true" = busy and "false" = not busy.
 */
function setBookingWindowBusyStatus(statusValue) {
	//Set the Value in the window level
	if (window.document.leftpane) {
		window.document.leftpane.bookingWindowBusy.value = statusValue;
	}
	//Check there is a window opener
	if(window.opener) {
		//Set the Value in the Window Opener
		if(window.opener.document.leftpane) {
			window.opener.document.leftpane.bookingWindowBusy.value = statusValue;	
		} 
		//Set the value in the nested window opener
		if(window.opener.window.opener) {
			if(window.opener.window.opener.document.leftpane) {
				window.opener.window.opener.document.leftpane.bookingWindowBusy.value = statusValue;
			}
		}
	}
}
function launchDelegatedExaminer() {
	openNewWindowWithOptions("delegatedexaminer/MaintainDelegatedExaminerDetails.form", "Examiner", 800,550, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchDelegatedAuthority() {
	openNewWindowWithOptions("delegatedexaminer/MaintainDASite.form", "Authority", 800,550, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchGovernmentGatewayRegistration(service) {
	openNewWindowWithOptions("governmentgateway/GovernmentGatewayRegistration.form?service=" + service, "GovernmentGateway", 436, 300, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}

function launchExaminer() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=examiner";
	var url = urlNetui + urlParameters;
	openNewWindowWithOptions(url, "Examiner", 800,550, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	//window.open(url, "Examiner", "width=800,height=550,top= 250,left= 15,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchBusiness() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=business";
	var url = urlNetui + urlParameters;
	this.openNewWindow(url, "Business", 800, 580);
}
function launchNationalWorkPatterns() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=workpatterns";
	var url = urlNetui + urlParameters;
	openNewWindowWithOptions(url, "NationalWorkPatterns", 800,410, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	//window.open(url, "NationalWorkPatterns", "width=820,height=390,top= 250,left= 15,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchReleaseSlots() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=releaseslots";
	var url = urlNetui + urlParameters;
	openNewWindowWithOptions(url, "ReleaseSlots", 800,520, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	//window.open(url, "ReleaseSlots", "width=800,height=520,top= 100,left= 15,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}
function launchDVProgrammes() {
	var urlNetui = document.leftpane.urlRequestDispatcher.value;
	var urlParameters = "?app=dvprogrammes";
	var url = urlNetui + urlParameters;
	this.openNewWindow(url, "Programmes", 800, 550);
}
function notImplemented() {
	alert("Not Implemented yet!");
}
function callPostCodeLookup(searchParams, formname) {
	//assumption..
	//if supplied param is only one. then it is postcode
	//if both are being supplied then it is for addline1 and postcode
	//order to be remain same
	var add1 = "";
	var postcode = "";
	if (searchParams.length == 1) {
		postcode = searchParams[0];
	} else if (searchParams.length == 2) {
		add1 = searchParams[0];
		postcode = searchParams[1];
	}
	var urlParameters = "paramAdd1=" + add1 + "&" + "paramPostCode=" + postcode;
	var url = "/DSAWeb/address/callCommonPostCodeLookup.do?"+urlParameters;
	if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	var screenMode = "";
	httpRequest.open("GET", url, true);
	httpRequest.onreadystatechange = function() {processPostCodeLookupRequest(screenMode, formname); } ;
	httpRequest.send(null);
}
function processPostCodeLookupRequest(screenMode, formname) {
	if (httpRequest.readyState == 4) {
		if(httpRequest.status == 200) {
			//get the XML send by the servlet
			var addressXML = httpRequest.responseXML.getElementsByTagName("ADDRESSDET");
			if (addressXML != null) {
				if (addressXML.length > 1) {
					//open a new popup with address list
					displayAddressList(addressXML, screenMode, formname);
				} else if (addressXML.length == 0) {
					alert("No address found.");
				} else {
					// Make sure the postcode is valid.
					if (addressXML[0].getElementsByTagName("POSTCODE")[0].childNodes.length > 0) {
						var postcode = addressXML[0].getElementsByTagName("POSTCODE")[0].firstChild.nodeValue;
						if (postcode != null && postcode != "null") {
							//update the address.
							updateAddressHTML(addressXML, screenMode, formname);
						} else {
							alert("No address found.");
						}
					} else {
						alert("No address found.");
					}
				}
			}
		}
		else {
			alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
		}
	}
}
function updateAddressHTML(addressXML, screenMode, formname) {
	//alert(addressXML.length);
	var add1 = "";
	var add2 = "";
	var add3 = "";
	var add4 = "";
	var add5 = "";
	var postcode = "";
	if (addressXML.length > 0) {
		if (addressXML[0].getElementsByTagName("ADDRESSLINE1")[0].childNodes.length > 0) {
			add1 = addressXML[0].getElementsByTagName("ADDRESSLINE1")[0].firstChild.nodeValue;
			if (add1 == "null") { add1 = ""; }
		}
		if (addressXML[0].getElementsByTagName("ADDRESSLINE2")[0].childNodes.length > 0) {
			add2 = addressXML[0].getElementsByTagName("ADDRESSLINE2")[0].firstChild.nodeValue;
			if (add2 == "null") { add2 = ""; }
		}
		if (addressXML[0].getElementsByTagName("ADDRESSLINE3")[0].childNodes.length > 0) {
			add3 = addressXML[0].getElementsByTagName("ADDRESSLINE3")[0].firstChild.nodeValue;
			if (add3 == "null") { add3 = ""; }
		}
		if (addressXML[0].getElementsByTagName("ADDRESSLINE4")[0].childNodes.length > 0) {
			add4 = addressXML[0].getElementsByTagName("ADDRESSLINE4")[0].firstChild.nodeValue;
			if (add4 == "null") { add4 = ""; }
		}
		if (addressXML[0].getElementsByTagName("ADDRESSLINE5")[0].childNodes.length > 0) {
			add5 = addressXML[0].getElementsByTagName("ADDRESSLINE5")[0].firstChild.nodeValue;
			if (add5 == "null") { add5 = ""; }
		}
		if (addressXML[0].getElementsByTagName("POSTCODE")[0].childNodes.length > 0) {
			postcode = addressXML[0].getElementsByTagName("POSTCODE")[0].firstChild.nodeValue;
		}
	}
	//now assigning the values to form elements
	//assumptions is first form will be index and second will be main
	//to be changed later..form name will be passed
	if (screenMode == "") {
		var form = eval("document." + formname);
		form.add1.value = add1;
		form.add2.value = add2;
		form.add3.value = add3;
		form.add4.value = add4;
		if (form.add5 != null) {
			form.add5.value = add5;
		}
		
		//document.forms[1].add1.value = add1;
		form.postCode.value = postcode;
	} else if (screenMode == "cpc") {
		var docLocation; 
		
		if (window.name == "AddressList") { 
			docLocation = window.opener.document;
		} else {
		    docLocation = document;
		}
		docLocation.getElementById(formname + ".addressLine1").value = add1;
		docLocation.getElementById(formname + ".addressLine2").value = add2;
		docLocation.getElementById(formname + ".addressLine3").value = add3;
		docLocation.getElementById(formname + ".addressLine4").value = add4;
		docLocation.getElementById(formname + ".addressLine5").value = add5;
		docLocation.getElementById(formname + ".postCode").value = postcode;
		// close the list if we had more than one result
		if (window.name == "AddressList") {
		    window.close();
		}
	} else {
		var form = eval("window.opener.document." + formname);
		form.add1.value = add1;
		form.add2.value = add2;
		form.add3.value = add3;
		form.add4.value = add4;
		if (form.add5 != null) {
			form.add5.value = add5;
		}
		form.postCode.value = postcode;
		window.close();
	}
}
//new popup
function displayAddressList(addressXML, screenmode, formname) {
	var ilen = addressXML.length;
	var url = "/DSAWeb/address/combinedAddressList.jsp";
	//addListWin=window.parent.open(url, "AddressList", "width=440,height=435,titlebar=1,status=1,scrollbars=0,resizable=0");
	addListWin = openNewWindowWithOptionsParent(url, "AddressList",440,435,"titlebar=1,status=1,scrollbars=0,resizable=0");
	addListWin.document.open();
	var content = "<link href=\"/DSAWeb/framework/markup/shell/support/css/tars.css\" type=\"text/css\" rel=\"STYLESHEET\">"
	 + "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/DSAFunctions.js\" type=\"text/javascript\"></script>"
	 + "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/common-script.js\" type=\"text/javascript\"></script>"
	 + "<link href=\"/DSAWeb/framework/markup/shell/support/css/tars.css\" type=\"text/css\" rel=\"STYLESHEET\">"
	 + "<title>Address Lookup</title>"
	 + "<form name=\"frmAddressList\" method=\"POST\">"
	 + "<div class=\"content-box\" style=\"overflow:none; width:436px; height:430px;\">"
	 + "<table border=\"0\" width=\"429\">"
	 + "<tr><td height=\"5px\"><td></tr><tr>"
	 + "<td align=\"left\"><div style=\"overflow:auto; width:422px;\">"
	 + "<table height=\"15\" width=\"405\" border=\"0\">"
	 + "<tr class=\"SlotRow\">"
	 + "<td align=\"center\" nowrap=\"nowrap\" class=\"HeadertableCenter\">Address List</td>"
	 + "</tr></table></div></td>"
	 + "</tr><tr><td height=\"5px\"><td></tr><tr>"
	 + "<td ><div style=\"overflow:auto; width:100%; height:350px;\">"
	 + "<table border=\"0\"  width=\"100%\">";
	for (var i = 0; i < ilen; i++) {
		var combadd = "";
		var monikar = "";
		if (addressXML[i].getElementsByTagName("COMBINEDADDRESS")[0].childNodes.length > 0) {
			combadd = addressXML[i].getElementsByTagName("COMBINEDADDRESS")[0].firstChild.nodeValue;
		}
		if (addressXML[i].getElementsByTagName("MONIKAR")[0].childNodes.length > 0) {
			monikar = addressXML[i].getElementsByTagName("MONIKAR")[0].firstChild.nodeValue;
		}
		var l = i +1 ;
		var m = "addtr" + l;
		content = content + "<tr id='"+m+"' class='SlotRow' onmousedown='javascript:selectAddRow("+l+",\""+monikar+"\");'>"
		 + "<td class ='CellText'>" + combadd +"</td></tr>";
	}
	content = content + "</table></div></td></tr><tr align=\"center\"><td>"
	 + "<input type=\"button\" name=\"addList_select\" class=\"enabledButton\" value=\"OK\" onclick='javascript:selectAddress(\"" + formname + "\", \"" + screenmode + "\")';>"
	 + "&nbsp;<input type=\"button\" name=\"addList_cancel\" class=\"enabledButton\" value=\"Cancel\" onclick=\"javascript:window.close()\";>"
	 + "</td></tr></table></div></form>";
	addListWin.document.write(content);
	addListWin.document.close();
}
var SelectedMinikar;
function selectAddRow(rowId, monikar) {
	SelectedMinikar = monikar;
	flag = true;
	rowNum=1;
	while (flag) {
		if(document.getElementById("addtr"+rowNum))	{
			document.getElementById("addtr"+rowNum).style.background='#ffffff';
			document.getElementById("addtr"+rowNum).style.color='#9c0030';
			rowNum++;
		} else {
			flag=false;
		}
	}
	document.getElementById("addtr"+rowId).style.background='#0000ff';
	document.getElementById("addtr"+rowId).style.color='#ffffff';
}
function selectAddress(formname, screenmode) {
	if (SelectedMinikar == null || SelectedMinikar == "") {
		alert("Please Select Address.");
	} else {
		var urlParameters = "paramMonikar=" + SelectedMinikar;
		var url = "/DSAWeb/address/returnFromAreaList.do?"+urlParameters;
		if (window.ActiveXObject) {
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
		}

		if (screenmode == "cpc") {
		    screenMode = "cpc";
		} else {
    		screenMode = "areaList";
		}
		httpRequest.open("GET", url, true);
		httpRequest.onreadystatechange = function() {processPostCodeLookupRequest(screenMode, formname); } ;
		httpRequest.send(null);
	}
}
function printscreen() {
	alert("This functionality will be provided later");
}
/*
*@param pkcolumnname - array of pk column names
*@param pkvalue - array of pk values
*function to call audit details
*/
function callAuditDetails(tablename,arrPkcolumnname,arrPkvalue,header) {
	var urlParameters = "";
	urlParameters = urlParameters + "tablename=" + tablename;
	if (arrPkcolumnname != null && arrPkcolumnname != "" && arrPkcolumnname.length > 0) {
		var iLenPKcolumnname = arrPkcolumnname.length;
		for (var i = 0; i < iLenPKcolumnname; i++) {
			var k = i + 1;
			urlParameters = urlParameters + "&" + "pkcolumnname" + k + "=" + arrPkcolumnname[i];
			urlParameters = urlParameters + "&" + "pkvalue" + k + "=" + arrPkvalue[i];
			if (i==0) {
				urlParameters = urlParameters + "&" + "pkPairLength=" + iLenPKcolumnname;
			};
		}
	} else {
		alert("Error:Column value pair mismatch");
		return;
	}
	var url = "/DSAWeb/commonServices/displayAuditDetails.do?"+urlParameters;
	if (window.ActiveXObject)
	{
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest)
	{
		httpRequest = new XMLHttpRequest();
	}
	httpRequest.open("GET", url, true);
	httpRequest.onreadystatechange = function() {processAuditDetsRequest(header); } ;
	httpRequest.send(null);
}
function processAuditDetsRequest(header) {
	if (httpRequest.readyState == 4) {
		if(httpRequest.status == 200) {
			//get the XML send by the servlet
			var auditXML = httpRequest.responseXML.getElementsByTagName("AUDITDET");
			if (auditXML != null) {
				updateAuditHTML(auditXML, header);
			}
		}
		else {
			alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
		}
	}
}
function updateAuditHTML(auditXML, header) {
	var error = "";
	var userNameCreated = "";
	var createdDate = "";
	var userNameModified = "";
	var modifiedDate = "";
	if (auditXML[0].getElementsByTagName("ERROR")[0].childNodes.length > 0) {
		error = auditXML[0].getElementsByTagName("ERROR")[0].firstChild.nodeValue;
	}
	if (error == "Y" || error == "y") {
		alert("No audit details found.");
	} else {
		userNameCreated = convertNullToEmpty(auditXML[0].getElementsByTagName("CREATEDBY")[0].firstChild.nodeValue);
		createdDate = convertNullToEmpty(auditXML[0].getElementsByTagName("CREATEDDATE")[0].firstChild.nodeValue);
		userNameModified = convertNullToEmpty(auditXML[0].getElementsByTagName("UPDATEDBY")[0].firstChild.nodeValue);
		modifiedDate = convertNullToEmpty(auditXML[0].getElementsByTagName("UPDATEDDATE")[0].firstChild.nodeValue);
		var url = "/DSAWeb/commonServices/auditDetails.jsp";
		var auditWin;
		//auditWin=window.parent.open(url, "AuditDetails", "width=470,height=260,titlebar=1,status=1,scrollbars=0,resizable=0");
		auditWin = openNewWindowWithOptionsParent(url, "AuditDetails",468,278,"titlebar=1,status=1,scrollbars=0,resizable=0");
		auditWin.document.open();
		var content = "<html>" + "<head>" + "<title>" + header + "</title>";
		content = "<link href=\"/DSAWeb/framework/markup/shell/support/css/tars.css\" type=\"text/css\" rel=\"STYLESHEET\">";
		content = content + "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/DSAFunctions.js\" type=\"text/javascript\"></script>";
		content = content + "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/common-script.js\" type=\"text/javascript\"></script>";
		content = content + "</head>";
		content = content + "<body>";
		content = content + "<div class=\"content-box\" style=\"width:460px;height:266px;\">";
		content = content + "<form name=\"frmAuditDet\" method=\"POST\">";
		content = content + "<table border=\"0\" width=\"440px\">";
		content = content + "<tr><td colspan=\"2\" align=\"left\" class=\"PageTitle\">"+ header +"<BR></td></tr>";
		content = content + "<tr><td colspan=\"2\">" + "&nbsp;" + "</td></tr>";
		content = content + "<tr><td colspan=\"2\">"
		content = content + "<div class=\"content-box\" style=\"width:440px;height:70px;\">";
		content = content + "<table border=\"0\" width=\"430px\">";
		content = content + "<tr><td colspan=\"2\" align=\"left\" class=\"TextLeft\">"+"<b>"+ "Creation" +"</b>" +"<BR></td></tr>";
		content = content + "<tr>";
		content = content + "<td width=\"30%\" class=\"TextPaddingLeft\" nowrap=\"true\">User Name:</td>";
		content = content + "<td width=\"70%\"><input type=\"text\" class=\"TextRequiredLong\" value='"+userNameCreated+"' disabled=\"true\"></td>";
		content = content + "</tr>";
		content = content + "<tr>";
		content = content + "<td width=\"30%\" class=\"TextPaddingLeft\" nowrap=\"true\">Creation Date:</td>";
		content = content + "<td width=\"70%\"><input type=\"text\" class=\"TextRequiredNormal\" value='"+createdDate+"' disabled=\"true\"></td>";
		content = content + "</tr>";
		content = content + "</table>";
		content = content + "</div>";
		content = content + "</td>";
		content = content + "</tr>";
		content = content + "<tr><td colspan=\"2\">"
		content = content + "<div class=\"content-box\" style=\"width:440px;height:70px;\">";
		content = content + "<table border=\"0\" width=\"430px\">";
		content = content + "<tr><td colspan=\"2\" align=\"left\" class=\"TextLeft\">"+"<b>"+ "Last modified"+"</b>" +"<BR></td></tr>";
		content = content + "<tr>";
		content = content + "<td width=\"30%\" class=\"TextPaddingLeft\" nowrap=\"true\">User Name:</td>";
		content = content + "<td width=\"70%\"><input type=\"text\" class=\"TextRequiredLong\" value='"+userNameModified+"' disabled=\"true\"></td>";
		content = content + "</tr>";
		content = content + "<tr>";
		content = content + "<td width=\"30%\" class=\"TextPaddingLeft\" nowrap=\"true\">Last Modified Date:</td>";
		content = content + "<td width=\"70%\"><input type=\"text\" class=\"TextRequiredNormal\" value='"+modifiedDate+"' disabled=\"true\"></td>";
		content = content + "</tr>";
		content = content + "</table>";
		content = content + "</div>";
		content = content + "</td>";
		content = content + "</tr>";
		content = content + "<tr>";
		content = content + "<td colspan=\"2\">";
		content = content + "&nbsp;"
		content = content + "</td>";
		content = content + "</tr>";
		content = content + "<tr align=\"center\">";
		content = content + "<td colspan=\"2\">";
		content = content + "<input type=\"button\" name=\"addList_select\" class=\"enabledButton\" value=\"OK\" onclick=\"javascript:window.close()\";>";
		content = content + "&nbsp;"
		content = content + "<input type=\"button\" name=\"addList_cancel\" class=\"enabledButton\" value=\"Help\" onclick=\"javascript:callHelp()\";>";
		content = content + "</td>";
		content = content + "</tr>";
		content = content + "</table>";
		content = content + "</form>";
		content = content + "</div>";
		content = content + "</body>";
		content = content + "</html>";
		auditWin.document.write(content);
		auditWin.document.close();
	}
}
/**
	*   Used for document history
	*   @param refType - Reference Type
	*   @param refValue - Reference Value
	*   function to call document history
	*/
function callDocumentHistory(refType, refValue, display, header) {
	var validData = true;
	if (refType == "" || refValue == "" || display == "") {
		alert("Invalid Data");
		validData = false;
	}
	if (refType == "Application Ref" || refType == "Instructor Ref" || refType == "BusinessUnitRef") {
		validData = true;
	} else {
		alert("Invalid Reference Type");
		validData = false;
	}
	if(validData) {
		var urlParameters = "";
		urlParameters = urlParameters + "paramRefType=" + refType;
		//alert("here 2");
		urlParameters = urlParameters + "&" + "paramRefValue=" + refValue;
		urlParameters = urlParameters + "&" + "paramDisplay=" + display;
		//alert("here 3"+urlParameters);
		var url = "/DSAWeb/commonServices/displayDocumentHistory.do?"+urlParameters;
		if (window.ActiveXObject) {
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
		}
		//alert("here 4");
		httpRequest.open("GET", url, true);
		httpRequest.onreadystatechange = function() {processDocHistRequest(header,refType, refValue, "", display); } ;
		httpRequest.send(null);
	}
}
function processDocHistRequest(header, refType, refValue, mode, display) {
	if (httpRequest.readyState == 4) {
		if(httpRequest.status == 200) {
			//get the XML send by the servlet
			var docHistXML = httpRequest.responseXML.getElementsByTagName("DOCHISTORY");
			if (docHistXML != null) {
				updateDocHistHTML(docHistXML, header, refType, refValue, mode, display);
			}
		}
		else {
			alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
		}
	}
}
function processDocHistRequestWithUrl(header, refType, refValue, mode, display, url) {
	if (httpRequest.readyState == 4) {
		if(httpRequest.status == 200) {
			//get the XML send by the servlet
			var docHistXML = httpRequest.responseXML.getElementsByTagName("DOCHISTORY");
			if (docHistXML != null) {
				updateDocHistHTMLWithUrl(docHistXML, header, refType, refValue, mode, display, url);
			}
		}
		else {
			alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
		}
	}
}
function updateDocHistHTML(docHistXML, header, refType, refValue, mode, display) {
	var iLength = docHistXML.length;
	//Added on 14-06-2007
	if (iLength > 0) {
		if (docHistXML[0].getElementsByTagName("ERRORFLAG")[0].firstChild.nodeValue == "true") {
			var errorcode = docHistXML[0].getElementsByTagName("ERRORCODE")[0].firstChild.nodeValue;
			alert(errorcode);
			if (document.getElementById("divDocHist_Dtls")) {
			    document.getElementById("divDocHist_Dtls").innerHTML = "";
			}
		} else{
			var error = "";
			var batchId = "";
			var sequenceNo = "";
			var actionee = "";
			var submittedDate = "";
			var confirmedDate = "";
			var prodTypeCode = "";
			var docDesc = "";
			//////data content .. dynamic
			var dataContent = "";
			dataContent = dataContent + "<table border=\"0\" width=\"100%\" cellspacing=\"1\" cellpadding=\"1\" >";
			for (var i = 0; i < iLength; i++) {
				if (docHistXML[i].getElementsByTagName("BATCH_ID")[0].childNodes.length > 0) {
					batchId = convertNullToEmpty(docHistXML[i].getElementsByTagName("BATCH_ID")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("SEQUENCE_NO")[0].childNodes.length > 0) {
					sequenceNo = convertNullToEmpty(docHistXML[i].getElementsByTagName("SEQUENCE_NO")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("ACTIONEE")[0].childNodes.length > 0) {
					actionee = convertNullToEmpty(docHistXML[i].getElementsByTagName("ACTIONEE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("SUBMITTED_DATE")[0].childNodes.length > 0) {
					submittedDate = convertNullToEmpty(docHistXML[i].getElementsByTagName("SUBMITTED_DATE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("CONFIRMED_DATE")[0].childNodes.length > 0) {
					confirmedDate = convertNullToEmpty(docHistXML[i].getElementsByTagName("CONFIRMED_DATE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("PROD_TYPE_CODE")[0].childNodes.length > 0) {
					prodTypeCode = convertNullToEmpty(docHistXML[i].getElementsByTagName("PROD_TYPE_CODE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("DOCUMENT_DESC")[0].childNodes.length > 0) {
					docDesc = convertNullToEmpty(docHistXML[i].getElementsByTagName("DOCUMENT_DESC")[0].firstChild.nodeValue);
				}
				var l = i +1 ;
				var m = "dochisttr" + l;
				dataContent = dataContent + "<tr id='"+m+"' class='SlotRow' onmousedown='javascript:selectDocHistoryRow("+l+","+batchId+","+sequenceNo+",\""+submittedDate+"\");' >"
				+ "<td width=\"10%\" align=\"left\"  class ='CellText'>" + batchId +"</td>"
				+ "<td width=\"12%\" align=\"left\"  class ='CellText'>" + prodTypeCode +"</td>"
				+ "<td width=\"13%\" align=\"left\"  class ='CellText'>" + actionee +"</td>"
				+ "<td width=\"12%\" align=\"left\"  class ='CellText'>" + sequenceNo +"</td>"
				+ "<td width=\"10%\" align=\"left\"  class ='CellText'>" + submittedDate +"</td>"
				+ "<td width=\"13%\" align=\"left\"  class ='CellText'>" + confirmedDate +"</td>"
				+ "<td width=\"32%\" align=\"left\"  class ='CellText'>" + docDesc +"</td>"
				+ "</tr>";			
			}
			dataContent = dataContent + "</table>";
			//////end ..data content .. dynamic
			if (mode == "") {
				var url = "/DSAWeb/commonServices/pp_DocumentHistory.jsp";
				var docHistWin;
				//docHistWin = window.parent.open(url, "DocumentHistory", "width=680,height=410,titlebar=1,status=1,scrollbars=0,resizable=1");
				//docHistWin = window.parent.open(url, "DocumentHistory","width=680,height=300,titlebar=1,status=1,scrollbars=0,resizable=1");
				docHistWin = openNewWindowWithOptionsParent(url, "DocumentHistory",660,300,"titlebar=1,status=1,scrollbars=0,resizable=0");
				docHistWin.document.open();
				var content = "<html>" + "<head>" + "<title>" + header + "</title>";
				content = content + "<link href=\"/DSAWeb/framework/markup/shell/support/css/tars.css\" type=\"text/css\" rel=\"STYLESHEET\">"
				+ "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/DSAFunctions.js\" type=\"text/javascript\"></script>"
				+ "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/common-script.js\" type=\"text/javascript\"></script>"
				+ "</head>"
				+ "<body>"
				+ "<form method=\"POST\" name=\"frmDocHistory\">"
				// + "<table border=\"0\"  width=\"670px\" cellspacing=\"1\" cellpadding=\"1\">";
				+ "<table border=\"0\"  width=\"658px\" cellspacing=\"1\" cellpadding=\"1\">";
				content = content + "<tr>"
				+ "<td colspan=\"7\" align=\"Left\" class=\"TextLeft\" >" + "Display" + "&nbsp;"
				+ "<select  name=\"frmDH_Display\" class=\"TextRequiredLeft\" onChange=\"javascript:callDocumentHistoryBasedOnDispParam();\">";
				if(display == 'All') {
					content = content + "<option value=\"3\">3 Months</option>"
					+ "<option value=\"2\">1 Year</option>"
					+ "<option value=\"1\" selected>All</option>";
				} else if(display == '1') {
					content = content + "<option value=\"3\">3 Months</option>"
					+ "<option value=\"2\" selected>1 Year</option>"
					+ "<option value=\"1\" >All</option>";
				} else {
					content = content + "<option value=\"3\"  selected >3 Months</option>"
					+ "<option value=\"2\">1 Year</option>"
					+ "<option value=\"1\" >All</option>";
				}
				content = content + "</select>"
				+ "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td colspan=\"7\" >" + "&nbsp;"
				+ "</td>"
				+ "</tr>"
				+ "<tr class=\"SlotRow\">"
				/*
								+ "<td width=\"10%\" class=\"Headertable\">Batch Id</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Prod Code</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Actionee</td>"
								+ "<td width=\"10%\" class=\"Headertable\">Seq Number</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Submitted</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Confirmed</td>"
								+ "<td width=\"32%\" class=\"Headertable\">Document Description</td>"
								*/
				+ "<td width=\"10%\" class=\"Headertable\">Batch Id&nbsp;</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Prod Code</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Actionee</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Seq Number</td>"
				+ "<td width=\"10%\" class=\"Headertable\">Submitted</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Confirmed</td>"
				+ "<td width=\"32%\" class=\"Headertable\">Document Description</td>"
				+ "</tr>"
				+ "</table>";
				content = content 
				//+ "<div id=\"divDocHist_Dtls\" style=\"overflow-y: scroll; width:655px; height:290px;\">"
				+ "<div class=\"contentnoborder\" id=\"divDocHist_Dtls\" style=\"y-overflow:scroll; x-overflow:auto;width:658px; height:200px;\">"
				//first time
				+ dataContent
				+ "</div>"
				//+ "<br>"
				+ "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" align=\"center\">"
				+ "<tr>"
				//+ "<td valign=bottom >"
				+ "<td valign=\"top\" align=\"center\">"
				+ "<input type=\"hidden\" name=\"frmDH_ParamrefType\" value=\""+refType+"\"/>"
				+ "<input type=\"hidden\" name=\"frmDH_ParamrefValue\" value=\""+refValue+"\"/>"
				+ "<input type=\"hidden\" name=\"frmDH_Paramheader\" value=\""+header+"\"/>"
				+ "<input type=button class=\"enabledButton\" name=\"frmDH_ReprintBtn\" value='Reprint' onclick=\"javascript:callReprint()\"/>&nbsp;"
				+ "<input type=button class=\"enabledButton\" name=\"frmDH_OkBtn\" value='OK' onclick=\"javascript:window.close();\" />&nbsp;"
				+ "<input type=button class=\"enabledButton\" name=\"frmDH_HelpBtn\" value='Help' onclick=\"javascript:callHelp()\"/>"
				+ "</td>"
				+ "</tr>"
				+ "</table>"
				+ "</form>"
				+ "</body>"
				+ "</html>";
				docHistWin.document.write(content);
				docHistWin.document.close();
			} else {
				document.getElementById("divDocHist_Dtls").innerHTML = dataContent;
				document.getElementById("frmDH_OkBtn").disabled = false;
				document.getElementById("frmDH_OkBtn").className = 'enabledButton';
			}
		}
	}
}

function updateDocHistHTMLWithUrl(docHistXML, header, refType, refValue, mode, display, url) {
	var iLength = docHistXML.length;
	//Added on 14-06-2007
	if (iLength > 0) {
		if (docHistXML[0].getElementsByTagName("ERRORFLAG")[0].firstChild.nodeValue == "true") {
			var errorcode = docHistXML[0].getElementsByTagName("ERRORCODE")[0].firstChild.nodeValue;
			alert(errorcode);
		} else {
			var error = "";
			var batchId = "";
			var sequenceNo = "";
			var actionee = "";
			var submittedDate = "";
			var confirmedDate = "";
			var prodTypeCode = "";
			var docDesc = "";
			//////data content .. dynamic
			var dataContent = "";
			dataContent = dataContent + "<table border=\"0\" width=\"658px\" cellspacing=\"1\" cellpadding=\"1\" >";
			for (var i = 0; i < iLength; i++) {
				if (docHistXML[i].getElementsByTagName("BATCH_ID")[0].childNodes.length > 0) {
					batchId = convertNullToEmpty(docHistXML[i].getElementsByTagName("BATCH_ID")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("SEQUENCE_NO")[0].childNodes.length > 0) {
					sequenceNo = convertNullToEmpty(docHistXML[i].getElementsByTagName("SEQUENCE_NO")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("ACTIONEE")[0].childNodes.length > 0) {
					actionee = convertNullToEmpty(docHistXML[i].getElementsByTagName("ACTIONEE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("SUBMITTED_DATE")[0].childNodes.length > 0) {
					submittedDate = convertNullToEmpty(docHistXML[i].getElementsByTagName("SUBMITTED_DATE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("CONFIRMED_DATE")[0].childNodes.length > 0) {
					confirmedDate = convertNullToEmpty(docHistXML[i].getElementsByTagName("CONFIRMED_DATE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("PROD_TYPE_CODE")[0].childNodes.length > 0) {
					prodTypeCode = convertNullToEmpty(docHistXML[i].getElementsByTagName("PROD_TYPE_CODE")[0].firstChild.nodeValue);
				}
				if (docHistXML[i].getElementsByTagName("DOCUMENT_DESC")[0].childNodes.length > 0) {
					docDesc = convertNullToEmpty(docHistXML[i].getElementsByTagName("DOCUMENT_DESC")[0].firstChild.nodeValue);
				}
				var l = i +1 ;
				var m = "dochisttr" + l;
				dataContent = dataContent + "<tr id='"+m+"' class='SlotRow' onmousedown='javascript:selectDocHistoryRow("+l+","+batchId+","+sequenceNo+",\""+submittedDate+"\");' >"
				+ "<td width=\"10%\" align=\"left\"  class ='CellText'>" + batchId +"</td>"
				+ "<td width=\"12%\" align=\"left\"  class ='CellText'>" + prodTypeCode +"</td>"
				+ "<td width=\"12%\" align=\"left\"  class ='CellText'>" + actionee +"</td>"
				+ "<td width=\"12%\" align=\"left\"  class ='CellText'>" + sequenceNo +"</td>"
				+ "<td width=\"10%\" align=\"left\"  class ='CellText'>" + submittedDate +"</td>"
				+ "<td width=\"12%\" align=\"left\"  class ='CellText'>" + confirmedDate +"</td>"
				+ "<td width=\"32%\" align=\"left\"  class ='CellText'>" + docDesc +"</td>"
				+ "</tr>";			
			}
			dataContent = dataContent + "</table>";
			//////end ..data content .. dynamic
			if (mode == "") {
                //url passed as a parameter
				//var url = "/DSAWeb/commonServices/pp_DocumentHistory.jsp";
				var docHistWin;
				//docHistWin = window.parent.open(url, "DocumentHistory", "width=680,height=410,titlebar=1,status=1,scrollbars=0,resizable=1");
				//docHistWin = window.parent.open(url, "DocumentHistory","width=680,height=300,titlebar=1,status=1,scrollbars=0,resizable=1");
				docHistWin = openNewWindowWithOptionsParent(url, "DocumentHistory",660,300,"titlebar=1,status=1,scrollbars=0,resizable=0");
				docHistWin.document.open();
				var content = "<html>" + "<head>" + "<title>" + header + "</title>";
				content = "<link href=\"/DSAWeb/framework/markup/shell/support/css/tars.css\" type=\"text/css\" rel=\"STYLESHEET\">"
				+ "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/DSAFunctions.js\" type=\"text/javascript\"></script>"
				+ "<script language=\"JavaScript1.1\" src=\"/DSAWeb/framework/scripts/common-script.js\" type=\"text/javascript\"></script>"
				+ "</head>"
				+ "<body>"
				+ "<form method=\"POST\" name=\"frmDocHistory\">"
				// + "<table border=\"0\"  width=\"670px\" cellspacing=\"1\" cellpadding=\"1\">";
				+ "<table border=\"0\"  width=\"658px\" cellspacing=\"1\" cellpadding=\"1\">";
				content = content + "<tr>"
				+ "<td colspan=\"7\" align=\"Left\" class=\"TextLeft\" >" + "Display" + "&nbsp;"
				+ "<select  name=\"frmDH_Display\" class=\"TextRequiredLeft\" onChange=\"javascript:callDocumentHistoryBasedOnDispParam();\">";
				if(display == 'All') {
					content = content + "<option value=\"0\">All</option>"
					+ "<option value=\"1\">3 Months</option>"
					+ "<option value=\"2\">1 Year</option>";
				} else if(display == '1') {
					content = content + "<option value=\"0\">1 Year</option>"
					+ "<option value=\"1\">3 Months</option>"
					+ "<option value=\"2\">All</option>";
				} else {
					content = content + "<option value=\"0\">3 Months</option>"
					+ "<option value=\"1\">1 Year</option>"
					+ "<option value=\"2\">All</option>";
				}
				content = content + "</select>"
				+ "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td colspan=\"7\" >" + "&nbsp;"
				+ "</td>"
				+ "</tr>"
				+ "<tr class=\"SlotRow\">"
				/*
								+ "<td width=\"10%\" class=\"Headertable\">Batch Id</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Prod Code</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Actionee</td>"
								+ "<td width=\"10%\" class=\"Headertable\">Seq Number</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Submitted</td>"
								+ "<td width=\"12%\" class=\"Headertable\">Confirmed</td>"
								+ "<td width=\"32%\" class=\"Headertable\">Document Description</td>"
								*/
				+ "<td width=\"10%\" class=\"Headertable\">Batch Id&nbsp;</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Prod Code</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Actionee</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Seq Number</td>"
				+ "<td width=\"10%\" class=\"Headertable\">Submitted</td>"
				+ "<td width=\"12%\" class=\"Headertable\">Confirmed</td>"
				+ "<td width=\"32%\" class=\"Headertable\">Document Description</td>"				
				+ "</tr>"
				+ "</table>";
				content = content 
				//+ "<div id=\"divDocHist_Dtls\" style=\"overflow-y: scroll; width:655px; height:290px;\">"
				+ "<div id=\"divDocHist_Dtls\" style=\"overflow-y:auto; width:658px; height:200px;\">"
				//first time
				+ dataContent
				+ "</div>"
				//+ "<br>"
				+ "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" align=\"center\">"
				+ "<tr>"
				//+ "<td valign=bottom >"
				+ "<td valign=\"top\" align=\"center\">"
				+ "<input type=\"hidden\" name=\"frmDH_ParamrefType\" value=\""+refType+"\"/>"
				+ "<input type=\"hidden\" name=\"frmDH_ParamrefValue\" value=\""+refValue+"\"/>"
				+ "<input type=\"hidden\" name=\"frmDH_Paramheader\" value=\""+header+"\"/>"
				+ "<input type=button class=\"enabledButton\" name=\"frmDH_ReprintBtn\" value='Reprint' onclick=\"javascript:callReprint()\"/>&nbsp;"
				+ "<input type=button class=\"enabledButton\" name=\"frmDH_OkBtn\" value='OK' onclick=\"javascript:window.close();\" />&nbsp;"
				+ "<input type=button class=\"enabledButton\" name=\"frmDH_HelpBtn\" value='Help' onclick=\"javascript:callHelp()\"/>"
				+ "</td>"
				+ "</tr>"
				+ "</table>"
				+ "</form>"
				+ "</body>"
				+ "</html>";
				docHistWin.document.write(content);
				docHistWin.document.close();
			} else {
				document.getElementById("divDocHist_Dtls").innerHTM = dataContent;
			}
		}
	}
}


/*
* Used for document history
*   function to call document history
*/
function callDocumentHistoryBasedOnDispParam() {
	var paramdisplay = document.frmDocHistory.frmDH_Display.value;
	var paramrefType = document.frmDocHistory.frmDH_ParamrefType.value;
	var paramrefValue = document.frmDocHistory.frmDH_ParamrefValue.value;
	var paramheader = document.frmDocHistory.frmDH_Paramheader.value;
	//alert("paramrefType:  " + paramrefType);
	//alert(paramrefValue);
	//alert(paramheader);
	var urlParameters = "";
	urlParameters = urlParameters + "paramRefType=" + paramrefType;
	urlParameters = urlParameters + "&" + "paramRefValue=" + paramrefValue;
	urlParameters = urlParameters + "&" + "paramDisplay=" + paramdisplay;
	var url = "/DSAWeb/commonServices/displayDocumentHistory.do?" + urlParameters;
	if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	httpRequest.open("GET", url, true);
	httpRequest.onreadystatechange = function() {processDocHistRequest(paramheader,paramrefType, paramrefValue, "redisplay", paramdisplay); } ;
	httpRequest.send(null);
}
//Added on 16-05-2007
var selectedBatchId = "";
var selectedSeqId = "";
var selectedSubmittedDate = "";
function selectDocHistoryRow(rowId, batchId, seqId, submittedDate) {
	selectedBatchId = batchId;
	selectedSeqId = seqId;
	selectedSubmittedDate = submittedDate;
	flag = true;
	rowNum=1;
	while (flag)	{
		if(document.getElementById("dochisttr"+rowNum))	{
			document.getElementById("dochisttr"+rowNum).style.background='#ffffff';
			document.getElementById("dochisttr"+rowNum).style.color='#013771';
			rowNum++;
		} else	 {
			flag=false;
		}
	}
	document.getElementById("dochisttr"+rowId).style.background='#0000ff';
	document.getElementById("dochisttr"+rowId).style.color='#ffffff';
}
function callReprint() {
	if (selectedBatchId == "") {
		alert("Please select a document");
		return;
	}
	if (selectedSubmittedDate == "") {
		alert("You cannot request a reprint yet. The print" + '\n' + "system has not yet attempted to print the batch." + '\n' + "This usually happens shortly after the document" + '\n' + "request is made.");
		return;
	}
	var urlParameters = "paramDocumentBatchId=" + selectedBatchId 
	                  + "&paramDocumentSeqId=" + selectedSeqId;
	var url = "/DSAWeb/commonServices/reprint.do?" + urlParameters;
	if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	httpRequest.open("GET", url, true);
	httpRequest.onreadystatechange = function() {processReprintRequest(); } ;
	httpRequest.send(null);
}
function processReprintRequest() {
	if (httpRequest.readyState == 4) {
		if(httpRequest.status == 200) {
			//get the XML send by the servlet
			var docHistXML = httpRequest.responseXML.getElementsByTagName("DOCHISTORY");
			if (docHistXML != null) {
				displayReprintMessage(docHistXML);
			}
		}
		else {
			alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
		}
	}
}
function displayReprintMessage(docHistXML) {
	if (docHistXML.length > 0) {
		var errorcode = docHistXML[0].getElementsByTagName("ERRORCODE")[0].firstChild.nodeValue;
		alert(errorcode);
		if (docHistXML[0].getElementsByTagName("ERRORFLAG")[0].firstChild.nodeValue == "false") {
			window.close();
		}
	}
}
/*
* AboutApp
*/
function callAboutApp() {
	openNewWindowWithOptions("/DSAWeb/aboutApp.jsp", "aboutAppWin", 300,140, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=1,resizable=1");
	//window.open("/DSAWeb/aboutApp.jsp", "aboutAppWin" , "width= 300,height=140,top= 250,left= 250,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=1,resizable=1");
}
/*
* Help
*/
function callHelp() {	
	openNewWindowWithOptions("/DSAWeb/commonHelp.htm", "helpWin", 283,109, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
}

function startMenu() {
	if (document.all&&document.getElementById) {
		cssmenu = document.getElementById("csstopmenu");
		if (cssmenu != null) {
			for (i=0; i<cssmenu.childNodes.length; i++) {
				node = cssmenu.childNodes[i];
				if (node.nodeName=="LI") {
					node.onmouseover=function() { this.className+=" over"; }
					node.onmouseout=function(){ this.className=this.className.replace(" over", "") }
				}
			}
		}
	}
}

function printAppCommunicationHistory() {
	var appId = document.frmDocHistory.frmDH_ParamrefValue.value;
	var reportParamName = "P_APP_ID" + "@PN@" + "P_USER_ID";
    var reportParamValue = appId + "@PV@" + "21"; //user id will be added by server function.
	
	var urlParameters = "documentId=" + "70" + 
		"&reportParamName=" + reportParamName + 
		"&reportParamValue=" + reportParamValue + 
		"&productionType=" + "1";
 	var url = "/DSAWeb/commonServices/createDocumentRequestinCommon.do?";
    //forming the parameters for url
    if (window.ActiveXObject) {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); 
    } else if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    }
    httpRequest.open("POST", url, false); 
    httpRequest.onreadystatechange = function() { processCreateDocReq(); } ; 
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    httpRequest.send(urlParameters);
}

/**
* This function processes the document request messages.
* It reads from the xml.
*/
function processCreateDocReq() {
    if (httpRequest.readyState == 4) {
        if(httpRequest.status == 200) {
            var docReqMsgXML = httpRequest.responseXML.getElementsByTagName("MESSAGEDET"); 
            if (docReqMsgXML != null) {
                updateDocumentReqMsg(docReqMsgXML); 
            }
        } else {
            alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText); 
        } 
    }
}
/**
* This function creates the document request messages.
*/
function updateDocumentReqMsg(docReqMsgXML) {
    var errorFlag = "";
    var message = "";
    //var batchRequestId ="";
    if (docReqMsgXML.length > 0) {
        errorFlag = convertNullToEmpty(docReqMsgXML[0].getElementsByTagName("ERROR_FLAG")[0].firstChild.nodeValue);
        message = convertNullToEmpty(docReqMsgXML[0].getElementsByTagName("ERROR_MSG")[0].firstChild.nodeValue);
        batchRequestId = convertNullToEmpty(docReqMsgXML[0].getElementsByTagName("BATCH_REQUEST_ID")[0].firstChild.nodeValue);
    }
    if (errorFlag == "true") {
        log.debug("doc req message = " + message);
        alert("Document Request failed. \nThis may be because the document is not" +
			" configured to do the required action \nor because of an internal System Error. \nPlease contact the System Administrator.");
    }
}


/**
* This function horizontally synchronises two divs for scrolling purposes.
*/
function scrollSyncX(srcid,destid) {
	src = document.getElementById(srcid);
	dest = document.getElementById(destid);
	dest.scrollLeft=src.scrollLeft;
}

function isValidPostCode() {
	if((event.keyCode>=48&&event.keyCode<=57) || (event.keyCode>=97&&event.keyCode<=122) || (event.keyCode>=65&&event.keyCode<=90) || event.keyCode==32) {
		return true;
	}
	return false;
}
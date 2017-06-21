/**
 * Make an Ajax request.
 * parameter list: 
 *   url - URL to request to
 *   parameters - parameters to add to request
 *   callbackFunction - function to invoke on reply
 *
 * This function selects the appropriate control object for the the client environment,
 * invokes a POST request to the supplied URL (encoding the supplied parameters in the 
 * body of the request) and invokes the supplied callback function on a response. 
 * Note that these "ajax" calls are, in fact synchronous (3rd parameter to httpRequest.open).
 * Existing TARS calls all seem to be synchronous, and it's kinda late in the day to change this. 
 */
function makeAjaxRequest(url, parameters, callbackFunction) {
//    log.info("makeAjaxRequest() - start");
//    log.debug("makeAjaxRequest() "
//      + ", url=" + url
//      + ", params=" + parameters
//      + ", callbackFunction=" + callbackFunction);
      
    //
    // create appropriate http object for environment
    if (window.ActiveXObject) {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    }
    // There is rarely a good reason to make a GET request to an Ajax call rather than a POST.
    // If there are persistent effects from the call, then it has to be a POST
    // If not, then in most cases we have to consider the information retrieved as highly volatile,
    // in which case we'd want to avoid all possible client and proxy caching of prior requests which 
    // usually apply to GET requests (subject to cache control headers on the response).
    // In nearly all cases, making a POST request is the right answer.
    // Feel free to write your own GET version of this function if you're sure you need one.
	httpRequest.open("POST", url, false);
	//httpRequest.onreadystatechange = function() {logFunction(callbackFunction);};
	httpRequest.onreadystatechange = callbackFunction;
	httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    httpRequest.send(parameters);
//    log.info("makeAjaxRequest() - end");
}    

/**
 * Invokes the url specified with the parameters passed and returns a single return value (String).
 * Note that this always appends the ? to the url and the paramUUid.
 * Note you must also include the script /DSAWeb/framework/scripts/uuid.js
 * @param url			The url to invoke
 * @param parameters	The parameter to pass through to the url
 * @return				The return value of the request (May be null)
 */
function makeCommonRequest(url, parameters) {
	//alert("URL: " + url);
	//alert("Parameters: " + parameters);
	
	var returnValue = null;
	
	url += "?paramUUid=" + new UUID();
	makeAjaxRequest(url, parameters, function() { returnValue = processCommonResponse(); })
	
	return returnValue;
}

/**
 * Returns the return value from the common request.
 * @return	the response object (XML containing the values use getCommonResponseValue method)
 */
function processCommonResponse() {
	if (httpRequest.readyState == 4) {
		//alert("Status: " + httpRequest.status);  
		if(httpRequest.status == 200) {
			if (handleSessionTimeoutAndFatalErrors(httpRequest.responseText)) { return; }
			//get the XML sent by the servlet
			//alert(httpRequest.responseText);
			var responseMessageXML = httpRequest.responseXML.getElementsByTagName("RESPONSE");
			if (responseMessageXML != null) {
				if (responseMessageXML.length > 0) {
					return responseMessageXML[0];
				}	
			}
		} else {
			alert("Error loading page\n"+ httpRequest.status +":"+ httpRequest.statusText);
		}
	}
	return null;
}

/**
 * Gets a value from the common response.
 * @param responseObject	The response object
 * @param name				The name of the variable
 * @return					The value associated with the variable name
 */
function getCommonResponseValue(responseObject, name) {
	return responseObject.getElementsByTagName(name)[0].firstChild.nodeValue;
}

/**
 * Checks whether a value is null, "null" or blank (empty string).
 * Removes any white space in the check so " " is classes as blank etc.
 * Note that if you are expecting the word "null" this will think that it is blank
 * @param testValue			The value to test
 * @return					Whether the test value is blank
 */
function isBlank(testValue) {
	if (testValue != null && testValue != "null" && testValue.replace(/^\s*|\s*$/g, "").length > 0) {
		return false;
	}
	return true;
}

function logFunction(realFunction) {
  log.debug("logFunction() - start");
  log.debug("logFunction(), calling " + realFunction);
  realFunction();
  log.debug("logFunction() - end");
}
  

document.onhelp =
function () {
	openNewWindowWithOptions("/DSAWeb/helpCommon.jsp", "helpWin", 285, 120, "titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	//window.open("/DSAWeb/helpCommon.jsp", "helpWin" , "width= 285,height= 120,top= 250,left= 250,titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0");
	return false;
};
document.onkeydown = function () {
	if(event.keyCode==113)	{
		window.print();
		event.keyCode = 0;
		event.returnValue = false;
		event.cancelBubble = true;
		return false;
	} else if (event.keyCode==112)	{
		return false;
	}
}

//common function added by anil
function openNewWindow(jspName,windowName,width,height){
	var url = jspName;
	var width = width;
	var height = height;
	var nLeft = (window.screen.width) ? (window.screen.width - width)/2 : 0;
	var nTop = (window.screen.height) ? (window.screen.height - height)/2 : 0;
	var properties = "width=" + width + ",height=" + height + ",top=" + nTop + ",left=" + nLeft + ",titlebar=1,menubar=0,toolbar=0,location=0,status=1,scrollbars=0,resizable=0";
	var newName = windowName;

	var newWindow;
	if (typeof dialogArguments === "undefined") {
		newWindow = window.open(url, newName , properties, true);
	} else {
		newWindow = dialogArguments.window.open(url, newName , properties, true);
	}
	
	newWindow.opener = window.self;
	return newWindow;
}


//added by winston coleman to add options
//Please NOTE that there have been issues where openNewWindow has been invoked when a window with the
//same name already exists.  If a window with the same name already exists, then the new window will replace it (Common Javascript Feature).
//Unfortunately under this circumstance the parent window (window opener) will no longer be the original window that opened the first instance
//but the first instance itself.  
/*
* Window 1 -> opens Window 2 (Window Name - "Kevin").
* Window 2 -> opens Window 3 (Window Name - "Kevin").
* Window 2 now disappears.
* Window 3 has a parent of Window 2 (could cause issues).
*/
//So in this case the calling function to openNewWindow will need to update the opener on the new window so that 
//it has the correct orignal window reference. 
// Please see Defect 12110 and getTcWorkPatternSlots() method of tcAvaialbleWp.js for an example
function openNewWindowWithOptions(jspName,windowName,width,height, options){
	var url = jspName;
	var width = width;
	var height = height;
	var nLeft = (window.screen.width) ? (window.screen.width - width)/2 : 0;
	var nTop = (window.screen.height) ? (window.screen.height - height)/2 : 0;
	var options = (options);
	var properties = "width=" + width + ",height=" + height + ",top=" + nTop + ",left=" + nLeft + "," + options;
	var newName = windowName;

	var newWindow;
	if (typeof dialogArguments === "undefined" || typeof dialogArguments.window === "undefined") {
		newWindow = window.open(url, newName , properties, true);
	} else {
		newWindow = dialogArguments.window.open(url, newName , properties, true);
	}

	newWindow.opener = window.self;
	return newWindow;
}
//common function added by winston coleman
//as above but for window.parent
function openNewWindowWithOptionsParent(jspName,windowName,width,height, options){
	var url = jspName;
	var width = width;
	var height = height;
	var nLeft = (window.screen.width) ? (window.screen.width - width)/2 : 0;
	var nTop = (window.screen.height) ? (window.screen.height - height)/2 : 0;
	var options = (options);
	var properties = "width=" + width + ",height=" + height + ",top=" + nTop + ",left=" + nLeft + "," + options;
	var newName = windowName;
	
	var newWindow;
	if (typeof dialogArguments === "undefined" || typeof dialogArguments.window === "undefined") {
		newWindow = window.open(url, newName , properties, true);
	} else {
		newWindow = dialogArguments.window.open(url, newName , properties, true);
	}
	
	newWindow.opener = window.self;	
	return newWindow;
}


//common function addded by winston coleman
//to place modal dialogs in centre of screen
function openModalDialog(jspName,arguments,width,height, options) {
	var url = jspName;
	var width = width;
	var height = height+35;
	var nLeft = (window.screen.width) ? (window.screen.width - width)/2 : 0;
	//inexplicably modal dialogs are slightly off centre, line below is a noddy fix to correct this
	nLeft += 6;
	var nTop = (window.screen.height) ? (window.screen.height - height)/2 : 0;
	var options = (options);
	var properties = "dialogWidth:" + width + "px;dialogHeight:" + height + "px;dialogTop:" + nTop + "px;dialogLeft:" + nLeft + "px;" + options;
	
	if (typeof arguments === "undefined" || typeof arguments === "string") {
		arguments = new Object();
		arguments.window = window;
	}
	   
	var newWindow = window.showModalDialog(url, arguments, properties);
	//Note IE does not support window.opener for modal windows
	return newWindow;
}

//common function addded by sameer shah
//to open modal dialogs with arguments
function openModalDialogWithArguments(jspName,arguments,width,height, options) {
	var url = jspName;
	var width = width;
	var height = height+35;
	var nLeft = (window.screen.width) ? (window.screen.width - width)/2 : 0;
	//inexplicably modal dialogs are slightly off centre, line below is a noddy fix to correct this
	nLeft += 6;
	var nTop = (window.screen.height) ? (window.screen.height - height)/2 : 0;
	var options = (options);
	var properties = "dialogWidth:" + width + "px;dialogHeight:" + height + "px;dialogTop:" + nTop + "px;dialogLeft:" + nLeft + "px;" + options;
	
	if (typeof arguments === "undefined" || typeof arguments === "string") {
		arguments = new Object();
		arguments.window = window;
	}
	var newWindow = window.showModalDialog(url, arguments, properties);
	//Note IE does not support window.opener for modal windows
	return newWindow;
}

// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
// Removes leading and ending whitespaces
function trim( value ) {
	return LTrim(RTrim(value));
}
/************** Functions available here with their brief decription (API's)****************************************
* changetomonday(theField)  : Set value to monday of corresponding week
* dateincrement(date,increamentBy) : changes the given date by given number of days. The days can be positive or negative.
* ValidateDate(theField)      : validates the given date in the field "theField" is in format dd/MM/YYYY
										and has a valid day,month,year
* compareDates(startDate,endDate)  : compares two dates(in format dd/MM/YYYY).returns false if endDate is small.
* datediff(startDate,endDate)  : compares two dates(in format dd/MM/YYYY).returns 0 if the start date given matches with
*											the end date otherwise returns -1 is startdate is greater than endDate
*											else return 1 is endDate is greater than startDate.
* checkMandatory(theField)             : checks for a valid entry in the mandatory field.
* isNum()  : returns true if number(0,1,2,3,45,6,7,8,9) else returns false
* trim(TRIM_VALUE)            : removes the unwanted spaces from both ends of a given string
* RTrim(VALUE)                : removes the unwanted spaces from Right end of a given string
* LTrim(VALUE)                : removes the unwanted spaces from Left end of a given string
* IsNumeric(VALUE):  Checks for valid numbers including decimal.
* isInteger(VALUE):  Checks for valid integer numbers.
*************************************************************************************************/
/* This funtion will set Date to corresponding
Monday of the date given in parameter.
field- This is form field name. i.e. document.formName.txtFieldName
*/
function changetomonday(field) {
	var changedDate = getWeekBeginning(field.value);
	field.value = changedDate;
	return changedDate;
}
/**
 * Calculates the monday of the week in which date is in.
 * @param date The date to move back to a monday, if not a monday. (dd/MM/yyyy)
 * @returns The monday of the week with date in it (dd/MM/yyyy)
 */
function getWeekBeginning(date) {
	var dateArray = date.split("/");
	var dateObject = new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
	var dayOfWeek = dateObject.getDay();
	if(dayOfWeek == 0) {
		return dateincrement(date, -6);
	} else {
		return dateincrement(date, (dayOfWeek - 1) * -1);
	}
}
/* This method will increment the given date by number of days passed in parameter. */
function dateincrement(strDate1,k) {
	var datearray1 = strDate1.split("/");
	var tempdate = datearray1[0] ;
	tempdate=(Number(tempdate)+Number(k));
	var tempmonth = datearray1[1] - 1;
	var tempyear = datearray1[2];
	var timeA = new Date(tempyear,tempmonth,tempdate);
	log.debug("new DAte date "+timeA.getDate()+ " month "+timeA.getMonth()+ " year "+timeA.getFullYear());
	var day=timeA.getDate();
	day="" + day;
	if(day.length<=1) {
		day="0" + day;
	}
	var month=timeA.getMonth();
	month=month+1;
	month="" + month;
	if(month.length<=1) {
		month="0" + month;
	}
	var year=timeA.getFullYear();
	var date1=day + "/" + month + "/" + year;
	return date1;
}
/**
 * The Function checks if the date is valid. If the date is not valid then the focus
 * is set on the field and false is returned.
 * @param  theField - Object of the textbox from which the date value is to retreived.
 * @return if the date given in the text box object is a valid day and is in 
 * 			format "dd/MM/YYYY"  then returns true otherwise false.
 * @return true of the date is valid false if not.
 */
function ValidateDate(theField) {
	if (!isDateValid(theField)) {
		theField.focus();
		return  false;
	}
	
	return true;
}

/**
 * Function Checks if a date is valid.  If the date is invalid then an alert 
 * will be displayed and the focus will go back on the field.
 * @param  theField - Object of the textbox from which the date value is to retreive.
 */
function enforceDateValidation(theField, alertMessStr) {
	//Setup the Alert Message
	var alertMessage = "Invalid Date Format";
	if (alertMessStr != null && alertMessStr != "") {
		alertMessage = alertMessStr;
	}
	
	//Check the Date is valid
	if (!isDateValid(theField)) {
		alert(alertMessage);
		theField.focus();
		return  false;
	}
	
	return true;
}


/**
 * Function checks if the date is valid.  An empty date is considered as valid.
 * @param  theField - Object of the textbox from which the date value is to retreived.
 * @return if the date given in the text box object is a valid day and is in 
 * 			format "dd/MM/YYYY"  then returns true otherwise false.
 * @return true of the date is valid false if not.
 */
function isDateValid(theField) {
	var err;
	err=false;
	strDate = theField.value;
	if(strDate=="") {
		return true;
	}
	length1 = strDate.length;
	if((length1>10)||(length1<=9)){
		err=true;
	}else{
		var findex,lindex,month,day,year,strDatelength,maxDays,lyear;
		findex=strDate.indexOf("/");
		lindex=strDate.lastIndexOf("/");
		strDatelength=length1;
		if((lindex==-1)||(lindex==findex)){
			err=true;
		}
		day=strDate.substring(0,findex);
		month=strDate.substring((findex+1),lindex);
		year=strDate.substring((lindex+1),strDatelength);
		maxDays=31;
		lyear=false;
		if(((year%4==0)&&(year%100!=0))||(year%400==0)){
			if(month==2){
				maxDays=29
				lyear=true
			}
		}
		if((month==4)||(month==6)||(month==9)||(month==11)){
			maxDays=30
		}
		if((month==2)&&(lyear==false)){
			maxDays=28
		}
		if(isNaN(day)||isNaN(year)||isNaN(month)){
			err=true
		}
		if((month>12)||(month<=0)){
			err=true;
		}else if((day>maxDays)||(day<=0)){
			err=true;
		}else  if ((year > 9999) || (year<=0)){
			err=true;
		}
		else if ((year.length < 4) || (year.length > 4)) {
			err = true;
		}
	}
	if(err){
		return false;
	}
	return true;
}
/*
* @param:startDate - Start date in format dd/MM/YYYY.
* @param:endDate - End date in format dd/MM/YYYY.
* @return: if the start date given is before the end date then returns true otherwise false.
*/
function compareDates(startDate,endDate) {
	var startDateArray=startDate.split("/");
	var startDay=startDateArray[0];
	var startMonthNum=startDateArray[1] - 1;
	var startYear=startDateArray[2];
	var startDate=new Date(startYear,startMonthNum,startDay);
	var endDateArray=endDate.split("/");
	var endDay=endDateArray[0];
	var endMonthNum=endDateArray[1] - 1;
	var endYear=endDateArray[2];
	var endDate=new Date(endYear,endMonthNum,endDay);
	var timediff=endDate - startDate;
	if(timediff<0) return false;
	else return true;
}
/*
* @param:startDate - Start date in format dd/MM/YYYY.
* @param:endDate - End date in format dd/MM/YYYY.
* @return: if the start date given matches with the end date then returns 0 otherwise returns -1 is startdate is greater
* than endDate else return 1 is endDate is greater than startDate.
*/
function datediff(startDate,endDate) {
	var startDateArray=startDate.split("/");
	var startDay=startDateArray[0];
	var startMonthNum=startDateArray[1] - 1;
	var startYear=startDateArray[2];
	var startDate=new Date(startYear,startMonthNum,startDay);
	var endDateArray=endDate.split("/");
	var endDay=endDateArray[0];
	var endMonthNum=endDateArray[1] - 1;
	var endYear=endDateArray[2];
	var endDate=new Date(endYear,endMonthNum,endDay);
	var timediff=endDate - startDate;
	if(timediff<0) return -1;
	else if(timediff>0) return 1;
	else if(timediff==0) return 0;
}
/*
* @return: current date in dd/mm/yyyy format.
*/
function getCurrentDate() {
	var tempDate = new Date();
	var strDay = tempDate.getDate();
	var strMonth = tempDate.getMonth() + 1;
	var strYear = tempDate.getYear();
	if(strMonth < 10) {
		strMonth = "0" + strMonth;
	}
	if(strDay < 10) {
		strDay = "0" + strDay;
	}
	var returnDate = strDay + "/" + strMonth + "/" + strYear;
	return returnDate;
}
/*
* @param:startDate - Start date in format dd/MM/YYYY.
* @return: if the start date given is before the end date then returns true otherwise false.
*/
function compareDateWithCurrentDate(startDate) {
	var startDateArray=startDate.split("/");
	var startDay=startDateArray[0];
	var startMonthNum=startDateArray[1] - 1;
	var startYear=startDateArray[2];
	var startDate=new Date(startYear,startMonthNum,startDay);
	//current date
	var tempDate = new Date();
	var endDay = tempDate.getDate();
	var endMonthNum = tempDate.getMonth();
	var endYear = tempDate.getYear();
	var endDate=new Date(endYear,endMonthNum,endDay);
	var timediff = endDate - startDate;
	if(timediff<0) return false;
	else return true;
}
/*
* @param:startTime - Start time in format hh24:mm.
* @param:endTime - End time in format hh24:mm.
* @return: if the start time is less than the endtime returns 1, equlas then return  otherwise returns -1.
*/
function timediff(startTime,endTime) {
	var startTimeArray = startTime.split(":");
	var startHour = startTimeArray[0];
	var startMinute = startTimeArray[1];
	var endTimeArray = endTime.split(":");
	var endHour = endTimeArray[0];
	var endMinute = endTimeArray[1];
	var hourDiff = endHour - startHour;
	if(hourDiff < 0) return -1;
	else if(hourDiff == 0) {
		var minDiff = endMinute - startMinute;
		if(minDiff == 0) return 0;
		else if (minDiff > 0) return 1;
		else return -1;
	}
	else if(hourDiff > 0) return 1;
}
function isFutureDate(startDate) {
	var startDateArray=startDate.split("/");
	var startDay=startDateArray[0];
	var startMonthNum=startDateArray[1] - 1;
	var startYear=startDateArray[2];
	var startDate=new Date(startYear,startMonthNum,startDay);
	//current date
	var tempDate = new Date();
	var endDay = tempDate.getDate();
	var endMonthNum = tempDate.getMonth();
	var endYear = tempDate.getYear();
	var endDate = new Date(endYear,endMonthNum,endDay);
	var timediff = endDate - startDate;
	return timediff < 0;
}

// Note that this function may take either a date "dd/mm/yyyy" or date and time "dd/mm/yyyy hh:mm"
// This method seems a little flawed as the millisecond element of the time is not truncated, resulting
// in the same date and time never being equivelant. 
// The code has not been altered in case it breaks other functionality
function isPastDate(date1) {
	var startDate = date1.substring(0,10);
	
	var startDateArray=startDate.split("/");
	var startDay=startDateArray[0];
	var startMonthNum=startDateArray[1] - 1;
	var startYear=startDateArray[2];
	
	if (date1.length > 10) {
		var startTime = date1.substring(11,16);
		var startTimeArray = startTime.split(":");
		var startHour = startTimeArray[0];
		var startMinute = startTimeArray[1];
		
		var startDate=new Date(startYear,startMonthNum,startDay,startHour, startMinute);
	} else {
		var startDate=new Date(startYear,startMonthNum,startDay);
	}
	var endDate= new Date();

	var timediff = endDate - startDate;
	if(timediff >= 0) return true;
	else return false;

}

/**
 * Function is used check if the Passed in date is before today or in the case of date time is before now.
 * @param theDate	Date Format can be either a date "dd/mm/yyyy" or date and time "dd/mm/yyyy hh:mm"
 * @return true if the passed in date is before the current date or before now (if time is included)
 */
function isDateInPast(theDate) {
	var timediff = calculateCompareDateTime(theDate);
	if (timediff > 0) {
		return true;
	}
	return false;
}

/**
 * Function is used check if the Passed in date or date time is a current, future or past date.
 * @param theDate	Date Format can be either a date "dd/mm/yyyy" or date and time "dd/mm/yyyy hh:mm"
 * @return an Integer: 	Value < 0 is in the Future
 * 					   	Value > 0 is in the Past
 * 						Value = 0 is current. 
 */
function calculateCompareDateTime(date1) {
	var startDate = date1.substring(0,10);
	var endDate= new Date();
	
	var startDateArray=startDate.split("/");
	var startDay=startDateArray[0];
	var startMonthNum=startDateArray[1] - 1;
	var startYear=startDateArray[2];
	
	if (date1.length > 10) {
		var startTime = date1.substring(11,16);
		var startTimeArray = startTime.split(":");
		var startHour = startTimeArray[0];
		var startMinute = startTimeArray[1];
		
		startDate = new Date(startYear, startMonthNum, startDay, startHour, startMinute);
		endDate = new Date(endDate.getYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes());
	} else {
		startDate = new Date(startYear,startMonthNum,startDay);
		endDate = new Date(endDate.getYear(), endDate.getMonth(), endDate.getDate());
	}

	var timediff = endDate - startDate;
	return timediff;
}

/////////////////////////////////////////////////////////////////////
//////////////             TIME FUNCTIONS             ///////////////
///    Functions Below are associated with the fields or         ////
///    values that are time in the 24HH:mm format		         ////
/////////////////////////////////////////////////////////////////////

/** 
 * Checks if the input character is a valid time character.
 * Furthermore it will prevent more then one semicolon being entered.
 * Usage : <input type="text" onKeyPress="return isTime(this)"..> 
 * Please note you should only use this function as part of keypress,
 * as this has only been tested on kepress and codes only work on the characters,
 * that have been input (i.e. delete button does not register as an event). 
 * @param time	-	the Time field to check before input.
 * @return true if the character forms part of a valid time false if not.
 */
function isTime(timeField) {
	//Is a Numeric Value
	if(event.keyCode >= 48 && event.keyCode <= 57) {
		return true;
	//Is semi-colon (this is not a button press key code but rather character code) 
	} else if (event.keyCode == 58) {
		//If there is already a semi-colon then another is not permitted
		if (timeField != null && timeField.value != null && timeField.value != "" 
				&& timeField.value.indexOf(":") > -1) {
			return false
		}
		return true;
	}
	return false;
}

/**
 * Function Forcefully Formats the time element of a time.
 * Updates the Time Field Object with a valid time if not valid already.
 * @param timeFieldObj	 	The Time Field Object to manipulate
 * @param defTimeIfInvalid	The Default time if the time Field Object is invalid
 */
function forceTimeFormat(timeFieldObj, defTimeIfInvalid) {
	//Setup the Default Time
	var defaultTime = "00:00";
	if (defTimeIfInvalid != null && defTimeIfInvalid != "") {
		defaultTime = defTimeIfInvalid;
	}
	var defTimeEle1 = defaultTime.split(":")[0];
	var defTimeEle2 = defaultTime.split(":")[1];
	//Check the time object is not null and not empty
	if (timeFieldObj != null && timeFieldObj.value != null && timeFieldObj.value != "") {
		//Get the Array of time numbers
		var splitTime = timeFieldObj.value.split(":");
		var newTime;
		
		//If there are two time elements Format the time
		if (splitTime.length == 2) {
			newTime = checkTimeAndFormat(splitTime[0], defTimeEle1) + ":" + 
						checkTimeAndFormat(splitTime[1], defTimeEle2);
		
		//If there is one time element, manipulate the Element.
		} else if (splitTime.length == 1) {
			//Check the First element is not empty and is a number
			if (splitTime[0].length > 0 && isInteger(splitTime[0])) {				
				//Dfefault the Time Elements
				var timeEle1 = null;
				var timeEle2 = splitTime[0];
				var theWholeTime = splitTime[0];
				if (theWholeTime.length > 4) {
					theWholeTime = theWholeTime.substr(0,3);
				}
				
				//If the Minute Element is valid then default the hours to 00
				if (isTimeElementValid(timeEle2)) {
					timeEle1 = "00";	
				}
				
				//Get the Minutes
				if (theWholeTime.length > 1) {
					timeEle2 = theWholeTime.substr(theWholeTime.length-2, theWholeTime.length-1);
				}
				
				//Get the Hours
				if (theWholeTime.length > 2) {
					timeEle1 = theWholeTime.substr(0, theWholeTime.length-2);	
				}
				//Set the New Time
				newTime = checkTimeAndFormat(timeEle1, defTimeEle1) + ":" 
							+ checkTimeAndFormat(timeEle2, defTimeEle2);
			//If the number is not valid use the default number
			} else {
				newTime = defaultTime;
			}
		
		} else {
			newTime = defaultTime;
		}	
		timeFieldObj.value = newTime;
	}
}

/**
 * Function Checks the Time Element and Formats it for valid time Display.
 * If the number is invalid then the defTimeIfInvalid or 00 is returned if default is not Set.
 * @param	The Time Element to Check and Format.
 */
function checkTimeAndFormat(timeEle, defTimeIfInvalid) {
	//Setup the Default Time Value
	var defTimeEle = "00";
	if (defTimeIfInvalid != null && defTimeIfInvalid != "") {
		defTimeEle = defTimeIfInvalid;
	}

	var newTime = "";
	//Make time the default time element if it is empty
	if (timeEle == null || timeEle.length == 0) {
		newTime = defTimeEle;
	//Make time the default time element if it is not a valid time number
	} else if (!isTimeElementValid(timeEle)) {
		newTime = defTimeEle;
	//Validation has passed used the original time.
	} else {
		newTime = timeEle;
	}
	
	//Check the time has more then one digit if not add 0 to the beginning.
	if (newTime.length < 2) {
		newTime = "0" + newTime;
	}
	
	//Return the new Time
	return newTime;
}

/**
 * Function Checks to see if the Individual Time Element is Valid.
 * If the Time is a number and between 0 and 59 then its valid otherwise its no.
 * @param the Time Element to validate.
 */
function isTimeElementValid(timeEle) {
	//Check the Time Element is a number
	if (isInteger(timeEle)) {
		var eleTimeValue = timeEle/1;
		//Check the Time Element is within the Valid Range
		if (eleTimeValue > -1 && eleTimeValue < 60) {
			return true;
		} 
	}
	return false
}


/////////////////////////////////////////////////////////////////////
/////////////////  END OF TIME FUNCTIONS  ///////////////////////////
/////////////////////////////////////////////////////////////////////



/*
* @param:elem - pbject of the control element in the GUI of which mandatory check is to be performed.
* @return: if some value is there other than spaces then return true otherwise false.
*/
function checkMandatory(elem) {
	var srcElement=elem;
	if(trim(srcElement.value)=="") {
		if(srcElement.disabled == false){
			srcElement.focus();
		}
		return false;
	} else {
		return true;
	}
}
/*
* @param:elem - pbject of the control element in the GUI of which mandatory check is to be performed.
* @return: if some value is there other than spaces then return true otherwise false.
*/
function checkMandatorySelect(elem) {
	var srcElement=elem;
	if (srcElement.selectedIndex != -1) {
		if (trim(srcElement.options[srcElement.selectedIndex].value) == "") {
			srcElement.focus();
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}
/* Usage : <input type="text" onKeyPress="return isNum()"..> */
function isNum() {
	if(event.keyCode>=48&&event.keyCode<=57) {
		return true;
	}
	return false;
}
/* Usage : <input type="text" onKeyPress="return isCert()"..> */
/* Checks the Certificate format assumed to be 'Dnnn...nnnC' where D and C are optional and n's are from 1 to 13 */
/* (d and c are also allowed) */
function isCert() {
	var textValue = event.srcElement.value;
	var dExists = 0;														// D (for DAS) has been already introduced?
	var cExists = false;													// C (for Cardington) has been already introduced?
	if ((textValue.length > 0) && ((textValue.substring(0, 1) == "D") || (textValue.substring(0, 1) == "d")))
		dExists = 1;
	if ((textValue.length > 0) && ((textValue.indexOf("C") != -1) || (textValue.indexOf("c") != -1)))
		cExists = true;

	if((event.keyCode == 68) || (event.keyCode == 100))						// if D or d
		return (textValue.length == 0);
	else if((event.keyCode >= 48) && (event.keyCode <= 57))					// if number
		return ((textValue.length < 13 + dExists) && !cExists);
	else if ((event.keyCode == 67) || (event.keyCode == 99))				// if C or c
		return ((textValue.length >= 1 + dExists) && (textValue.length <= 13 + dExists) && !cExists);
	return false;
}
function isValidTimeChar(field1) {
	if(field1.value.length!=2) {
		return isNum();
	}else {
		if(event.keyCode ==58 ) return true;
	}
	return false;
}
function IsNumeric(elem) {
	var ValidChars = "0123456789.";
	var IsNumber=true;
	var sText = elem.value;
	var Char;
	for (i = 0; i < sText.length && IsNumber == true; i++) {
		Char = sText.charAt(i);
		if (ValidChars.indexOf(Char) == -1) {
			//alert("Invalid Character");
			elem.focus();
			IsNumber = false;
		}
	}
	return IsNumber;
}

function isNumericNew(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* Checks for valid integer numbers. on 31st oct */
function isValidNumber(chkval) {
	var arrNumber=Array('0','1','2','3','4','5','6','7','8','9');
	var arrNumberLen=arrNumber.length;
	var bFound=false;
	for(k=0;k<arrNumberLen&&!bFound;++k) {
		if(chkval==arrNumber[ k ]) {
			bFound=true;
		}
	}
	return bFound;
}
/*
* @param:val-value of the number
* @Description - Checks for valid integer numbers.
* @return: -return true if it is a valid integer.
*/
function isInteger(val) {
	var bValid=true;
	if(val!="") {
		for(j=0;j<val.length&&bValid;++j) {
			strDigitVal=val.charAt(j);
			if(!isValidNumber(strDigitVal)) {
				bValid=false;
			}
		}
	}
	return bValid;
}


/////////////////////////////////////////////////////////////////////
//////////////            DECIMAL FUNCTIONS           ///////////////
///    Functions Below are associated with the fields or         ////
///    values that are decimals.						         ////
/////////////////////////////////////////////////////////////////////

/**
 * Function ensures that the Character is a valid decimal character.
 * @param decChar	- The Decimal Character value to check.
 * @return true if the character is a valid decimal character false if not. 
 */
function isDigit(decChar) {
	var validChars = "0123456789.-";
	if (validChars.indexOf(decChar) == -1) {
		return false;
	}
	return true;
}

/**
 * Function checks a string of characters and ensures that the string has no 
 * invalid decimal characters.
 * @param val	- The decimal string value to check.
 * @return true if the string has valid decimal characters false if not. 
 */
function IsValidDigit(val) {
	if(val != "") {
		for(j = 0; j < val.length; j++) {
			strDigitVal = val.charAt(j);
			if(!isDigit(strDigitVal)) {
				return false;
			}
		}
	}
	return true;
}

/** 
 * Checks if the input character is a valid decimal character.
 * Furthermore it will prevent more then one decimal place being entered.
 * Usage : <input type="text" onKeyPress="return isDec(this)"..> 
 * Please note you should only use this function as part of keypress,
 * as this has only been tested on kepress and codes only work on the characters,
 * that have been input (i.e. delete button does not register as an event). 
 * @param decField	-	the Decimal field to check before input.
 * @return true if the character forms part of a valid decimal number false if not.
 */
function isDec(decField) {
	//Is a Numeric Value
	if(event.keyCode >= 48 && event.keyCode <= 57) {
		return true;
	} else if (event.keyCode == 45) {
		// Minus sign.
		return true;
	//Is full stop (this is not a button press key code but rather character code) 
	} else if (event.keyCode == 46) {
		//If there is already a decimal place then another is not permitted
		if (decField != null && decField.value != null && decField.value != "" 
				&& decField.value.indexOf(".") > -1) {
			return false
		}
		return true;
	}
	return false;
}

/** 
 * Checks if the number is valid decimal number.
 * @param	decFieldValue 	- The value to check if it is a valid decimal.
 * @return true if it is valid decimal number or false if it is not.  
 */
function isValidDecimal(decFieldValue) {
	//Check the value is populated
	if (decFieldValue != null && decFieldValue != "" && decFieldValue != "undefined") {
		var decPlaceCount = 0;
		//Go through each element
		for (i = 0; i < decFieldValue.length; i++) {
			var digitVal = decFieldValue.charAt(i);
			//Do a decimal Place Count
			if (".".indexOf(digitVal) > -1) {
				decPlaceCount++;						
			//If the character is not a digit then invalid decimal
			} else if (!isDigit(digitVal)) {
				alert('Digit val' + digitVal);
				return false;
			}
		}	
		//If Decimal places are greater then 1 invalid decimal
		if (decPlaceCount > 1) {
			return false;
		}
	}
	//If no errors then decimal is valid 
	return true;
}


/**
 * Function Formats the Decimal Number.  
 * If the number is not valid then an alert is displayed and the focus goes back to the field.
 * @param field				-	The Field to check.
 * @param decimalPlaces 	-	The Number of decimal places to use (Null value results in 2).
 * @param fieldMaxLength 	- 	The Maximum Length the Field value can be.
 */
function isDecValueLengthCorrect(decValue, decMaxLength, decPlaces) {
	var preDefDecPlaces = 0;
	if (decPlaces != null && decPlaces != "" && decPlaces != "undefined") {
		preDefDecPlaces = decPlaces;
	}
	//Check the Values are populated before Continuing
	if (decValue != null && decValue != "undefined" &&
		decMaxLength != null && decMaxLength != "undefined") {	
		var preDigitValue = decValue;
		//Check the Field has a decimal Place
		if (decValue.indexOf(".") > -1) {		
			var splitFieldValue = decValue.split(".");
			//If the field has a decimal place get the pre dec place value
			if (splitFieldValue.length > 1) {				
				preDigitValue = splitFieldValue[0];
			}
		}
		
		//If there are no set decimal places then check the Maximum Length
		if (decPlaces == 0 && decValue.length > decMaxLength) {
			return false;
		//The pre decimal place must be the Maximum Length - (decimal point and decimal places)
		} else if (preDigitValue.length > decMaxLength - (1 + preDefDecPlaces)) {
			return false;
		}
	}
	return true;
}

function isDecValueFormatCorrect(decValue, precision, scale) {
	var negative = false;
	
	if (decValue != null && decValue != "" && decValue != "undefined") {
		if (!isNumericNew(decValue)) {
			return false;
		}
		
		//var numLength = decValue.length;
		var signed = false;
		
		// Negative sign.
		if (decValue.charAt(0) == "-") {
			//numLength = (numLength - 1);
			signed = true;
		}
		
		// Negative sign only at the beginning.
		if (decValue.lastIndexOf("-") > 0) {
			return false;
		}
		
		// Check precision (length).
		var precNumber = Number(decValue).toPrecision(precision);
		if (decValue.length > precNumber.toString().length) {
			return false;
		}
		
		// Check scale and pre-decimal length.
		if (decValue.indexOf(".") > -1) {		
			var splitValue = decValue.split(".");
			
			if (splitValue.length > 1) {
				// Pre-decimal.
				var preDecLen = splitValue[0].length;
				if (signed) {
					preDecLen = (preDecLen - 1);
				}
				if (preDecLen > (precision - scale)) {
					return false;
				}
				
				// Scale.
				if (splitValue[1].length > scale) {
					return false;
				}
			}
		} else {
			var preDecLen = decValue.length;
			if (signed) {
				preDecLen = (preDecLen - 1);
			}
			if (preDecLen > (precision - scale)) {
				return false;
			}
		}
	}
	return true;
}

/**
 * Function Removes any invalid numeric decimal chracters.
 * If there is more then 1 decimal character then only the last decimal point is retained.
 * @param decValue	- The decimal Value to remove any invalid values.
 * @return	the decimal value without invalid chracters or decimal places.
 */
function removeInvalidDecValues(decValue) {
	if (decValue != null && decValue != "") {
		//Look to remove any invalid decimal places or characters
		var newDecValue = "";
		var decPlaceCount = 0;
		//Go through the Characters backwards
		for (j = decValue.length-1; j >= 0; j--) {
			var digitVal = decValue.charAt(j);
			//Check that there is a decimal place
			if (".".indexOf(digitVal) > -1) {
				decPlaceCount++;
				//if there less then 2 dec places, add the dec place
				if (decPlaceCount < 2) {
					newDecValue = digitVal + "" + newDecValue;
				}
			//If the digit is valid digit value, add it
			} else if(isDigit(digitVal)) {
				newDecValue = digitVal + "" + newDecValue;
			}
		}
		
		var decIndex = newDecValue.indexOf(".");
		
		//If the decimal is the only charcter then return empty string.
		if (decIndex > -1 && newDecValue.length == 1) {
			newDecValue = "";
		//If the decimal is the last digit remove it.
		} else if (newDecValue.length > 0 && decIndex == newDecValue.length-1) {
			newDecValue = newDecValue.substr(0, newDecValue.length-2);
		}
		
		//Return the new decimal string
		return newDecValue;
	} else {
		return decValue;
	}
}

/**
 * Function Formats the Decimal Number.  
 * If the number is not valid then an alert is displayed and the focus goes back to the field.
 * @param field				-	The Field to check.
 * @param decimalPlaces 	-	The Number of decimal places to use (Null value results in 2).
 * @param fieldMaxLength 	- 	The Maximum Length the Field value can be.
 */
function formatDecimal(field, decimalPlaces, fieldMaxLength) {
	
	var fieldValue = field.value;
	var noOfDecPlaces = 2;
		
	//Check the Number of Decimal places value is valid
	if (decimalPlaces != null && decimalPlaces != "" && isInteger(decimalPlaces)) {
		noOfDecPlaces = decimalPlaces;
	}
	//Check the Field Value is populated
	if (fieldValue != null && fieldValue != "") {
		//Clean up the String to remove invalid decimal values
		//Maybe this can bee removed if alerts are allowed
		fieldValue = removeInvalidDecValues(fieldValue);
		
		//Check the Field value is a valid decimal
		if(isValidDecimal(fieldValue)) {
			//Check the Field is the correct length			
			if (!isDecValueLengthCorrect(fieldValue, fieldMaxLength, noOfDecPlaces)) {
				alert("The Field can only have " + (fieldMaxLength - (1 + noOfDecPlaces)) + " digits before the decimal place");
				field.focus();
				return;
			}
			/*if (fieldMaxLength != null && fieldMaxLength != "undefined") {
				
				var preDigitValue = fieldValue;
				//Check the Field has a decimal Place
				if (fieldValue.indexOf(".") > -1) {		
					var splitFieldValue = fieldValue.split(".");
					//If the field has a decimal place get the pre dec place value
					if (splitFieldValue.length > 1) {				
						preDigitValue = splitFieldValue[0];
					}
				}
				//The pre decimal place must be the Maximum Length - (decimal point and decimal places)
				if (preDigitValue.length > fieldMaxLength - (1 + noOfDecPlaces)) {
					alert("The Field can only have " + (fieldMaxLength - (1 + noOfDecPlaces)) + " digits before the decimal place");
					field.focus();
					return;
				}
			} 	*/	
			//Now the Decimal Value needs to be made into a number
			fieldValue = fieldValue/1;
			//Set the new decimal value to the Field in decimal format
			field.value = fieldValue.toFixed(noOfDecPlaces);
			return;
		} 
	} else {
		return;
	}
	
	//Set the Focus on the field
	field.focus();
}

///This Function may not actually be used yet
/**
 * Function Formats the Decimal Number.  
 * If the number is not valid then an alert is displayed and the focus goes back to the field.
 * @param field				-	The Field to check.
 * @param decimalPlaces 	-	The Number of decimal places to use (Null value results in 2).
 * @param fieldMaxLength 	- 	The Maximum Length the Field value can be.
 */
function formatDecimalRemoveInvalid(field, decimalPlaces, fieldMaxLength) {
	
	var fieldValue = field.value;
	var noOfDecPlaces = 0;
		
	//Check the Number of Decimal places value is valid
	if (decimalPlaces != null && decimalPlaces != "" && isInteger(decimalPlaces)) {
		noOfDecPlaces = decimalPlaces;
	}
		
	//Check the Field Value is populated
	if (fieldValue != null && fieldValue != "") {
		//Remove any Invalid Decimal Places or characters
		fieldValue = removeInvalidDecValues(fieldValue);
	
		//Check the Field Maximum lenght is set
		if (fieldMaxLength != null && fieldMaxLength != "") {
			//If the Field is greate than the max length trim it down
			if (!isDecValueLengthCorrect(fieldValue, fieldMaxLength, noOfDecPlaces)) {
				fieldValue = fieldValue.substr(0, fieldMaxLength-1);
			}
			//If the No of Decimal places is greater than 0
			if (noOfDecPlaces > 0) {
				var fieldValArr = fieldValue.split(".");
				var preDigitVal = fieldValArr[0];
				//If the preDigit Length is greater then the maximum length
				if (preDigitVal.length > fieldMaxLength - (1 + noOfDecPlaces)) {
					//Get the excess chars of the value (cut of the overlap and store)
					var postDigitVal = preDigitField.substr(fieldMaxLength - (1 + noOfDecPlaces));
					preDigitVal = preDigitField.substr(0, fieldMaxLength - (2 + noOfDecPlaces));
					//Check if there was an original post dec point value
					//if there is add it to the end of the excess
					if (fieldValArr.length > 1) {
						postDigitVal = postDigitVal + "" + fieldValArr[1];						
					}
					//Reconstruct the field Value.
					fieldValue = preDigitField + "." + postDigitVal;
				}
			}
		} 
		
		//Now the Decimal Value needs to be made into a number
		fieldValue = fieldValue/1;
		//Set the new decimal value to the Field in decimal format
		field.value = fieldValue.toFixed(noOfDecPlaces);		
	} 
	
}


/////////////////////////////////////////////////////////////////////
//////////////  END OF DECIMAL FUNCTIONS  ///////////////////////////
/////////////////////////////////////////////////////////////////////

/* 
 * @param:theField - Object of the textbox from which the time value is to retreived.
 * @return: if the time given in the text box object is in format "24hh:mm"  then
 * returns true otherwise false.
 * 
 * DSATARS2-7147 - This method has been used in TARS at various places to validate time.
 * The fix for 7088 added validation of time as original implementation did not check 
 * for incorrect time entry. This fix resulted in failure of DSATARS2-7147 as **:** 
 * is a accepted time format e.g. in Examiner|Certification|Fee Paid timings.
 * 
 * This method was divided into two methods one that is used across the TARS and 
 * accepts **:** as valid time format 
 * and a new Method checkForValidTime(), which will return true if there was a correct time.
 * 
 * Thus checkForValidTime(theField) should be used if input should check 
 * whether there is an actual time in the input and it is valid or not.
 * 
 * As validTimeFormat() is used across TARS will continue to be used and 
 * any exceptions will be added to this method as and when required. 
*/

function validTimeFormat(theField) {
    if (theField.value == '**:**') {
    	return true;
    } else if (checkTime(theField.value)) {
    	return true;
    }

    // value is not valid.    
    theField.focus();
    return false;
}

/**
 * DSATARS2-7147 - This method has been used in TARS at various places to validate time.
 * The fix for 7088 added validation of time as original implementation did not check 
 * for incorrect time entry. This fix resulted in failure of DSATARS2-7147 as **:** 
 * is a accepted time format e.g. in Examiner|Certification|Fee Paid timings.
 * 
 * This method was divided into two methods one that is used across the TARS and 
 * accepts **:** as valid time format 
 * and a new Method checkForValidTime(), which will return true if there was a correct time.
 * 
 * Thus checkForValidTime(theField) should be used if input should check 
 * whether there is an actual time in the input and it is valid or not.
 * 
 * As validTimeFormat() is used across TARS will continue to be used and 
 * any exceptions will be added to this method as and when required. 
 * 
 */
 
 function checkForValidTime(theField) {
    if (checkTime(theField.value)) {
        return true;
    }

    // value is not valid.    
    theField.focus();
    return false;
}

/**
 * checks whether time input in form of hh:mm is a valid time. Assume it is 24 hours clock.
 */
function checkTime(theTime) {
    var validHour = false;

    // regular expression to match required time format hh:mm
    regularExpTime = /^(\d{2}):(\d{2})$/;
    
    if (theTime != '') {
        if (regs = theTime.match(regularExpTime)) {
            if (regs.length == 3) {
                // 24-hour time format
                if (regs[1] >= 0 && regs[1] <= 23) {
                    validHour = true;
                }
            
                //alert("min: " + regs[2]);
                if (validHour && regs[2] >= 0 && regs[2] <= 59) {
                    return true;
                }
            }
        }
    }
    return false;
}
/* @param:theField - Object of the textbox from which the email value is to retreived.
* @return: if the entred value is valid email returns true otherwise false.
*/
function validEmailFormat(theField) {
	var err;
	err=false;
	emailId = theField.value;
	if (emailId == "") return true;
	var iAtPos = emailId.indexOf("@");
	var iDotPos = emailId.lastIndexOf(".");
	var iLen = emailId.length;
	var iCommaPos = emailId.lastIndexOf(",");
	var iSpacePos = emailId.lastIndexOf(" ");
	if (iAtPos == -1 || iAtPos == 0 || iDotPos == -1 || iAtPos > iDotPos || iDotPos == (iAtPos + 1) || iDotPos == (iLen - 1)) {
		err = true;
	}
	if (err) {
		theField.focus();
		return  false;
	}
	return true;
}
/*function for generating form parameters. */
function getFormValues(fobj) {
	var str = "";
	var valueArr = null;
	var val = "";
	var cmd = "";
	for(var i = 0;i < fobj.elements.length;i++) {
		switch(fobj.elements[i].type) {
		case "text":
			if (trim(fobj.elements[i].value) != "") {
				str += fobj.elements[i].name +
				"=" + encodeURIComponent(trim(fobj.elements[i].value)).replace(/\+/g, '%2B') + "&";
			}
			break;
		case "hidden":
			if (trim(fobj.elements[i].value) != "") {
				str += fobj.elements[i].name +
				"=" + encodeURIComponent(trim(fobj.elements[i].value)).replace(/\+/g, '%2B') + "&";
			}
			break;
		case "select-one":
			if (fobj.elements[i].selectedIndex != -1) {
				if (trim(fobj.elements[i].options[fobj.elements[i].selectedIndex].value) != "") {
					str += fobj.elements[i].name.replace(/\+/g, '%2B') +
					"=" + fobj.elements[i].options[fobj.elements[i].selectedIndex].value.replace(/\+/g, '%2B') + "&";
				}
			}
			break;
		case "checkbox":
			if (fobj.elements[i].checked) {
				str += fobj.elements[i].name +
				"=" + encodeURIComponent(trim(fobj.elements[i].value)).replace(/\+/g, '%2B') + "&";
			} else {
				str += fobj.elements[i].name +
				"=&";
			}
			break;
		case "radio":
			if (fobj.elements[i].checked) {
				str += fobj.elements[i].name +
				"=" + encodeURIComponent(trim(fobj.elements[i].value)).replace(/\+/g, '%2B') + "&";
			}
			break;
		case "textarea":
			if (trim(fobj.elements[i].value) != "") {
				str += fobj.elements[i].name +
				"=" + encodeURIComponent(trim(fobj.elements[i].value)).replace(/\+/g, '%2B') + "&";
			}
			break;
		case "password":
			if (trim(fobj.elements[i].value) != "") {
				str += fobj.elements[i].name +
				"=" + encodeURIComponent(trim(fobj.elements[i].value)).replace(/\+/g, '%2B') + "&";
			}
			break;
		}
	}
	if(log) log.debug("fobj elements length: "+ fobj.elements.length  );
	str = str.substr(0,(str.length - 1));
	return str;
}
    
/**
 * Encodes a string that is to be Posted in a request.
 * Function Will Check if the String is empty (after trimming) and encode the 
 * trimmed string. 
 * @param paramStr	- The String to Encode.
 * @return the Encoded Parameter String or an empty string if empty or null.
 */
function encodeParamStr(paramStr) {
	if (paramStr!= null) {
		if ( trim(paramStr) != "") {
			return encodeURIComponent(trim(paramStr)).replace(/\+/g, '%2B');
		}
	}
	return "";
}

function formatValue(vData) {
	var datToBeformatted = vData;
	if (datToBeformatted != null && datToBeformatted != "") {
		datToBeformatted = trim(datToBeformatted);
		return datToBeformatted;
	}
	return datToBeformatted;
}
/*
Function to convert 1 or 0 to Yes/no.
*/
function convertCheckToYesNo(vData) {
	var datToBeformatted = vData;
	if (datToBeformatted == null || datToBeformatted == "null" || datToBeformatted == "0" || datToBeformatted == "No") {
		datToBeformatted = "No";
		return datToBeformatted;
	}
	if (datToBeformatted == "1" || datToBeformatted == "Yes") {
		datToBeformatted = "Yes";
		return datToBeformatted;
	}
}
/* Function to convert Yes/no to 1 or 0. */
function convertYesNoToOneZero(vData) {
	var datToBeformatted = vData;
	if (datToBeformatted == null || datToBeformatted == "" || datToBeformatted == "null" || datToBeformatted == "No" || datToBeformatted == "N0" || datToBeformatted == "no") {
		datToBeformatted = "0";
		return datToBeformatted;
	}
	if (datToBeformatted == "YES" || datToBeformatted == "Yes" || datToBeformatted == "yes") {
		datToBeformatted = "1";
		return datToBeformatted;
	}
}
/* Function to convert Yes/no to 1 or 0. */
function convertYesNoToTrueFalse(vData) {
	var datToBeformatted = vData;
	if (datToBeformatted == null || datToBeformatted == "" || datToBeformatted == "null" || datToBeformatted == "No" || datToBeformatted == "N0" || datToBeformatted == "no") {
		datToBeformatted = "false";
		return datToBeformatted;
	}
	if (datToBeformatted == "YES" || datToBeformatted == "Yes" || datToBeformatted == "yes") {
		datToBeformatted = "true";
		return datToBeformatted;
	}
}
/* Function for converting null to empty string. */
function cnte(d) {
	if (d== null || d == "null") { return "";  }
	if (d != "") { return trim(d); }
	return d;
}
/* If the firstChild passed in is not null, return the value of its node. Else return empty String. */
function getFirstChildNodeValue(vData) {
	if (vData != null) {
		return convertNullToEmpty(vData.nodeValue);
	} else {
		return "";
	}
}
/* Function for converting null to empty string. */
function convertNullToEmpty(vData) {
	var dataToBeformatted = vData;
	if (dataToBeformatted == "null" || dataToBeformatted == null) {
		dataToBeformatted = "";
		return dataToBeformatted;
	}
	if (dataToBeformatted != "") {
		dataToBeformatted = trim(dataToBeformatted);
		return dataToBeformatted;
	}
	return dataToBeformatted;
}
/*Function to move selected item from one list to another. */
function moveSelectedItem(objSourceElement, objTargetElement)    {
	var aryTempSourceOptions = new Array();
	var x = 0;
	//looping through source element to find selected options
	for (var i = 0; i < objSourceElement.length; i++) {
		if (objSourceElement.options[i].selected) {
			//need to move this option to target element
			var intTargetLen = objTargetElement.length++;
			objTargetElement.options[intTargetLen].text = objSourceElement.options[i].text;
			objTargetElement.options[intTargetLen].value = objSourceElement.options[i].value;
		} else {
			//storing options that stay to recreate select element
			var objTempValues = new Object();
			objTempValues.text = objSourceElement.options[i].text;
			objTempValues.value = objSourceElement.options[i].value;
			aryTempSourceOptions[x] = objTempValues;
			x++;
		}
	}
	//resetting length of source
	objSourceElement.length = aryTempSourceOptions.length;
	//looping through temp array to recreate source select element
	for (var i = 0; i < aryTempSourceOptions.length; i++) {
		objSourceElement.options[i].text = aryTempSourceOptions[i].text;
		objSourceElement.options[i].value = aryTempSourceOptions[i].value;
	}
}
/* Function to move all the items from one list to another. */
function moveAllItems(objSourceElement, objTargetElement)    {
	var aryTempSourceOptions = new Array();
	var x = 0;
	//looping through source element to find selected options
	for (var i = 0; i < objSourceElement.length; i++) {
		var intTargetLen = objTargetElement.length++;
		objTargetElement.options[intTargetLen].text = objSourceElement.options[i].text;
		objTargetElement.options[intTargetLen].value = objSourceElement.options[i].value;
	}
	//resetting length of source
	objSourceElement.length = aryTempSourceOptions.length;
	//looping through temp array to recreate source select element
	for (var i = 0; i < aryTempSourceOptions.length; i++) {
		objSourceElement.options[i].text = aryTempSourceOptions[i].text;
		objSourceElement.options[i].value = aryTempSourceOptions[i].value;
	}
}
/* @return: current time in hh24:mm format. */
function getCurrentTime(){
	var tempDate = new Date();
	var strHours = tempDate.getHours();
	var strMinutes = tempDate.getMinutes();
	var returnTime = strHours + ":" + strMinutes;
	return returnTime;
}
/* @return: function to find a date between two date. date format dd/mm/yyyy */
function isDateBetween(strStarDate, strEndDate, strDate){
	var flg1 = datediff(strStarDate, strDate);
	var flg2 = datediff(strEndDate, strDate);
	if(flg1 != -1 && flg2 != 1) {
		return true;
	} else {
		return false;
	}
}
function checkPostCode(postCode){ //check postcode format is valid
	test = document.getElementById(postCode).value; size = test.length
	test = test.toUpperCase(); //Change to uppercase
	while (test.slice(0,1) == " ") //Strip leading spaces
	{test = test.substr(1,size-1);size = test.length
	}
	while(test.slice(size-1,size)== " ") //Strip trailing spaces
	{test = test.substr(0,size-1);size = test.length
	}
	document.getElementById(postCode).value = test; //write back to form field
	if (size < 6 || size > 8){ //Code length rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	if (!(isNaN(test.charAt(0)))){ //leftmost character must be alpha character rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	if (isNaN(test.charAt(size-3))){ //first character of inward code must be numeric rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	if (!(isNaN(test.charAt(size-2)))){ //second character of inward code must be alpha rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	if (!(isNaN(test.charAt(size-1)))){ //third character of inward code must be alpha rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	if (!(test.charAt(size-4) == " ")){//space in position length-3 rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	count1 = test.indexOf(" ");count2 = test.lastIndexOf(" ");
	if (count1 != count2){//only one space rule
		if (!document.getElementById(postCode).disabled) {
			document.getElementById(postCode).focus();
		}
		return false;
	}
	return true;
}
function checkMaxLengthOfTextArea(fieldname, textArealength) {
	textname = document.getElementById(fieldname);
	if(textname.value.length>textArealength) {
		textname.value=trim(textname.value.substring(0, textArealength));
		return false;
	}
}
/** This method check whether the selected day present in the range of start Date and End Date. */
function checkForDay(startDate,endDate, dayOfWeek)
{	
	var retValue = false;
	var tempDate = startDate;
	//alert("dayOfWeek:::" + dayOfWeek);
	i = 0;
	while (datediff(tempDate,endDate) != -1) {
		var tempDayWeek = getDayOfWeek(tempDate);
		if (tempDayWeek == dayOfWeek) {
			retValue = true;
			break;
		}
		tempDate = dateincrement(tempDate, 1);
		i++;
	}
	return retValue;
}
/** This method returns day of week. */
function getDayOfWeek(date) {
	var datearray1 = date.split("/");
	var tempdate = datearray1[0] ;
	var tempmonth = datearray1[1] - 1;
	var tempyear = datearray1[2];
	var newDate = new Date(tempyear,tempmonth,tempdate);
	var weekday=new Array(7)
	weekday[0]="Sunday"
	weekday[1]="Monday"
	weekday[2]="Tuesday"
	weekday[3]="Wednesday"
	weekday[4]="Thursday"
	weekday[5]="Friday"
	weekday[6]="Saturday"
	var retDayWeek = weekday[newDate.getDay()];
	return retDayWeek;
}
var sessionTimedOut = false;
// Handle Session timeouts for all AJAX requests
function handleSessionTimeoutAndFatalErrors(responseText) {
	if (responseText.indexOf("Enter User ID and password") != -1) {
		alert("It appears your session has timed out. Please close the window you were using and return to the main browser window to login.");
		window.close();
		sessionTimedOut = true;
		return true;
	} else if (responseText.indexOf('Sorry we have been unable to process your request at this time.') != -1) {
		document.location="/DSAWeb/error.jsp";
		return true;
	}
	
	return false;
}
function zapQuotationMarks(myString) {
	myString = myString.replace(/"/g, '&quot;');
	return myString;
}

function enableButton(button,flag, classN ) {
	if(button) {
		button.disabled = flag;
		if(classN) {
			button.className = classN;
		}
	}
}

function ActivityPermission(c,r,u,d) {
	this.create =c;
	this.read = r;
	this.update =u;
	this.delet =d;

	this.isAnyPermission = function () {
		return this.create || this.read || this.update || this.delet;
	}

	this.isAllPermission = function () {
		return this.create && this.read && this.update && this.delet;
	}

	this.isReadOnly = function () {
		return this.read && !(this.create || this.update || this.delet);
	}

	this.isCreateAllowed = function () {
		return this.create;
	}

	this.isUpdateAllowed = function () {
		return this.update;
	}
}

function encodeApos(text) {
	var re = /\'/g;
	return text.replace(re, "&#8217;");
	
}

// Functions for enforcing maximum field length on textarea widgets
// To use, add these event handlers:
// <textarea ... onkeypress="maxLength(this, nnn);" onpaste="maxLengthPaste(this, nnn);">
function maxLength(field,maxChars)
{
	if(field.value.length >= maxChars) {
		event.returnValue=false;
		return false;
	}
}

function maxLengthPaste(field,maxChars)
{
	event.returnValue=false;
	if((field.value.length +  window.clipboardData.getData("Text").length) > maxChars) {
		return false;
	}
	event.returnValue=true;
}
/*This function will change the lowercase
	letter to uppercase.
 */
function uppercase() {
	key = window.event.keyCode;
	if ((key > 0x60) && (key < 0x7B))
	window.event.keyCode = key-0x20;
}


// Escape HTML characters - add any more that are needed
function escapeHTML(str){
    var outputString = "";
    var characterCodes = {};
    characterCodes['34'] = '&quot;';
    characterCodes['38'] = '&amp;';
    characterCodes['39'] = '&#39;';
    characterCodes['60'] = '&lt;';
    characterCodes['62'] = '&gt;';

    for(i = 0; i < str.length; i++){
        var charCode = str.charCodeAt(i);
        if(charCode in characterCodes){
            outputString += characterCodes[charCode];
        }else{
            outputString += str.charAt(i);
        }
    }
return outputString;
}

/*
 * Add a given number of days to a date.
 */
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

/*
 * Parse a date in dd/mm/yyyy format, returning a Date object.
 */
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
}
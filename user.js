function saveUserData(url) // This function requires the order/CFormSaver.js to be included.
{
    //SaveToCookie(document.form1, "userInfoCookie", document, false);
    document.location.href = url;
}

function focusTextField()
{
	if(document.form1 != undefined) {
		for(var i=0; i<document.form1.elements.length; i++)
	    {   // Focus on the 1st text OR password entry field
	        if( document.form1.elements[i].type == "text" || document.form1.elements[i].type == "password" )
	        {
	            document.form1.elements[i].focus();
	            break;
	        }
	    }
	}    
}

function openResolutionWarningWindow(target)
{
    CPopup.close();
    setWindowProperties('width=475,height=530,resizable,scrollbars');
    openWindow(target);
}

function openResolutionWarningWindowWalmart(target)
{
    CPopup.close();
    setWindowProperties('width=520,height=530,resizable,scrollbars');
    openWindow(target);
}
function openResolutionWarningWindowWM(target,classname,closebutton)
{
	var ele = document.getElementById('first'); 
  	if(ele==null) 
        alert('no way !'); 
    else {
    	if(ele.style.visibility == "visible"){
            ele.style.visibility = "hidden";
            ele.style.display = "none";
        } else {
			document.getElementById("helpWindow").className = classname;
			var width = 600;
			document.getElementById("helpWindow").src = target;
      		positionWindowWarning("helpWindowDiv",width);
       		document.getElementById("helpWindowDiv").style.display = "";
       		if(closebutton== "false"){
       		document.getElementById("closeButton").style.display = "none";
       		}else{
       		document.getElementById("closeButton").style.display = "";
       		}
		    ele.style.visibility = "visible";
		    ele.style.display="block";
      		}
    }
    
 	}

function openResolutionWarningWindowCostco(target)
{
    setWindowProperties('width=339,height=240,resizable,scrollbars');
    openWindow(target);
}

function openAOLResolutionWarning()
{
    setWindowProperties('width=475,height=400,scrollbars=yes,resizable=no');
    openWindow('/resolutionaolwarning');
}

function openAOLGiftsResolutionWarning()
{
    setWindowProperties('width=475,height=400,scrollbars=yes,resizable=no');
    openWindow('/resolutionwarningaolgifts');
}

function openPreviewWindow(target)
{
    setWindowProperties('width=560,height=475,resizable,scrollbars=yes');
    openWindow(target);
}

function openPreviewEditWindow(target)
{
    setWindowProperties('width=560,height=475,resizable=no,scrollbars=yes');
    openWindow(target);
}


function openPhotoCardsWindow(target)
{
    setWindowProperties('width=505,height=505,resizable,scrollbars=yes');
    openWindow(target);
}

function openRemoveCartWindow(target)
{
    setWindowProperties('width=440,height=260,resizable');
    openWindow(target);
}

function openEditShippingWindow(target)
{
    setWindowProperties('width=415,height=350,resizable');
    openWindow(target);
}

function openCancelWindow(target)
{
    setWindowProperties('width=415,height=230,resizable');
    openWindow(target);
}

function openCancelUploadInstallWindow(target)
{
    setWindowProperties('width=380,height=310,resizable');
    openWindow(target);
}

function openCancelUploadUpgradeWindowMac(target)
{
    setWindowProperties('width=380,height=210,resizable');
    openWindow(target);
}

function openForgotPasswordWindow(target)
{
    setWindowProperties('width=430,height=300,resizable');
    openWindow(target);
}

function openNotFromUSAWindow(target)
{
    setWindowProperties('width=440,height=170,resizable');
    openWindow(target);
}

function openTermsnConditionsWindow(target)
{
    setWindowProperties('width=480,height=480,resizable,scrollbars=yes');
    openWindow(target);
}

function popupcottages4utermsnconditionspopup(target)
{
    setWindowProperties('width=480,height=320,resizable,scrollbars=yes');
    openWindow(target);
}

// walgreens privacy window
function openResizablePrivacyWindow(target)
{
	setWindowProperties('width=1000,height=650,resizable,scrollbars=yes');
    openWindow(target);
}

function openPrivacyWindow(target)
{
	setWindowProperties('width=1000,height=650,dialog=yes,scrollbars=yes');
    openWindow(target);
}

function openPricingWindow(target)
{
    setWindowProperties('width=480,height=480,resizable,scrollbars=yes');
    openWindow(target);
}
function openJWLPricingWindow(target)
{
    setWindowProperties('width=440,height=365,resizable,scrollbars=yes');
    openWindow(target);
}

function openHelpWindow(target)
{
    setWindowProperties('width=450,height=520,resizable,scrollbars=yes');
   if( arguments.length >1)
    {
      var lm = CLinkManager.getInstance(target);
      lm.setURLParameter( "sectionId", arguments[1]);
      openWindow(lm.getURL());
    }
    else
        openWindow(target);
    return ;
}

function openHelpWindow1(target)
{
    setWindowProperties('width=600,height=410,resizable,scrollbars=yes');
    openWindow(target);
}


function openDynamicHelpWindow(target,witdth,height)
{

    setWindowProperties('width='+witdth+' ,height='+height+',resizable,scrollbars=yes');
   if( arguments.length >3)
    {
      var lm = CLinkManager.getInstance(target);
      lm.setURLParameter( "sectionId", arguments[3]);
      openWindow(lm.getURL());
    }
    else
        openWindow(target);
    return ;
}


function openUploadHelpWindow(target)
{
    setWindowProperties('width=600,height=480,resizable,scrollbars=yes');
    openWindow(target);
}

function openMilitaryWindow(target)
{
    setWindowProperties('width=450,height=300,resizable,scrollbars=yes');
    openWindow(target);
}

function openSavePasswordWindow(target)
{
    setWindowProperties('width=450,height=340,resizable,scrollbars=yes');
    openWindow(target);
}

function openPopularPhoto(target)
{
    setWindowProperties('width=610,height=575,resizable,scrollbars=yes');
    openWindow(target);
}

function openPcData(target)
{
    setWindowProperties('width=610,height=500,resizable,scrollbars=yes');
    openWindow(target);
}

function openPrintsKodak(target)
{
   setWindowProperties('width=610,height=400,resizable=yes');
   openWindow(target);
}


function openVeriSignWindow(target)
{
    setWindowProperties('width=800,height=430,resizable,scrollbars=yes');
    openVerisignTrusteWindow(target);
}

function openPrivacyPopups(target)
{
    setWindowProperties('width=440,height=430,resizable,scrollbars=yes');
    openWindow(target);
}

function openSweepsRulesPopup(target)
{
    setWindowProperties('width=400,height=350,resizable,scrollbars=yes');
    openWindow(target);
}

function buildPhoneNumber(areaCode, number, phoneNumber)
{
    phoneNumber.value = areaCode.value + number.value;
}

function openChoosFromAddressBookWindow(target)
{
    setWindowProperties('width=450,height=340,resizable,scrollbars=yes');
    openWindow(target);
}

function openCouponWindow(target)
{
    setWindowProperties('width=415,height=240,resizable,scrollbars=yes');
    openWindow(target);
}

function openInfoFreeReprintsWindow(target)
{
    setWindowProperties('width=550,height=500,resizable');
    openWindow(target);
}

function openStoreWindow(target)
{
    setWindowProperties('width=475,height=380,scrollbars=yes');
    openWindow(target);
}

function openFileModeHelpWindow(target)
{
    setWindowProperties('titlebar=0,toolbar=0,status=0,scrollbars=1,height=450,width=550,resizable');
    openWindow(target);
}

function checkForNumber(textField,event)
{
    var value = parseInt(parseFloat(textField.value));
    if( value ) {
       textField.value =  Math.abs(value);
    } else {
        if(event.keyCode == 8 || event.keyCode == 46) {
            textField.value = "";
        } else {
            textField.value = 0;
        }
    }  
}

function checkForNumberElseDefault(textField,event,textvalue)
{
    var value = parseInt(parseFloat(textField.value));
    if( value ) {
       textField.value =  Math.abs(value);
    } else {
        if(event.keyCode == 8 || event.keyCode == 46) {
            textField.value = "";
        } else {
            textField.value = textvalue;
        }
    }
}

function openAOLAlertPopupWindow(target , windowProps )
{
    setWindowProperties(windowProps);
    openWindow(target);
}

function getFormObj(name)
{
    var formObj = eval(document.forms[name]);
    if((typeof formObj) == "object")
    {
        return formObj;
    }else{
        alert("The form " + name +" does not exists in this document");
        return ;
    }
}


//Walgreens User Registration Validations
function validateForm(formObj)
{
	if(CUtils.isEmpty(formObj.firstname.value)){
		alert("First name cannot be empty.") ;
		formObj.firstname.focus() ;
		return false ;
	}
	if(CUtils.isEmpty(formObj.lastname.value)){
		alert("Last name cannot be empty.") ;
		formObj.lastname.focus() ;
		return false ;
	}
	if(isEmailValid(formObj.username.value)==false){
		formObj.username.focus() ;
		return false ;
	}
    if(formObj.username.value != formObj.emailaddress.value){
        alert("Email address and Confirm Email address does not match.") ;
        formObj.emailaddress.focus();
        return false ;
    }
	if(CUtils.isEmpty(formObj.password.value)){
		alert("Password cannot be empty.") ;
		formObj.password.focus() ;
		return false ;
	}
	if(formObj.password.value.length < 8){
		alert("Password cannot be less than 8 characters.") ;
		formObj.password.focus() ;
        formObj.password.value = "";
        formObj.password2.value = "";
		return false ;
	}
	var password = formObj.password.value;
	if(isAlphabetic(password) || isInteger(password) || !isNumberExists(password)){
		alert("Your password must contain both numbers and letters.");
		formObj.password.focus();
        formObj.password.value = "";
        formObj.password2.value = "";

		return false;
	}
	if(formObj.password2.value != formObj.password.value){
		alert("Password and Repeat Password does not match.") ;
		formObj.password2.focus();
        formObj.password2.value = "";
		return false ;
	}
	return true ;
}

//method returns true, while string contains number
function isNumberExists(s){
    if(CUtils.isEmpty(s)) return false;
    for(var i = 0; i < s.length; i++){
        var c = s.charAt(i);
        if (isDigit(c)) return true;
    }
    return false;
}

function isEmailValid(emailAddress)
{
   var email = trim(emailAddress) ;
   var length = email.length ;
   var index = -1 ;
   var isValidChar = false  ;
   index = email.indexOf('@') ;
   if( index == -1 || index == length-1 || index == 0)
   {
      alert("Please enter a valid email address.");
      return false ;
   }
   if( email.indexOf('@', index+1 ) != -1)
   {
      alert("Please enter a valid email address.");
      return false ;
   }

   index = email.indexOf('.',index+1) ;
   if( index == -1 || index == length-1 )
   {
      alert("Please enter a valid email address.") ;
      return false ;
   }
   if( email.indexOf(' ') != -1 )
   {
      alert("Please enter a valid email address.");
      return false ;
   }
    var iChars = "!\'?#$%&*/=^()[];{}|:<>\\"; // WG.COM is not accepting these chars.
    for (var i = 0; i <email.length; i++)
    {
        if (iChars.indexOf(email.charAt(i)) != -1)
        {
            alert("Please enter a valid email address.");
            return false;
        }
    }
    return true;
 }

function trim(string)
{
  var flag = new Boolean(false);
  var tempString = string ;
  var length = string.length ;
  for( i=0 ; i<length ; i++ )
  {
    if(string.charAt(i) == ' ')
    {
      flag = new Boolean(true);
      continue ;
    }
    else
    {
      if( i == 0 ) break ;
      if( flag == true )
      {
        tempString = string.substring(i) ;
        flag = new Boolean(false);
        break;
      }
    }

  }
  length = tempString.length ;
  for( i=length-1 ; i>=0 ; i-- )
  {
    if(tempString.charAt(i) == ' ')
    {
      flag = new Boolean(true);
      continue ;
    }
    else
    {
      if(i==length-1) break ;
      if( flag == true )
      {
        tempString = tempString.substring(0,i+1) ;
        flag = new Boolean(false);
        break;
      }
    }
  }
  if( flag == true )
    return ''
  else
    return tempString ;
}   //End of trim()

 // validating login form in walgreens
 function walgreensValidateLoginForm(formObj){
	    if(CUtils.isEmpty(formObj.username.value) == true){
	          formObj.username.focus() ;
	          alert("Username cannot be empty.") ;
	          return false ;
	     }
	     if(CUtils.isEmpty(formObj.password.value) == true){
	          formObj.password.focus() ;
	          alert("Password cannot be empty.") ;
	          return false ;
	     }
	     if(CUtils.isEmpty(formObj.password.value) == false &&
	          formObj.password.value.length < 6)
	     {
	          formObj.password.focus() ;
	          formObj.password.select() ;
	          alert("Password cannot be less than 6 characters.") ;
	          return false ;
	     }

	    return true ;
 }
 
 function validateLoginForm(formObj){

     if(CUtils.isEmpty(formObj.username.value) == true){
          formObj.username.focus() ;
          alert("Username cannot be empty.") ;
          return false ;
     }
     if(CUtils.isEmpty(formObj.password.value) == true){
          formObj.password.focus() ;
          alert("Password cannot be empty.") ;
          return false ;
     }
     if(CUtils.isEmpty(formObj.password.value) == false &&
          formObj.password.value.length < 6)
     {
          formObj.password.focus() ;
          formObj.password.select() ;
          alert("Password cannot be less than 6 characters.") ;
          return false ;
     }

    return true ;
 }

 function uploadHiRes(url){
    var lm = CLinkManager.getInstance(url);
    document.location.href = lm.getURL() ;

 }
 
 function goToMicroSite()
 {  
    window.parent.location.href = 'https://migration.bootsphoto.com';
 }

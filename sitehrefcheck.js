    var agt = navigator.userAgent.toLowerCase();
    var is_major = parseInt(navigator.appVersion);
    var is_ie  = ((agt.indexOf("msie") != -1) && (agt.lastIndexOf(")") == agt.length-1));
    var is_nav = (navigator.appName.indexOf("Netscape") != -1);
    var is_nav4 = (is_nav && is_major == 4);
    var is_nav6 = (is_nav && (is_major > 4));

    var flowLinkClicked = false ;
    var callHandleClickNSorIE = false;
    var windowprops = "width=430,height=380,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=yes";

    if (is_nav4){
      document.captureEvents(Event.CLICK);
    }
    window.document.onclick = handleClick ;

    function handleClick(evt)
    {
        if(is_ie){
            handleClickIE() ;
        }else if(is_nav4){
            handleClickNS(evt.target.href) ;
        }else if(is_nav6)
        {
            var linkURL = evt.target.href ;
            if(!linkURL){
                linkURL = evt.target.parentNode ;
            }
            linkURL = linkURL + " ";
            handleClickNS(linkURL) ;
        }
    }

    function handleClickIE()
    {
        //alert("handleClickIE called");
        callHandleClickNSorIE = true;
        var target = event.srcElement;
        var targetParent = event.srcElement.parentElement;

        if(targetParent == null)
        {
            targetParent = new Object();
        }
		//alert(target.href);
        if(target.href && !targetParent.href &&
           (target.href.indexOf(".jpg") != -1 || target.href.indexOf(".gif") != -1))
        {
            //do nothing
            //alert("Plain image");
        }else if(target.href && targetParent.href)
        {
            //alert("Image link");
            flowLinkClicked = true ;
            if(typeof(isCartPopup) != "undefined" && !isCartPopup) {
                if(targetParent.href.indexOf("javascript:") == -1)
                    flowLinkClicked = false ;
            }
            if(typeof(isCartPopup) != "undefined" && isCartPopup) {
                if(targetParent.href.indexOf("signOut") != -1) {
                    flowLinkClicked = false;
                }
            }
        }else if(!target.href && !targetParent.href)//just clicked
        {
            //do nothing
            //alert("just clicked");
            flowLinkClicked = true ;
        }else//text link
        {
            //alert("text link");
            if(target.href)
            {
                //if(target.href.indexOf("javascript:") == -1)
                    flowLinkClicked = true ;
                if(typeof(isCartPopup) != "undefined" && isCartPopup) {
                    if(target.href.indexOf("signOut") != -1) {
                        flowLinkClicked = false;
                    }
                }

            }else if(targetParent.href)
            {
                //if(targetParent.href.indexOf("javascript:") == -1)
                    flowLinkClicked = true ;
                if(typeof(isCartPopup) != "undefined" && isCartPopup) {
                    if(targetParent.href.indexOf("signOut") != -1) {
                        flowLinkClicked = false;
                    }
                }
            }
        }
        //alert("(IE)flowLinkClicked=" + flowLinkClicked);
    }


    function handleClickNS(url)
    {
    	callHandleClickNSorIE = true;
        if(url)
        {
            //alert("url=" + url);
            if(url.indexOf("signOut") == -1)
                flowLinkClicked = true ;
        }else{
            //alert("just clicked");
        }
        //alert("(NS)flowLinkClicked=" + flowLinkClicked);
    }
    


    function unloadEvent()
    {
     if(hasBrowserClosed())
     {
      //show popup
       if(activationPopupURL!=null && activationPopupURL!=""){
      self.window.open(activationPopupURL, "POPUP", windowprops);
       }
     }
     else if(isHREFFlow()||(!callHandleClickNSorIE))
     {
        //DO NOT show any popup
        return ;
     }
     else
     {
      //show popup
      if(activationPopupURL!=null && activationPopupURL!=""){
      self.window.open(activationPopupURL, "POPUP", windowprops);
     }

     }
    }//end of unloadEvent

    function isHREFFlow()
    {
       	return flowLinkClicked ;
    }

    function hasBrowserClosed()
    {

        if(window.screenLeft < 10004)
       {
            return false ;
       }else if(typeof(window.screenLeft) == "undefined")
       {
            return false ;
       }
       else
       {
            return true ;
       }

    }


	

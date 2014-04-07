var zIndexVal = 100;
var pageGreyOut = "false";
var layerIdParamsMap = new Array();


//****************** LAYER CODE START ******************/

var CLayer = new _CLayer();

function _CLayer()
{
    this.refDivObj = new Array();
    this.openLayer = _CLayer_openLayer;
    this.closeLayer = _CLayer_closeLayer;
    this.closeLayers = _CLayer_closeLayers;
    this.closeAllLayers = _CLayer_closeAllLayers;
    this.updateLayer = _CLayer_updateLayer;
	this.showLayer = _CLayer_showLayer;
    this.greyOut = _CLayer_greyOut;
    this.size=0;
}

function _CLayer_openLayer(layerId, tempLayerParams)
{  
	if(_CLayer_isElementDefined(layerId, false)) 
    {
    	 this.size= this.size+1;
        var layerParams = _CLayer_setLayerParams(tempLayerParams);
        layerIdParamsMap[layerId] = layerParams;

        if(_CLayer_getArrayElementIndex(this.refDivObj, layerId) == -1)
        {
			this.refDivObj.push(layerId);
            _CLayer_createLayer(layerId, layerParams);

            if(layerParams.isMovable == "true")
            {
                setMovableDiv(layerId);
            }            
        }
        else
        {
			_CLayer_updateLayer(layerId, layerParams);
        }

        if(layerParams.greyOut == "true")
        {
			pageGreyOut = "true";
            var options = new Array();
            if(_CLayer_isElementDefined(layerId, true))
            {
               
                options.zindex = document.getElementById(layerId).style.zIndex;
                options.opacity = layerParams.opacity;
            }
            else{
            	
                options.zindex = zIndexVal;
                }

			this.greyOut(true, options);
        }

		 if(layerParams.hidden == "true"){
			 _CLayer_hideLayer(layerId);
		 }else{
			 _CLayer_showLayer(layerId);
		 }
    }

}

function _CLayer_setLayerParams(layerParams)
{
    if(layerParams.type == undefined)
        layerParams.type = "iframe";
    else
        layerParams.type = layerParams.type.toLowerCase();

    if(layerParams.scrolling == undefined)
        layerParams.scrolling = "auto";
    else
        layerParams.scrolling = layerParams.scrolling.toLowerCase();

    if(layerParams.isMovable == undefined)
        layerParams.isMovable = "true";
    else
        layerParams.isMovable = layerParams.isMovable.toLowerCase();

    if(layerParams.templateName == undefined)
        layerParams.templateName = "default";
    else
        layerParams.templateName = layerParams.templateName.toLowerCase();

    if(layerParams.clearDiv == undefined)
    {
        if(layerParams.type == "div")
            layerParams.clearDiv = "false";
        else
            layerParams.clearDiv = "true";
    }
    else
        layerParams.clearDiv = layerParams.clearDiv.toLowerCase();

	if(layerParams.reload == undefined)
		layerParams.reload = "true";
	else
		layerParams.reload = layerParams.reload.toLowerCase();

    if(layerParams.position == undefined)
        layerParams.position = "absolute";
    else
        layerParams.position = layerParams.position.toLowerCase();

    if(layerParams.greyOut == undefined)
        layerParams.greyOut = "true";
    else
        layerParams.greyOut = layerParams.greyOut.toLowerCase();

    if(layerParams.greyOut == "true")
        layerParams.zIndexValue = zIndexVal;
    else
        layerParams.zIndexValue = 0;

    if(layerParams.src == undefined)
        layerParams.src = "";
        
    if(layerParams.layerTitle == undefined)
        layerParams.layerTitle = "";
	
    if(layerParams.top == undefined)
    {
    	var topPos;
    	if(!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
    		if(layerParams.height!=undefined)
    		{
	    		topPos = _CLayer_getTopPosition()+(document.body.clientHeight-layerParams.height)/2;
	    		topPos-=35;// excluding w-greyshadow-top-popup height
	    	    layerParams.top = Math.round(topPos)+"px";
	    	}
	    	else
	    	{
	    		topPos = _CLayer_getTopPosition()+90;
	    		layerParams.top = topPos+"px";
	    	}
    	}
    	else
    	{
    		topPos = _CLayer_getTopPosition() + 90;
            layerParams.top = topPos+"px";
    	}
    }
    else
        layerParams.top = layerParams.top+"px";

    if(layerParams.left == undefined)
    {
    	var leftPos;
    	if(!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
    		if(layerParams.width!=undefined)
    		{
    			leftPos = (document.body.clientWidth-layerParams.width)/2;
    			leftPos-=35;// excluding w-greyshadow-left-popup width
	    	    layerParams.left = Math.round(leftPos)+"px";
	    	}
	    	else
	    	{
	    		leftPos = _CLayer_getLeftPosition()+200;
	    		layerParams.left = leftPos+"px";
	    	}
    	}
    	else
    	{
    		leftPos = _CLayer_getLeftPosition() + 200;
            layerParams.left = leftPos+"px";
    	}
    }
    else
        layerParams.left = layerParams.left+"px";

    if(layerParams.width == undefined)
        layerParams.width = "200px";
    else
        layerParams.width = layerParams.width+"px";

    if(layerParams.height == undefined)
        layerParams.height = "30px";
    else
        layerParams.height = layerParams.height+"px";

	if(layerParams.isInnerLayer == undefined)
        layerParams.isInnerLayer = "false";
    else
        layerParams.isInnerLayer = layerParams.isInnerLayer.toLowerCase();
        
    if(layerParams.isAutoCentered == undefined)
        layerParams.isInnerLayer = "false";

    if(layerParams.contentDivPadding == undefined)
        layerParams.contentDivPadding = 10;

	if(layerParams.isSecure == true)
	{
		layerParams.scheme="https://";
	}else 
	{
		layerParams.scheme="http://";
	}
	if(layerParams.isStoreWidgetDesign == undefined)
        layerParams.isStoreWidgetDesign = "false";
    else
       layerParams.isStoreWidgetDesign = layerParams.isStoreWidgetDesign.toLowerCase();

	if(layerParams.isNewDesign == undefined)
        layerParams.isNewDesign = "false";
    else
       layerParams.isNewDesign = layerParams.isNewDesign.toLowerCase();
    
    if(layerParams.isSquareCornerDesign == undefined)
        layerParams.isSquareCornerDesign = "false";
    else
       layerParams.isSquareCornerDesign = layerParams.isSquareCornerDesign.toLowerCase();
       
    if(typeof layerParams.noCloseButton === 'undefined')
        layerParams.noCloseButton = "false";
    else
        layerParams.noCloseButton = layerParams.noCloseButton.toLowerCase();   
    

    return layerParams;

}

function _CLayer_getLeftPosition(evt) 
{
	return document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;	
}

function _CLayer_getTopPosition(evt) 
{
	return document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
}

function _CLayer_getArrayElementIndex(refArray, arrElement)
{
    for(var i=0; i<refArray.length; i++)
    {
        if(refArray[i] == arrElement)
            return i;
    }
    return -1;
}

function _CLayer_createLayer(layerId, layerParams)
{
	var layerInnerHtml = new Array();

    switch(layerParams.templateName)
    {
        default : layerInnerHtml = _CLayer_getDefaultLayer(layerId, layerParams);
            break;
    }
    var mainDivEle = document.createElement('div');
    mainDivEle.id = "mainDiv_"+layerId;
    mainDivEle.name = "mainDiv_"+layerId;
    mainDivEle.style.top = "0px";
    mainDivEle.style.left = "0px";
    mainDivEle.style.textAlign = "center";
    mainDivEle.style.position = "absolute";
    mainDivEle.style.width = "100%";
    mainDivEle.style.height = "100%";
    mainDivEle.style.zIndex = layerParams.zIndexValue;
    var ele;
    
    ele = document.body;
    ele.appendChild(mainDivEle);
    var layerHtmlCode = "";
    layerHtmlCode = layerInnerHtml.join('');
    document.getElementById("mainDiv_"+layerId).innerHTML = layerHtmlCode;

    var innerText = "";
    if(layerParams.type == "iframe")
        innerText = _CLayer_getIFrame(layerId, layerParams);
    else
        innerText = _CLayer_getDiv(layerId, layerParams);

    document.getElementById("main_content_div_"+layerId).innerHTML = innerText;
    return true;
}

/*function _CLayer_getDefaultLayer(layerId, layerParams)
{
    var layerInnerHtml = new Array();
	if(layerParams.isInnerLayer == "true")
	{
		layerInnerHtml.push("<div style='position:relative;width:"+layerParams.width+";height:"+layerParams.height+";margin:0 auto;text-align:left;'>");
	}
	else
	{
		layerInnerHtml.push("<div id='LayerContainerDiv' style='position:relative;width:766px;height:100%;margin:0 auto;text-align:left;'>");
	}
    var mainDivDispStyle = "block";
    var loadDispStyle = "none";
    if(layerParams.type == "iframe"  && !(layerParams.animation == 'true'))
    {
        mainDivDispStyle = "none";
        loadDispStyle = "block";
    }
    

}*/

function _CLayer_getDefaultLayer(layerId, layerParams)
{
    var layerInnerHtml = new Array();
	if(layerParams.isInnerLayer == "true")
	{
		layerInnerHtml.push("<div style='position:relative;width:"+layerParams.width+";height:"+layerParams.height+";margin:0 auto;text-align:left;'>");
	}
	else if(layerParams.isAutoCentered == "true"){
	    layerInnerHtml.push("<div id='LayerContainerDiv' style='position:relative;width:"+layerParams.width+";margin-left: auto;margin-right: auto;height:100%;margin:0 auto;text-align:left;'>");
	}
	else
	{
		layerInnerHtml.push("<div id='LayerContainerDiv' style='position:relative;width:766px;height:100%;margin:0 auto;text-align:left;'>");
	}
    var mainDivDispStyle = "block";
    var loadDispStyle = "none";
    if(layerParams.type == "iframe"  && !(layerParams.animation == 'true'))
    {
        mainDivDispStyle = "none";
        loadDispStyle = "block";
    }
    if (layerParams.isStoreWidgetDesign == "true"){
	    layerInnerHtml.push("<div style='display:none;z-index:"+layerParams.zIndexValue+";position:absolute;width:"+layerParams.width+";height:"+layerParams.height+";top:"+layerParams.top+";left:"+layerParams.left+";' id='"+layerId+"' name='"+layerId+"'>");
	    layerInnerHtml.push("<table align='center' border='0' cellspacing='0' cellpadding='0'>");
	    layerInnerHtml.push("<tr align='left' valign='top'>");
	    layerInnerHtml.push("<td width='35px' height='35' class='w-shadow-topleft'></td>");
	    layerInnerHtml.push("<td class='w-shadow-top-popup' height='35px'></td>");
	    layerInnerHtml.push("<td width='35px' height='35' class='w-shadow-topright' onclick='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")'>");
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("<tr align='right' valign='top'>");
	    layerInnerHtml.push("<td width='35px' class='w-shadow-left'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"'  width='35px' />" );
	    }else{
	        layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='35px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("<td bgcolor='#ffffff'>");
	    layerInnerHtml.push("<div id='movHeader_"+layerId+"' name='movHeader_"+layerId+"'>");
	    //layerInnerHtml.push("<span id='layerTitle_"+layerId+"' name='layerTitle_"+layerId+"'>"+layerParams.layerTitle+"</span>");
	    //layerInnerHtml.push("<a href='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")' style='text-decoration:none;' title=\" close \">X</a>");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("<div class='contentDiv' style='display:"+mainDivDispStyle+";' id='main_content_div_"+layerId+"' name='main_content_div_"+layerId+"' >");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("<div class='contentDiv' style='display:"+loadDispStyle+"; margin:auto; width:"+layerParams.width+"; height:"+layerParams.height+";' id='load_msg_div_"+layerId+"' align='center' name='load_msg_div_"+layerId+"' >");
	    layerInnerHtml.push("<table width="+layerParams.width+" height="+layerParams.height+" id='load_msg_table_"+layerId+"' align='center' name='load_msg_table_"+layerId+"' >");
	    layerInnerHtml.push("<tr>");
	    layerInnerHtml.push("<td align='center' valign='middle'><div id='optLoadMsg"+layerId+"' name='optLoadMsg"+layerId+"'>loading...<br><br><img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/walgreens/upload/loading-Please-wait.gif'></div></td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("</table>");
	    layerInnerHtml.push("</div>");
	    if (layerParams.closeImgSrc){
	    	layerInnerHtml.push("<a id='closebutton' href='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")'  title=\" close \" ><img src='"+layerParams.closeImgSrc+"'> </a>");
	    }else{
	         layerInnerHtml.push("<a href='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")' style='text-decoration:none;background-color:#0b94d0;color: #ffffff;font-weight:bold;padding:5px 20px 5px;' title=\" close \" > close  </a>");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("<td width='35px' align='right' class='w-shadow-right'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"'width='6px' />");
	    }else{
	        layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='6px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("<tr align='left' valign='top'>");
	    layerInnerHtml.push("<td width='35px' height='35' class='w-shadow-bottomleft'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"'width='11px' />");
	    }else{
	        layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='11px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("<td class='w-shadow-bottom' height='35'></td>");
	    layerInnerHtml.push("<td width='35px' class='w-shadow-bottomright'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"'width='35px' />");
	    }else{
	        layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='35px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("</table>");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("</div>");
    }else if (layerParams.isNewDesign == "true"){
    	 	layerInnerHtml.push("<div style='display:none;z-index:"+layerParams.zIndexValue+";position:absolute;width:"+layerParams.width+";height:"+layerParams.height+";top:"+layerParams.top+";left:"+layerParams.left+";' id='"+layerId+"' name='"+layerId+"'>");
    	    layerInnerHtml.push("<table align='center' border='0' cellspacing='0' cellpadding='0'>");
    	    layerInnerHtml.push("<tr align='left' valign='top'>");
    	    layerInnerHtml.push("<td width='35px' height='35' class='w-greyshadow-topleft'></td>");
    	    layerInnerHtml.push("<td class='w-greyshadow-top-popup' height='35px'></td>");
    	    
	        if(layerParams.showClose==undefined || layerParams.showClose=="true")
	        	layerInnerHtml.push("<td width='35px' height='35' class='w-greyshadow-topright' onclick='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")'>");
	        else
	        	layerInnerHtml.push("<td width='35px' height='35' class='w-greyshadow-topright'>");
    	    layerInnerHtml.push("</td>");
    	    layerInnerHtml.push("</tr>");
    	    layerInnerHtml.push("<tr align='right' valign='top'>");
    	    layerInnerHtml.push("<td width='35px' class='w-greyshadow-left'>");
    	    if (layerParams.spacerImgSrc){
    	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='35px' />");
    	    } else {
    	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='35px' />");
    	    }
    	    layerInnerHtml.push("</td>");
    	    layerInnerHtml.push("<td bgcolor='#ffffff'>");
    	    layerInnerHtml.push("<div id='movHeader_"+layerId+"' name='movHeader_"+layerId+"'>");
    	    //layerInnerHtml.push("<span id='layerTitle_"+layerId+"' name='layerTitle_"+layerId+"'>"+layerParams.layerTitle+"</span>");
    	    //layerInnerHtml.push("<a href='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")' style='text-decoration:none;' title=\" close \">X</a>");
    	    layerInnerHtml.push("</div>");
    	    layerInnerHtml.push("<div class='contentDiv' style='display:"+mainDivDispStyle+";' id='main_content_div_"+layerId+"' name='main_content_div_"+layerId+"' >");
    	    layerInnerHtml.push("</div>");
    	    layerInnerHtml.push("<div class='contentDiv' style='display:"+loadDispStyle+"; margin:auto; width:"+layerParams.width+"; height:"+layerParams.height+";' id='load_msg_div_"+layerId+"' align='center' name='load_msg_div_"+layerId+"' >");
    	    layerInnerHtml.push("<table width="+layerParams.width+" height="+layerParams.height+" id='load_msg_table_"+layerId+"' align='center' name='load_msg_table_"+layerId+"' >");
    	    layerInnerHtml.push("<tr>");
    	    layerInnerHtml.push("<td align='center' valign='middle'><div id='optLoadMsg"+layerId+"' name='optLoadMsg"+layerId+"'>loading...<br><br><img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/walgreens/upload/loading-Please-wait.gif'></div></td>");
    	    layerInnerHtml.push("</tr>");
    	    layerInnerHtml.push("</table>");
    	    layerInnerHtml.push("</div>");
    	    layerInnerHtml.push("</td>");
    	    layerInnerHtml.push("<td width='35px' align='right' class='w-greyshadow-right'>");
    	    if (layerParams.spacerImgSrc){
    	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='6px' />");
    	    } else {
    	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='6px' />");
    	    }
    	    layerInnerHtml.push("</td>");
    	    layerInnerHtml.push("</tr>");
    	    layerInnerHtml.push("<tr align='left' valign='top'>");
    	    layerInnerHtml.push("<td width='35px' height='35' class='w-greyshadow-bottomleft'>");
    	    if (layerParams.spacerImgSrc){
    	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='11px' />");
    	    } else {
    	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='11px' />");
    	    }
    	    layerInnerHtml.push("</td>");
    	    layerInnerHtml.push("<td class='w-greyshadow-bottom' height='35'></td>");
    	    layerInnerHtml.push("<td width='35px' class='w-greyshadow-bottomright'>");
    	    if (layerParams.spacerImgSrc){
    	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='35px' />");
    	    } else {
    	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='35px' />");
    	    }
    	    layerInnerHtml.push("</td>");
    	    layerInnerHtml.push("</tr>");
    	    layerInnerHtml.push("</table>");
    	    layerInnerHtml.push("</div>");
    	    layerInnerHtml.push("</div>");
    }else if (layerParams.isSquareCornerDesign == "true"){
        layerInnerHtml.push("<div style='display:none;z-index:"+layerParams.zIndexValue+";position:absolute;width:"+layerParams.width+";height:"+layerParams.height+";top:"+layerParams.top+";left:"+layerParams.left+";' id='"+layerId+"' name='"+layerId+"'>");
        layerInnerHtml.push("<table align='center' border='0' cellspacing='0' cellpadding='0'>");
        layerInnerHtml.push("<tr align='left' valign='top'>");
        layerInnerHtml.push("<td width='40px' height='40px' class='w-square-greyshadow-topleft'></td>");
        layerInnerHtml.push("<td class='w-square-greyshadow-top-popup' height='35px'></td>");
        layerInnerHtml.push("<td width='40px' height='40px' ");
        
        if(layerParams.noCloseButton === "true"){      
            layerInnerHtml.push("class='w-square-greyshadow-topright-noclose'");
        }
        else{
            layerInnerHtml.push("class='w-square-greyshadow-topright' onclick='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")'>");
        }
        
        layerInnerHtml.push("</td>");
        layerInnerHtml.push("</tr>");
        layerInnerHtml.push("<tr align='right' valign='top'>");
        layerInnerHtml.push("<td width='40px' class='w-square-greyshadow-left'>");
        layerInnerHtml.push("</td>");
        layerInnerHtml.push("<td bgcolor='#ffffff'>");
        layerInnerHtml.push("<div id='movHeader_"+layerId+"' name='movHeader_"+layerId+"'>");
        layerInnerHtml.push("</div>");
        layerInnerHtml.push("<div class='contentDiv' style='display:"+mainDivDispStyle+";' id='main_content_div_"+layerId+"' name='main_content_div_"+layerId+"' >");
        layerInnerHtml.push("</div>");
        
        if(layerParams.loadingImg){   
            layerInnerHtml.push("<div class='contentDiv' style='display:"+loadDispStyle+"; margin:auto; width:"+layerParams.width+"; height:"+layerParams.height+";' id='load_msg_div_"+layerId+"' align='center' name='load_msg_div_"+layerId+"' >");
            layerInnerHtml.push("<table width="+layerParams.width+" height="+layerParams.height+" id='load_msg_table_"+layerId+"' align='center' name='load_msg_table_"+layerId+"' >");
            layerInnerHtml.push("<tr>");
            layerInnerHtml.push("<td align='center' valign='middle'><div id='optLoadMsg"+layerId+"' name='optLoadMsg"+layerId+"'>loading...<br><br><img src='" + layerParams.loadingImg + "'></div></td>");
            layerInnerHtml.push("</tr>");
            layerInnerHtml.push("</table>");
            layerInnerHtml.push("</div>");
        }
        
        layerInnerHtml.push("</td>");
        layerInnerHtml.push("<td width='40px' align='right' class='w-square-greyshadow-right'>");
        layerInnerHtml.push("</td>");
        layerInnerHtml.push("</tr>");
        layerInnerHtml.push("<tr align='left' valign='top'>");
        layerInnerHtml.push("<td width='40px' height='40px' class='w-square-greyshadow-bottomleft'>");
        layerInnerHtml.push("</td>");
        layerInnerHtml.push("<td class='w-square-greyshadow-bottom' height='40px'></td>");
        layerInnerHtml.push("<td width='40px' class='w-square-greyshadow-bottomright'>");
        layerInnerHtml.push("</td>");
        layerInnerHtml.push("</tr>");
        layerInnerHtml.push("</table>");
        layerInnerHtml.push("</div>");
        layerInnerHtml.push("</div>");  
    }else{
	    layerInnerHtml.push("<div style='display:none;z-index:"+layerParams.zIndexValue+";position:absolute;width:"+layerParams.width+";height:"+layerParams.height+";top:"+layerParams.top+";left:"+layerParams.left+";' id='"+layerId+"' name='"+layerId+"'>");
	    layerInnerHtml.push("<table align='center' border='0' cellspacing='0' cellpadding='0'>");
	    layerInnerHtml.push("<tr align='left' valign='top'>");
	    layerInnerHtml.push("<td width='35px' height='35' class='w-shadow-topleft'></td>");
	    layerInnerHtml.push("<td class='w-shadow-top-popup' height='35px'></td>");
	    layerInnerHtml.push("<td width='35px' height='35' class='w-shadow-topright' onclick='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")'>");
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("<tr align='right' valign='top'>");
	    layerInnerHtml.push("<td width='35px' class='w-shadow-left'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='35px' />");
	    } else {
	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='35px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("<td bgcolor='#ffffff'>");
	    layerInnerHtml.push("<div id='movHeader_"+layerId+"' name='movHeader_"+layerId+"'>");
	    //layerInnerHtml.push("<span id='layerTitle_"+layerId+"' name='layerTitle_"+layerId+"'>"+layerParams.layerTitle+"</span>");
	    //layerInnerHtml.push("<a href='javascript:CLayer.closeLayer("+'\"'+layerId+'\",'+layerParams.closeCallBack+")' style='text-decoration:none;' title=\" close \">X</a>");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("<div class='contentDiv' style='display:"+mainDivDispStyle+";' id='main_content_div_"+layerId+"' name='main_content_div_"+layerId+"' >");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("<div class='contentDiv' style='display:"+loadDispStyle+"; margin:auto; width:"+layerParams.width+"; height:"+layerParams.height+";' id='load_msg_div_"+layerId+"' align='center' name='load_msg_div_"+layerId+"' >");
	    layerInnerHtml.push("<table width="+layerParams.width+" height="+layerParams.height+" id='load_msg_table_"+layerId+"' align='center' name='load_msg_table_"+layerId+"' >");
	    layerInnerHtml.push("<tr>");
	    layerInnerHtml.push("<td align='center' valign='middle'><div id='optLoadMsg"+layerId+"' name='optLoadMsg"+layerId+"'>loading...<br><br><img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/walgreens/upload/loading-Please-wait.gif'></div></td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("</table>");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("<td width='35px' align='right' class='w-shadow-right'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='6px' />");
	    } else {
	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='6px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("<tr align='left' valign='top'>");
	    layerInnerHtml.push("<td width='35px' height='35' class='w-shadow-bottomleft'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='11px' />");
	    } else {
	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='11px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("<td class='w-shadow-bottom' height='35'></td>");
	    layerInnerHtml.push("<td width='35px' class='w-shadow-bottomright'>");
	    if (layerParams.spacerImgSrc){
	    	layerInnerHtml.push("<img src='"+layerParams.spacerImgSrc+"' width='35px' />");
	    } else {
	    	layerInnerHtml.push("<img src='"+layerParams.scheme+"static.snapfish.com/MD5=ba58a2dd92ab23fa6a7c06b6d8b7a5e2/default/images/spacer.gif' width='35px' />");
	    }
	    layerInnerHtml.push("</td>");
	    layerInnerHtml.push("</tr>");
	    layerInnerHtml.push("</table>");
	    layerInnerHtml.push("</div>");
	    layerInnerHtml.push("</div>");

   
    }

    return layerInnerHtml;

}

function _CLayer_updateLayer(layerId, layerParams)
{	
	if(_CLayer_isElementDefined("ele_iframe_"+layerId, true))
    {
		var iframeId = document.getElementById("ele_iframe_"+layerId);
   		if(layerParams.src != undefined)
		{
			if(layerParams.reload != undefined && layerParams.reload == "true") 
			{
				_CLayer_showLoadMsg(layerId);
				iframeId.src = layerParams.src;				
			}
		}        
        if(layerParams.width != undefined){
            iframeId.style.width = layerParams.width;
        }
        if(layerParams.height != undefined){
            iframeId.style.height = layerParams.height;
        }

    }
    
    if(_CLayer_isElementDefined("load_msg_div_"+layerId, true) && _CLayer_isElementDefined("load_msg_table_"+layerId, true))
    {
        var msgDivLayer = document.getElementById("load_msg_div_"+layerId);
        var msgTableLayer = document.getElementById("load_msg_table_"+layerId);
        if(layerParams.width != undefined)
        {
            msgDivLayer.style.width = layerParams.width;
            msgTableLayer.style.width = layerParams.width;
        }
        if(layerParams.height != undefined)
        {
            msgDivLayer.style.height = layerParams.height;
            msgTableLayer.style.height = layerParams.height;
        }
    }
    
    var mainLayer = document.getElementById(layerId);    
    if(layerParams.position != undefined)
        mainLayer.style.position = layerParams.position;
    if(layerParams.top != undefined)
        mainLayer.style.top = layerParams.top;
    if(layerParams.left != undefined)
        mainLayer.style.left = layerParams.left;
    if(layerParams.width != undefined)
        mainLayer.style.width = layerParams.width;
    if(layerParams.height != undefined)
        mainLayer.style.height = layerParams.height;
        
    setZIndexValue(layerId);

}

function _CLayer_getIFrame(layerId, layerParams)
{
    var iframeEleHtml = new Array();
    if(layerParams.onLoadFunc == undefined)
    	iframeEleHtml.push("<iframe id='ele_iframe_"+layerId+"' onload='_CLayer_hideLoadMsg("+"\""+layerId+"\""+");' name='ele_iframe"+layerId+"' src='"+layerParams.src+"' allowtransparency='no' width='"+layerParams.width+"' height='"+layerParams.height+"' frameborder='0' border='0' marginwidth='0' marginheight='0' scrolling='"+layerParams.scrolling+"'></iframe>");
    else
    	iframeEleHtml.push("<iframe id='ele_iframe_"+layerId+"' onload='_CLayer_hideLoadMsg("+"\""+layerId+"\""+","+  layerParams.onLoadFunc  +");' name='ele_iframe"+layerId+"' src='"+layerParams.src+"' allowtransparency='no' width='"+layerParams.width+"' height='"+layerParams.height+"' frameborder='0' border='0' marginwidth='0' marginheight='0' scrolling='"+layerParams.scrolling+"'></iframe>");
    return iframeEleHtml.join('');
}

function _CLayer_getDiv(layerId, layerParams)
{
    var divEleHtml = new Array();
    divEleHtml.push("<div id='ele_div_"+layerId+"' name='ele_div_"+layerId+"' >");
    if(_CLayer_isElementDefined(layerParams.src, true))
        divEleHtml.push(document.getElementById(layerParams.src).innerHTML);
    divEleHtml.push("</div>");
    document.getElementById(layerParams.src).innerHTML = "";
    return divEleHtml.join('');
}

function _CLayer_setLayerSource(layerId, layerParams)
{
    if(layerParams.type == "iframe")
    {
        if(_CLayer_isElementDefined("ele_iframe_"+layerId, true))
            document.getElementById("ele_iframe_"+layerId).src = layerParams.src;
    }
    else
    {
        if(_CLayer_isElementDefined("ele_div_"+layerId, true))
        document.getElementById("ele_div_"+layerId).innerHTML = document.getElementById(layerParams.src).innerHTML
    }
}

function _CLayer_showLayer(layerId)
{
    if(_CLayer_isElementDefined(layerId, true))
        document.getElementById(layerId).style.display = "block";
	if(_CLayer_isElementDefined("mainDiv_"+layerId, true))
        document.getElementById("mainDiv_"+layerId).style.display = "block";
}

function _CLayer_hideLayer(layerId)
{
	if(document.getElementById("mainDiv_"+layerId)){
        document.getElementById("mainDiv_"+layerId).style.display = "none";
	}	
}

function _CLayer_closeLayer(layerId,callBackHandler)
{	
	if(layerIdParamsMap[layerId] && layerIdParamsMap[layerId].warmStart=="true")
	{
		_CLayer_hideLayer(layerId);
		return true;
	}

	if(document.getElementById("openDropDown1") != null && navigator.userAgent.toLowerCase().indexOf("msie 6.0")!=-1)
        document.getElementById("openDropDown1").style.display = "block";
	var closeLayer = true;
	if(this.size > 1){
    	closeLayer = false;
	}	
	if(document.getElementById("bordersize") != null){
	      document.getElementById("bordersize").style.display = "block";
	  }
	if(layerIdParamsMap[layerId])
	{	
		var layerParams = layerIdParamsMap[layerId];
		if(layerParams.reload == "true" && _CLayer_isElementDefined("ele_iframe_"+layerId, true)){
			document.getElementById("LayerContainerDiv").style.margin = "auto";
    	    document.getElementById("ele_iframe_"+layerId).src = "about:blank";
    	    if(parent.document.getElementById("ele_iframe_"+layerId)!=null){
	    	    parent.document.getElementById("ele_iframe_"+layerId).style.width= layerParams.width;
	    		parent.document.getElementById("ele_iframe_"+layerId).style.height= layerParams.height;
	    		parent.document.getElementById("ele_iframe_"+layerId).style.marginLeft= "auto";
    		}
		}
    }	
	if(document.getElementById(layerId)!=null){
	    document.getElementById(layerId).style.display = "none";
	}
    setZIndexValue(layerId, -1);
    this.size= this.size-1;
	if(closeLayer){
	   if(pageGreyOut == "true")
	    {
	    	pageGreyOut = "false";
	    }
	    _CLayer_greyOut(false);
	}
    if(callBackHandler){
    	callBackHandler();
    }
}

function _CLayer_closeAllLayers()
{
    _CLayer_closeLayers(this.refDivObj);
}

function _CLayer_closeLayers(layerIds)
{
    for(var i=0; i<layerIds.length; i++)
    {
        if(_CLayer_isElementDefined(layerIds[i], true))
            _CLayer_closeLayer(layerIds[i]);
    }
}

function _CLayer_showLoadMsg(layerId)
{
    if(_CLayer_isElementDefined("main_content_div_"+layerId, true))
        document.getElementById("main_content_div_"+layerId).style.display = "none";

    if(_CLayer_isElementDefined("load_msg_div_"+layerId, true))
        document.getElementById("load_msg_div_"+layerId).style.display = "block";

}

function _CLayer_hideLoadMsg(layerId,onLoadFunc)
{
    if(_CLayer_isElementDefined("load_msg_div_"+layerId, true))
        document.getElementById("load_msg_div_"+layerId).style.display = "none";

    if(_CLayer_isElementDefined("main_content_div_"+layerId, true))
        document.getElementById("main_content_div_"+layerId).style.display = "block";	
    if(onLoadFunc != undefined)
    	onLoadFunc();
}

function _CLayer_isElementDefined(layerId, isElement)
{
    if(isElement)
    {
        if(document.getElementById(layerId) != undefined && document.getElementById(layerId) != null)
            return true;
    }
    else
    {
        if(layerId != undefined && layerId != null)
            return true;
    }
    return false;
}

function _CLayer_greyOut(vis, options)
{
	if(this.size > 1){
    	return;
	}
    // Pass true to gray out screen, false to ungray
    // options are optional.  This is a JSON object with the following (optional) properties
    // opacity:0-100         // Lower number = less greyOut higher = more of a blackout
    // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
    // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
    // greyOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
    // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
    // in any order.  Pass only the properties you need to set.

    var options = options || {};
    var zindex = options.zindex || zIndexVal;
    var topDark =  options.topDark || false; //This is to deactivate the top window.
    var refDocument = document;
    if(topDark)
      refDocument = window.top.document ;
    if(!topDark)
    {
     --zindex;
     --zindex;
    }
    var opacity = options.opacity || 50;
    var bgcolor = options.bgcolor || '#000000';
    var pageWidth = refDocument.body.clientWidth +"px";
    var pageHeight = refDocument.body.clientHeight +"px";
    var opaque = (opacity / 100);
    var dark=refDocument.getElementById('darkenScreenObject');
    if(topDark)
		dark=refDocument.getElementById('topDarkenScreenObject');   
	    if(_CLayer_isElementDefined(refDocument.body.scrollWidth, false) && _CLayer_isElementDefined(refDocument.body.scrollHeight, false))
	    {
	     if(refDocument.body.clientHeight < refDocument.body.scrollHeight)
	     {
	       pageWidth = refDocument.body.scrollWidth + "px";
	  	   pageHeight = refDocument.body.scrollHeight + "px";
	  	  }
	    }
	    else if(_CLayer_isElementDefined(refDocument.body.offsetWidth, false) && _CLayer_isElementDefined(refDocument.body.offsetHeight, false))
	    {
	     if(refDocument.body.clientHeight < refDocument.body.offsetHeight)
	      {
	       pageWidth = refDocument.body.offsetWidth + "px";
	  	   pageHeight = refDocument.body.offsetHeight + "px";
	  	  }
	    }
    if (!_CLayer_isElementDefined(dark, false))
    {
        // The dark layer doesn't exist, it's never been created.  So we'll
        // create it here and apply some basic styles.
        // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
        var tnode = refDocument.createElement('div');       // Create the layer.
        tnode.style.position='absolute';                 // Position absolutely
        tnode.style.top='0px';                           // In the top
        tnode.style.left='0px';                          // Left corner of the page
        tnode.style.overflow='hidden';                   // Try to avoid making scroll bars
        tnode.style.display='none';                      // Start out Hidden
        tnode.id='darkenScreenObject';                   // Name it so we can find it later
        tnode.name='darkenScreenObject';
        if(topDark)
        {
         tnode.id='topDarkenScreenObject';                   // Name it so we can find it later
         tnode.name='topDarkenScreenObject';
        }
        var tbody = refDocument.body;
        tbody.appendChild(tnode);                            // Add it to the web page
        dark=refDocument.getElementById('darkenScreenObject');  // Get the object.
        if(topDark)
          dark=refDocument.getElementById('topDarkenScreenObject'); 
    }
    if (vis)
    {
        // Calculate the page width and height
        //set the shader to cover the entire page and make it visible.
        dark.style.opacity=opaque;
        dark.style.MozOpacity=opaque;
        dark.style.filter='alpha(opacity='+opacity+')';
        dark.style.zIndex=zindex;
        dark.style.backgroundColor=bgcolor;
        dark.style.width= pageWidth;
        dark.style.height= pageHeight;
        dark.style.display='block';
    }
    else
    {
        dark.style.zIndex = 0;
        dark.style.width = 0;
        dark.style.height = 0;
        dark.style.display = 'none';
    }
}

function _CLayer_checkGreyOut()
{
    if(pageGreyOut == "true")
    	_CLayer_greyOut(true);
}

if(window.addEventListener)
{
	window.addEventListener('load', _CLayer_checkGreyOut, false);
	window.addEventListener('resize', _CLayer_checkGreyOut, false);
}
else if(window.attachEvent)
{
	window.attachEvent('onload', _CLayer_checkGreyOut);
	window.attachEvent('onresize', _CLayer_checkGreyOut);
}
else if(window.onload && window.onresize)
{
	window.onload = _CLayer_checkGreyOut;
	window.onresize = _CLayer_checkGreyOut;
}


//****************** LAYER CODE END ******************/

//****************** MOVABLE DIV CODE START ******************/

function setMovableDivs(divIds)
{
    var arrDivIds = new Array();
    arrDivIds = divIds;
    for(var i=0; i<arrDivIds.length; i++)
    {
        setMovableDiv(arrDivIds[i]);
    }
}

function setMovableDiv(divId)
{
    document.getElementById(divId).onmousedown=function(event) { divMseDown(event,this,divId);}
}

function divMseDown(event,obj,divId)
{
    setZIndexValue(divId);
    document.onmousemove=function(event){divDrag(event);}
    document.onmouseup=function(event){divMseUp(event);}
    divObj=obj;
    divMse(event);
    divDragX=divMseX-divObj.offsetLeft;
    divDragY=divMseY-divObj.offsetTop;
}

function divMseUp(event)
{
    document.onmousemove = null;
    divDragX = -1;
    divDragY = -1;
}

function divDrag(event)
{
    divMse(event);
    divObj.style.left=(divMseX-divDragX)+'px';
    divObj.style.top=(divMseY-divDragY)+'px';
}

function divMse(event)
{
    if(!event) var event=window.event;
    if (document.all)
    {
        divMseX=event.clientX;
        divMseY=event.clientY;
    }
    else
    {
        divMseX=event.pageX;
        divMseY=event.pageY;
    }
}

function setZIndexValue(divId, indexVal)
{
    if(indexVal == undefined || indexVal == null)
        indexVal = zIndexVal
    if(document.getElementById(divId) != null)
        document.getElementById(divId).style.zIndex = indexVal;
    if(document.getElementById("mainDiv_"+divId) != null)
        document.getElementById("mainDiv_"+divId).style.zIndex = indexVal;

    zIndexVal++;
}

//****************** MOVABLE DIV CODE END ******************/

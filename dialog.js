
/**
 * @class Dialog is a class to show inline popup dialogs
 * @constructor
 */

function Dialog(config)
{
	this.originalSrc = config.src;
	this.config = config;
	this.createDialogElements();
	this.loadConfig(config);
}

Dialog.prototype.createDialogElements = function()
{
	var dialogClass = this.config.dialogClass;
	if (dialogClass == null) dialogClass = 'default-dialog';
	
	//Create the dialog div
	this.dialogDiv = document.createElement('DIV');
	this.dialogDiv.className = 'dialog ' + dialogClass;
	
	
	document.body.appendChild(this.dialogDiv);
	
	this.createHeaderElements();
	this.createBodyElements();
	this.createFooterElements();
}


Dialog.prototype.loadConfig = function(config)
{
	this.setContentElement(config.contentElementId);
	this.setSrc(this.config.src, this.config.deferredLoading);
	this.setWidth(config.width);
	this.setClientHeight(config.clientHeight);
	this.setClientWidth(config.clientWidth);
	this.setTitle(this.config.title);
	
}

Dialog.prototype.setContentElement = function(contentElement)
{	
	if (contentElement == null) return;
		
	if (this.contentElement)
	{
		this.contentElement.parentNode.removeChild(this.contentElement);
	}
	
	
	
	if (typeof contentElement == "string")
	{
		this.contentElement = document.getElementById(contentElement);
		
		if (this.contentElement == null)
		{
			throw 'Unable to create dialog content. The specified "contentElement" ID of "' + contentElement + '" is invalid.';			
		}
	}
	else
	{
		this.contentElement = contentElement;
	}
	
	this.contentElement.style.display = "block";
	
	if (this.buttonsDiv)
	{
		this.bodyDiv.insertBefore(this.contentElement, this.buttonsDiv);
	}
	else
	{
		this.bodyDiv.appendChild(this.contentElement);
	}
}

Dialog.prototype.setWidth = function(width)
{
	if (width != null)
	{
		this.dialogDiv.style.width = width;
	}
}

Dialog.prototype.setClientWidth = function(clientWidth)
{
	if (clientWidth != null)
	{
		if (this.iframe)
		{
			this.iframe.style.width = clientWidth;	
		}
		else if (this.contentElement != null)
		{
			this.contentElement.style.width = clientWidth;
			//Only set the overflow style if the content element is not an iframe
			//this.dialogDiv.style.overflow = "scroll";
			//this.dialogDiv.style.overflowX = "auto";
			
		}
	}
}

Dialog.prototype.setClientHeight = function(clientHeight)
{
	if (clientHeight != null)
	{		
		if (this.iframe)
		{	
			this.iframe.style.height = clientHeight;				
		}
		else if (this.contentElement != null)
		{
			this.contentElement.style.height = clientHeight;		
			//Only set the overflow style if the content element is not an iframe			
			//this.dialogDiv.style.overflow = "scroll";
			//this.dialogDiv.style.overflowY = "auto";				
		}
	}
}

Dialog.prototype.createHeaderElements = function()
{
	var headerDiv = document.createElement('DIV');
	headerDiv.className = "dialog-header";
	this.dialogDiv.appendChild(headerDiv);
	
	var tlDiv = document.createElement('DIV');
	tlDiv.className = 'dialog-tl';
	headerDiv.appendChild(tlDiv);
	
	this.titleSpan = document.createElement('SPAN');
	this.titleSpan.className = 'dialog-title';	
	
	headerDiv.appendChild(this.titleSpan);
	
	var trDiv = document.createElement('DIV');
	trDiv.className = 'dialog-tr';
	headerDiv.appendChild(trDiv);
	
	var closeIconDiv = document.createElement('DIV');
	closeIconDiv.className = 'dialog-close-icon';	
	closeIconDiv.onclick = Dialog.closeIconOnClick;
	closeIconDiv.dialog = this;
	headerDiv.appendChild(closeIconDiv);
}

	
Dialog.prototype.setTitle = function(title)
{	
	this.titleSpan.innerHTML = "";
	if (title != null)
	{
		var titleNode = document.createTextNode(title)
		this.titleSpan.appendChild(titleNode);
	}
}
	
Dialog.prototype.createBodyElements = function()
{
	var bodyDiv = document.createElement('DIV');
	this.bodyDiv = bodyDiv;
	bodyDiv.className = "dialog-body";
	this.dialogDiv.appendChild(bodyDiv);			
	
	this.buttonsDiv =  document.createElement('DIV')
	this.buttonsDiv.className = "dialog-buttons-div";
	this.buttonsDiv.style.display = "none";
	bodyDiv.appendChild(this.buttonsDiv);
}

Dialog.prototype.addButtonElement = function(e)
{
	this.buttonsDiv.appendChild(e);
	e.style.display = "block";
}

Dialog.prototype.getSrc = function()
{
	return this.src;
}

Dialog.prototype.getSrc = function()
{
	return this.src;
}

Dialog.prototype.setSrc = function(src, deferredLoading)
{
	if (src == null) return;
	this.src = src;
	if (deferredLoading != null) this.deferredLoading = deferredLoading;
	if (this.deferredLoading == null) this.deferredLoading = true;
	
	if (this.iframe == null)
	{	
		this.loaded = false;		
		var contentElement = document.createElement('DIV');		
		contentElement.style.width = "100%";
		contentElement.style.textAlign = "center";
		this.iframe = document.createElement('IFRAME');		
		this.iframe.className = 'dialog-iframe';
		this.iframe.src = this.deferredLoading ? "about:blank" : this.src;		
		this.iframe.scrolling = "auto";
		this.iframe.frameBorder = "0";
		this.iframe.allowTransparency = true;		
		this.iframe.style.border = "0px";
		this.iframe.style.width = "100%";		
		contentElement.appendChild(this.iframe);
		this.setContentElement(contentElement);
	}
	
	
		
	if (this.deferredLoading)
	{
		this.loaded = false;		
	}
	else
	{		
		this.iframe.src = src;
	}
}

Dialog.prototype.addButtonElement = function(button)
{
	this.buttonsDiv.style.display = "block";
	button.dialog = this;
	this.buttonsDiv.appendChild(button);
}

Dialog.prototype.addOkButton = function(label)
{
	this.addButton( { "label" : label, "action" : "ok" } );
}

Dialog.prototype.addCancelButton = function(label)
{
	this.addButton( { "label" : label, "action" : "cancel" } );
}

Dialog.prototype.addCloseButton = function(label)
{
	this.addButton( { "label" : label, "action" : "close" } );
}

Dialog.prototype.addButton = function(config)
{
	var button = null;	
	if (config.buttonElement != null)
	{
		if (typeof config.buttonElement == "string")
		{
			button = document.getElementById(config.buttonElement);
			throw "buttonElement not found with id of '" + config.buttonElement + "'";			
		}
		else
		{
			button = config.buttonElement;
		}		
	}
	else
	{
		button = document.createElement("BUTTON");
		try { button.type = 'button' } catch(e) {};
		if (config.label)
		{
			button.appendChild(document.createTextNode(config.label));
		}
	}
	
	this.addButtonElement(button);
	
	if (config.action)
	{
		switch(config.action.toLowerCase())
		{
			case "close":
				button.className = Dialog.addClass(button.className, "dialog-close-button");
				button.onclick = Dialog.closeButtonOnClick;
				break;
			case "cancel":
				button.className = Dialog.addClass(button.className, "dialog-cancel-button");
				button.onclick = Dialog.cancelButtonOnClick;
				break;
			case "ok":
				button.className = Dialog.addClass(button.className, "dialog-ok-button");
				button.onclick = Dialog.okButtonOnClick;
				break;
		}
	}
	else if (config.handler)
	{
		button.onclick = config.handler;
	}
	this.addButtonElement(button);
}



Dialog.addClass = function(existingClassString, classToAdd)
{
	if (existingClassString == null || existingClassString == '') return classToAdd;
	else return existingClassString + " " + classToAdd;
}

Dialog.okButtonOnClick = function()
{
	var dialog = this.dialog;
	if (dialog.onOk != null)
	{
		var result = dialog.onOk(dialog);
		if (result == false)
		{
			return;
		}
	}
	dialog.hide();
}

Dialog.cancelButtonOnClick = function()
{
	var dialog = this.dialog;
	dialog.hide();
}

Dialog.closeButtonOnClick = function()
{
	var dialog = this.dialog;
	dialog.hide();
}

Dialog.prototype.createFooterElements = function()
{
	var footerDiv = document.createElement('DIV');
	footerDiv.className = "dialog-footer";
	this.dialogDiv.appendChild(footerDiv);	
	
	var blDiv = document.createElement('DIV');
	blDiv.className = 'dialog-bl';
	footerDiv.appendChild(blDiv);
	
	var brDiv = document.createElement('DIV');
	brDiv.className = 'dialog-br';
	footerDiv.appendChild(brDiv);	
}

Dialog.closeIconOnClick = function()
{
	this.dialog.hide();
}

Dialog.prototype.hide = function()
{
	if (this.onBeforeHide != null)
	{
		var result = this.onBeforeHide(this);
		if (result == false) return;
	}
	
	Dialog.showSelects(true);
	this.dialogDiv.style.display = "none";
	
	if (this.onAfterHide != null)
	{
		this.onAfterHide(this);		
	}
}

Dialog.prototype.center = function()
{
	var viewport = Dialog.getViewport();
	
	var x = (viewport.width - this.dialogDiv.offsetWidth) / 2 + viewport.x;
	var y = (viewport.height - this.dialogDiv.offsetHeight) / 2 + viewport.y;
	if (x < 0) x = 0;
	if (y < 0) y = 0;	
	this.dialogDiv.style.left = x + "px";
	this.dialogDiv.style.top = y + "px";
}

Dialog.prototype.getIFrameDocument = function()
{
	if (this.iframe == null) return null;
	else
	{
		var oDoc = (this.iframe.contentWindow || this.iframe.contentDocument);
        if (oDoc.document) oDoc = oDoc.document;
        return oDoc;
	}
}

Dialog.prototype.getIFrameWindow = function()
{
    if (this.iframe == null) return null;
    else
    {
        var iframeWindow = (this.iframe.contentWindow || this.iframe.contentDocument);        
        if(iframeWindow.parentWindow) iframeWindow = iframeWindow.parentWindow;
        return iframeWindow;
    }
}

Dialog.prototype.show = function(reloadSrc, src)
{	
	if (src != null)
	{
		this.setSrc(src);
	}
	
	if (this.onBeforeShow != null)
	{
		this.onBeforeShow(this);
	}
	
	if (Dialog.visibleDialog) Dialog.visibleDialog.hide();
	
	Dialog.showSelects(false);
		
	if (reloadSrc || (this.deferredLoading && !this.loaded))
	{		
		if (this.iframe)
		{
			try
			{				
				if (this.iframe.src && this.iframe.src != "about:blank")
				{					
					var oDoc = (this.iframe.contentWindow || this.iframe.contentDocument);
					if (oDoc.document) oDoc = oDoc.document;
					oDoc.body.innerHTML = "Loading...";
								
					//window.frames[this.iframe.name].document.body.innerHTML = "Loading...";
				}
			}
			catch(e) {}
			this.iframe.src = this.src;			
			this.loaded = true;
		}		
	}
	
	this.dialogDiv.style.top = "0px";
	this.dialogDiv.style.left = "0px";
	this.dialogDiv.style.visibility = "hidden";	
	this.dialogDiv.style.display = "block";	
	
	this.center();

	this.dialogDiv.style.visibility = "visible";	
	
	Dialog.visibleDialog = this;
	
	if (this.onAfterShow != null)
	{
		this.onAfterShow(this);
	}
}

Dialog.previousOnResize = window.onresize;
Dialog.previousOnScroll = window.onscroll;
Dialog.previousOnResized = false;
Dialog.previousOnScrolled = false;

window.onresize = function(e)
{
	if (e == null) e = window.event;
	if (Dialog.visibleDialog) Dialog.visibleDialog.center();
	if (Dialog.previousOnResize != null && typeof Dialog.previousOnResize == "function"
        && !Dialog.previousOnResized) {
        Dialog.previousOnResized = true;
		Dialog.previousOnResize(e);
	}
}

window.onscroll = function(e)
{		
	if (e == null) e = window.event;	
	if (Dialog.visibleDialog) 
	{
		var viewport = Dialog.getViewport();
		if (Dialog.visibleDialog.dialogDiv.offsetHeight < viewport.height &&
			Dialog.visibleDialog.dialogDiv.offsetWidth < viewport.width)
		{ 
			Dialog.visibleDialog.center();
		}
	}
	
	if (Dialog.previousOnScroll != null && typeof Dialog.previousOnScroll == "function"
        && !Dialog.previousOnScrolled) {
        Dialog.previousOnScrolled = true;
	    Dialog.previousOnScroll(e);
	}
}
	
Dialog.getViewport = function()
{
	var viewport = {x:0,y:0,width:0,height:0};

	if (window.scrollX)
	{		
		viewport.x = window.pageXOffset;
		viewport.y = window.pageYOffset;
		viewport.width = window.innerWidth;
		viewport.height = window.innerHeight;
		return viewport;
	}
	else
	{		
		if (document.documentElement &&
			(document.documentElement.scrollLeft) &&
			(document.documentElement.scrollLeft != 0))
		{
			viewport.x = document.documentElement.scrollLeft;
			viewport.y = document.documentElement.scrollTop;
			viewport.width = document.documentElement.clientWidth;
			viewport.height = document.documentElement.clientHeight;
			return viewport;
		}
		else		
		{			
			if (document.body && document.body.scrollLeft != null)
			{
				viewport.x = document.body.scrollLeft;
				viewport.y = document.body.scrollTop;
			
				if (document.compatMode == "CSS1Compat")
				{
					viewport.width = document.body.parentNode.clientWidth;
					viewport.height = document.body.parentNode.clientHeight;
				}
				else
				{
					viewport.width = document.body.clientWidth;
					viewport.height = document.body.clientHeight;
				}
			
				return viewport;
			}
		}
	}	
	return null;
}

Dialog.showSelects = function(bVisible) {	
	// only IE actually do something in here
	var selects;
	if (document.body.runtimeStyle && (navigator.userAgent.lastIndexOf("MSIE 7.0") == -1))
	{
		selects = document.all.tags("SELECT");
		
		var l = selects.length;
		for	(var i = 0; i < l; i++)
		{
			var alwaysVisible = selects[i].getAttribute('alwaysvisible');			
			if (alwaysVisible != 'true')
				selects[i].runtimeStyle.visibility = bVisible ? "" : "hidden";	
		}
	}
}

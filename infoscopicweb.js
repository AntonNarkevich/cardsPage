
function InfoscopicWeb()
{
	
}

InfoscopicWeb.onLoadHandlers= new Array();

InfoscopicWeb.onLoadHandlerAdded = false;

InfoscopicWeb.previousOnLoad = window.onload;

InfoscopicWeb.addOnLoadHandler = function(f)
{
    if (InfoscopicWeb.pageLoaded)
    {
        f();
        return;
    }
    else
    {
        if (InfoscopicWeb.onLoadHandlerAdded == false)
        {
            InfoscopicWeb.onLoadHandlerAdded = true;
        }
        InfoscopicWeb.onLoadHandlers.push(f);   
    }
}

InfoscopicWeb.pageLoaded = false;
InfoscopicWeb.previousOnLoaded = false;

InfoscopicWeb.onLoadHandler = function()
{
    InfoscopicWeb.pageLoaded = true;
    
    for (var i=0; i<InfoscopicWeb.onLoadHandlers.length; i++)
    {
        InfoscopicWeb.onLoadHandlers[i]();
    }
    
    if (InfoscopicWeb.previousOnLoad != null && typeof InfoscopicWeb.previousOnLoad == "function"
		&& !InfoscopicWeb.previousOnLoaded)
    {
        InfoscopicWeb.previousOnLoaded = true;
        InfoscopicWeb.previousOnLoad();
    }
    
    
}

if (window.onload != InfoscopicWeb.onLoadHandler)
{
    window.onload = InfoscopicWeb.onLoadHandler;
}

InfoscopicWeb.namespace = function(namespace)
{   
    var tokens = namespace.split('.');
    var parent = window;
    for (var i=0; i<tokens.length; i++)
    {
        var token = tokens[i];
        if (parent[token] == null)
        {
            parent[token] = new Object();           
        }
        parent = parent[token];     
    }
}
InfoscopicWeb.uniqueId = 0;

InfoscopicWeb.getUniqueId = function(prefix)
{
	InfoscopicWeb.uniqueId++;
	return prefix ? prefix + InfoscopicWeb.uniqueId : InfoscopicWeb.uniqueId;
}

InfoscopicWeb.parseJSON = function(str)
{
	return eval('(' + str + ')');
}

function Component()
{
}

Component.components = new Array();

/* Deprecated - Use Component.registerComponent instead */
Component.addComponent = function(cid, component)
{	
	Component.registerComponent(cid, component);
}

Component.registerComponent = function(cid, component)
{	
	if (cid == null) return;
	
	Component.components[cid] = component;
}

Component.getComponent = function(cid)
{
	return Component.components[cid];
}

Component.get = function(cid)
{
    return Component.components[cid];
}

/**
 * Deprecated
 */
Component.addOnLoadHandler = function(f)
{
	InfoscopicWeb.addOnLoadHandler(f);
}

/**
 * Deprecated
 */
Component.namespace = function(namespace)
{	
    InfoscopicWeb.namespace(namespace);
}



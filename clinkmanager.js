//Note: this object uses Vector, and Hashtable objects so to use this object we must include following js files
// /default/javascript/core/JavaUtil.js
var CLinkManager = new _CLinkManager(null);

_CLinkManager.prototype.getInstance = _CLinkManager_getInstance;
_CLinkManager.prototype.getHost = _CLinkManager_getHost;
_CLinkManager.prototype.getURL = _CLinkManager_getURL;
_CLinkManager.prototype.getURLForHost = _CLinkManager_getURLForHost;
_CLinkManager.prototype.getPNS = _CLinkManager_getPNS;
_CLinkManager.prototype.setPNS = _CLinkManager_setPNS;
_CLinkManager.prototype.setURLParameter = _CLinkManager_setURLParameter;
_CLinkManager.prototype.removeURLParameter = _CLinkManager_removeURLParameter;
_CLinkManager.prototype.removePNSParameter = _CLinkManager_removePNSParameter;
_CLinkManager.prototype.setPNSParameter = _CLinkManager_setPNSParameter;
_CLinkManager.prototype.merge = _CLinkManager_merge;
_CLinkManager.prototype.mergeParamsIntoParamTable = _CLinkManager_mergeParamsIntoParamTable;
_CLinkManager.prototype.getInputParameter = _CLinkManager_getInputParameter;
_CLinkManager.prototype.getPNSParameter = _CLinkManager_getPNSParameter;
_CLinkManager.prototype.createURL = _CLinkManager_createURL;
_CLinkManager.prototype.toString = _CLinkManager_toString;

// Constructor of _CLinkManager object (equivalent to a com.snapfish.core.servlet.CLinkManager java object)
// @param String an url it can be http://www.snapfish.com/getShoeBox/pns/... or /getShoeBox/pns/... or /getShoeBox, ...
function _CLinkManager(pathInfo)
{
    this.m_url = null; //including paramters ex. /getShoebox/param1=value1
    this.m_baseURL = null; //base url ex. /getShoebox
    this.m_pns = null; //including parameters ex /getShoebox/param1=value1
    this.m_pnsBaseURL = null;// base url ex. /getShoebox
    this.m_host = null;
    this.m_inParamTable = null;
    this.m_pnsParamTable = null;
    this.m_pathInfo = null;
    if(pathInfo == null)
    {
        return this;
    }


    var errorMessage = "_CLinkManager() :";
    var isError = false;
    if( typeof(Hashtable) == "undefined"
        || typeof(Vector) == "undefined"
        || typeof(CURLEncoder) == "undefined"
        || typeof(CURLDecoder) == "undefined" )
    {
        errorMessage += "\n  /default/javascript/util/common.js";
        isError = true;
    }
    if( isError )
    {
        alert(errorMessage + "\nfiles are not included");
        return this;
    }
    this.m_pathInfo = pathInfo;
    this.m_inParamTable = Hashtable.getInstance();
    this.m_pnsParamTable = Hashtable.getInstance();
    this.merge(pathInfo);

    if( this.m_url != null )
    {
        this.mergeParamsIntoParamTable( this.m_inParamTable, this.m_url );
    }
    if( this.m_pns != null )
    {
        this.mergeParamsIntoParamTable( this.m_pnsParamTable, this.m_pns );
    }
    return this;
}

function _CLinkManager_getInstance(pathInfo)
{
    if( pathInfo == null )
    {
        alert("CLinkManager._getInstance() : Paramater is null \n" + "Can not create an object" );
    }
    else
    {
        return new _CLinkManager(pathInfo);
    }
}

function _CLinkManager_getURL()
{
    if(this.m_pathInfo == null)
    {
        return null;
    }
    //moving timestamp to end of the url
    var timeStamp = this.m_inParamTable.get("t_");
    if( timeStamp !=  null )
    {
        this.m_inParamTable.put("t_", timeStamp);
    }

    var url = this.createURL(this.m_baseURL, this.m_inParamTable );
    if( url == null ) //if no url is defined then return host
    {
        return this.getHost();
    }
    if( this.getPNS() != null ) //append pns
    {
        url = url + "/pns" + this.getPNS();
    }
    if( this.getHost() ) //if host is defined then append url to the host name
    {
        return this.getHost() + url;
    }
    return url;
}

function _CLinkManager_getURLForHost(targetHost)
{
    if(this.m_pathInfo == null)
    {
        return null;
    }
    //moving timestamp to end of the url
    var timeStamp = this.m_inParamTable.get("t_");
    if( timeStamp !=  null )
    {
        this.m_inParamTable.put("t_", timeStamp);
    }

    var url = this.createURL(this.m_baseURL, this.m_inParamTable );
    if( url == null ) //if no url is defined then return host
    {
        return this.getHost();
    }
    if( this.getPNS() != null ) //append pns
    {
        url = url + "/pns" + this.getPNS();
    }
    if(targetHost != null )
    {
        return targetHost + url;
    }
    if( this.getHost() ) //if host is defined then append url to the host name
    {
        return this.getHost() + url;
    }
    return url;
}


function _CLinkManager_getPNS()
{
    return this.createURL(this.m_pnsBaseURL, this.m_pnsParamTable);
}

function _CLinkManager_getHost()
{
    return this.m_host;
}

function _CLinkManager_setPNS(pnsURL)
{	
    if(pnsURL == null)
    {
        return;
    }
    var host = getHost( pnsURL );
    var index1 = -1;
    var index2 = -1;

    if( host != null ) //Get the url without host (ex. /getShoebox/p1=v1/)
    {
        this.m_pns = pnsURL.substring(host.length);
    }
    else
    {
        this.m_pns = pnsURL;
    }

    if( this.m_pns != null ) //Get the base url (ex. /getShoebox)
    {
        index1 = 0;
        index2 = this.m_pns.indexOf("/", 1 );
        //below condition added to fix WG0015173
        if( index2 != -1 && this.m_pns.indexOf("/fe/")==-1)
        {
        	index2 = this.m_pns.indexOf("/", index2+1);
        	if(index2 !=-1){
                this.m_pnsBaseURL = this.m_pns.substring(index1, index2 );
        	}else{
                this.m_pnsBaseURL = this.m_pns;        		
        	}
        }
        else // this else will be removed later.
        {
            this.m_pnsBaseURL = this.m_pns;
        }
        //remove all old parameters from pns param table
        this.m_pnsParamTable = Hashtable.getInstance();
        if(this.m_pns.indexOf("/fe/")==-1)
        {
            this.mergeParamsIntoParamTable(this.m_pnsParamTable, this.m_pns);
        }
    }
}

function _CLinkManager_setURLParameter(name, value)
{
    if(this.m_pathInfo == null)
    {
        alert("Object creation was not successfull");
        return;
    }
    _CLinkManager_addParameter(name, value, this.m_inParamTable);
}

function _CLinkManager_removeURLParameter(name)
{
    if(this.m_pathInfo == null)
    {
        alert("Object creation was not successfull");
        return;
    }
    this.m_inParamTable.remove(CURLEncoder.encode(name));
}

function _CLinkManager_setPNSParameter(name, value)
{
    if(this.m_pathInfo == null)
    {
        alert("Object creation was not successfull");
        return;
    }
    _CLinkManager_addParameter(name, value, this.m_pnsParamTable);
}

function _CLinkManager_removePNSParameter(name)
{
    if(this.m_pathInfo == null)
    {
        alert("Object creation was not successfull");
        return ;
    }
    this.m_pnsParamTable.remove(CURLEncoder.encode(name));
}

function _CLinkManager_merge(pathInfo)
{
    if( pathInfo == null )
    {
        return;
    }
    var index1 = -1;
    var index2 = -1;
    this.m_host = getHost(pathInfo); //get the host name (ex. http://www.snapfish.com
    index2 = pathInfo.indexOf("/pns");

    if( this.m_host != null ) //Get the url without host (ex. /getShoebox/p1=v1/pns/shoeboxgifts/p2=v2)
    {
        index1 = this.m_host.length;
        if( index2 == -1 )
        {
            this.m_url = pathInfo.substring(index1);
        }
        else
        {
            this.m_url = pathInfo.substring(index1, index2);
        }
    }
    else
    {
        if(index2 == -1)
        {
            this.m_url = pathInfo;
        }
        else
        {
            this.m_url = pathInfo.substring(0, index2);
        }
    }
    if( this.m_url != null ) //Get the base url (ex. /getShoebox)
    {
        index1 = 0;
        index2 = this.m_url.indexOf("/", 1 );
        if( index2 != -1 )
        {
        	index2 = this.m_url.indexOf("/", index2+1 );
        	if(index2 != -1 ){
        		this.m_baseURL = this.m_url.substring(index1, index2);
        	}else{
                this.m_baseURL = this.m_url;        		
        	}
        }// this else is not required.
        else
        {
            this.m_baseURL = this.m_url;
        }
    }

    var index = pathInfo.indexOf("/pns"); //Get the pns url (ex. /shoeboxgifts/p2=v2
    if( index != -1 )
    {
        this.m_pns = pathInfo.substring(index + "/pns".length);
    }

    if( this.m_pns != null ) //Get the pns base url ( ex. /shoeboxsgifts )
    {
        index1 = 0;
        index2 = this.m_pns.indexOf("/", 1);
        if( index2 != -1 )
        {
            index2 = this.m_pns.indexOf("/", index2+1);
            if(index2 != -1){
            this.m_pnsBaseURL = this.m_pns.substring(index1, index2);
            }else{
                this.m_pnsBaseURL = this.m_pns;            	
            }
        }
        else // this else is not required.
        {
            this.m_pnsBaseURL = this.m_pns;
        }
    }
}

function _CLinkManager_mergeParamsIntoParamTable(inParamTable, url)
{
    if( url == null || inParamTable == null )
    {
        return;
    }

    var st = url.split("/");
    var length = st.length;
    for(var i=1, j=0; i<length ; i++)
    {
        var nvp = st[i];
        var idx = nvp.indexOf("=");
        var slen = nvp.length;
        if( (idx > 0) && (idx < slen) )
        {
            var n = nvp.substring(0, idx); // Quietly ignore problematic formats
            var v = nvp.substring(idx+1, slen);
            inParamTable.put(n, v);
        }
    }
}

function _CLinkManager_getInputParameter(key)
{
    if( this.m_inParamTable == null )
    {
        return null;
    }
    key = CURLEncoder.encode( key ); //key was encoded before it was inserted into table
    return CURLDecoder.decode( this.m_inParamTable.get( key ) );
}

function _CLinkManager_getPNSParameter(key)
{
    if( this.m_pnsParamTable == null )
    {
        return null;
    }

    key = CURLEncoder.encode( key ); //key was encoded before it was inserted into table
    return CURLDecoder.decode(this.m_pnsParamTable.get(key));
}

// This function creates the url and appends the parametes to it.
// @param  Hashtable paramter table
// @return String  a url with parameters (ex : /shoeboxgifts/AlbumID=xxx)
function _CLinkManager_createURL(url, parameterTable)
{

    if( url == null )
    {
        return null;
    }
    if( parameterTable == null )
    {
        return url;
    }

    var parameterURL = "";
    var name, value;
	var str = "" ;
    for(var e=parameterTable.keys(); e.hasMoreElements(); )
    {
        name = e.nextElement();
        value = parameterTable.get(name);

		// This fix is to move the parameter starting with "?" to the last otherwise the others 
		// parameter are not being recongised properly
		//Eg: http://www.sfus1.qa.snapfish.com/XXX/?XYZ=abc/UVW=def
		//	 http://www.sfus1.qa.snapfish.com/XXX/UVW=def /?XYZ=abc

		if ( startsWith(name , "?") ) {
			str = "/"+ name + "=" + value;
		} else {
        parameterURL += "/" + name + "=" + value;
        }
    }

	if ( str == null || str == "")
    return url + parameterURL + "/"; // adding "/" to avoid HTTP 404s in few cases.
	 else 
	    return url + parameterURL + str;	 	   
}

function _CLinkManager_toString()
{
    if(this.m_pathInfo == null)
    {
        return null;
    }

    var str = "m_url = " + this.m_url + "\n"
            + "m_baseURL = " + this.m_baseURL + "\n"
            + "m_pns = " + this.m_pns + "\n"
            + "m_pnsBaseURL = " + this.m_pnsBaseURL + "\n"
            + "host = " + this.m_host + "\n" ;
    str += "urlParams = {";

    for(var e=this.m_inParamTable.keys(); e.hasMoreElements(); )
    {
        var key = e.nextElement();
        str += key + "=" + this.m_inParamTable.get(key);
        if( e.hasMoreElements() )
        {
            str += ", ";
        }
    }
    str += "}\n";
    str += "pnsParams = {";
    for(var e=this.m_pnsParamTable.keys(); e.hasMoreElements(); )
    {
        var key = e.nextElement();
        str += key + "=" + this.m_pnsParamTable.get( key );
        if( e.hasMoreElements() )
        {
            str += ", ";
        }
    }
    str += "}\n";
    return str;
}

function _CLinkManager_addParameter(name, value, paramTable)
{
    if( name == null && value == null )
    {
        alert( "Parameter name and values are null" );
        return;
    }
    if( name == null )
    {
        alert( "Parameter Name is null" );
        return;
    }
    if( value == null )
    {
        alert( "Parameter value is null" );
        return;
    }
    name = CURLEncoder.encode(name.toString());
    value = CURLEncoder.encode(value.toString());
    paramTable.put(name, value);
}

function startsWith(m_value, key)
{
    if( m_value != null && key != null )
    {
        if( m_value.indexOf(key) == 0 )
        {
            return true;
        }
    }
    return false;
}

// This function is used internally to get the host name out of given pathinfo, this is equivalent to static method in java
// @param String path info (ex. http://www.snapfish.com/getShoebox/p1=v1...
// @return String returns host part of the url
//                returns null if there is no host in the url.
function getHost(pathInfo)
{
    if( pathInfo == null )
    {
        return null;
    }
    var index1 = -1;
    var index2 = -1;
    if( startsWith(pathInfo, "https://") )
    {
        var index = pathInfo.indexOf("/", 8)
        if( index != -1 )
        {
            return pathInfo.substring(0, index);
        }
    }
    else if( startsWith(pathInfo, "http://") )
    {
        var index = pathInfo.indexOf("/", 7);
        if( index != -1 )
        {
            return pathInfo.substring(0, index);
        }
    }
    return null;
}

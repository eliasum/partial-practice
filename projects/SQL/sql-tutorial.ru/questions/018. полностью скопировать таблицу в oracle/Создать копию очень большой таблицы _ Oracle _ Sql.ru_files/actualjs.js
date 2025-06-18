function getHTTPObject() {
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}


//namespace
var ScriptLoader = {}; 

//scripts object storing the state and callbacks of scripts
ScriptLoader.scripts = {}; 

//Handle multiple script callbacks to one single script
ScriptLoader.onScriptLoad = function(url) {
	var script = this.scripts[url];
	script.loaded = true;
	for (var i = 0, len = script.callbacks.length; i < len; i++)
	{
		var callback = script.callbacks[i];
		if (typeof callback != 'undefined') callback();
	}
};

//Main loader function
ScriptLoader.load = function(url, callback) {

	//Check if script has already been added to the loader
	if (this.scripts[url] != undefined)
	{
		if (this.scripts[url].loaded) //File loaded
		{
			//Run callback straight away
			if (typeof callback != 'undefined') callback();
		}
		else //Still loading
		{
			//Add callback to list for running later
			this.scripts[url].callbacks.push(callback);
		}

		//Script already requested so exit here
		return;
	}

	//Create tracker for this script to monitor status and build a list of callbacks
	this.scripts[url] = {loaded: false, callbacks: [callback]};

	//Add script element to DOM and add onload handlers for callbacks
	var script = document.createElement("script")
	script.type = "text/javascript";

	if (script.readyState) //IE
	{
		script.onreadystatechange = function()
		{
            if (script.readyState == "loaded" ||
                    script.readyState == "complete")
			{
                script.onreadystatechange = null;

				ScriptLoader.onScriptLoad(url);
			}
        };
    }
   else //Other browsers
   {
	    script.onload = function(event)
	    {
			ScriptLoader.onScriptLoad(url);
	   };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
};

function getParameter(pn, s) {
    if (!pn) { return ''; }
    if (pn == "tid") {
        var tid = RegExp('(\[0-9]+?)[-/]', 'i').exec(s || document.location.href)[1];
        if (tid) return tid;
    }
    if (pn == "pg") {
        var pg = RegExp('(?:/[0-9]+?-)([0-9]+?)/', 'i').exec(s || document.location.href);
	if (pg && pg.length>0) return pg[1];
    }

    return (RegExp('[?&]' + pn + '=(.*?)(&|#|$)', 'i').exec(s || document.location.href) || [1, ''])[1];
}

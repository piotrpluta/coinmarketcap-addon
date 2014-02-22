var tabs = require("sdk/tabs");
var self = require("sdk/self");
var ss = require("sdk/simple-storage");
var pageMod = require("sdk/page-mod"); 
  
pageMod.PageMod({
  	include: "*.coinmarketcap.com",  
  	contentScriptFile: [self.data.url("jquery.js"), self.data.url("coinmarketcap_content.js")],
  	onAttach: function(worker) {
			worker.port.on('simple-storage', function(newData) {
  			ss.storage.toShow = newData;
		});
	
    	if (!ss.storage.toShow)
  			ss.storage.toShow = [];	
	
		worker.port.emit("run", ss.storage.toShow);
	
	}
 });
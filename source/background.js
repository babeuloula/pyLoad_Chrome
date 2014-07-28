/*******************************************
 * Initialisation des variables principales
 *******************************************/
var packageName = new Array();
var packageID   = new Array();
var parent      = '';
var parentPkg   = '';
var pseudo      = '';
var passwd      = '';
var sessid      = '';
var ip          = '';
var port        = '';
var api_url     = '';
var connected   = false;
var app_id		= chrome.runtime.id;



/**********************************************
 * Récupération des infos dans le localstorage
 **********************************************/
chrome.storage.local.get(function(result){
	pseudo  = result.pyload_pseudo;
	passwd  = result.pyload_passwd;
	sessid  = result.pyload_sessid;
	ip      = result.pyload_ip;
	port    = result.pyload_port;
	api_url = result.pyload_api;
});



/***********************************************************
 * Ecoute pour savoir si on doit recréer le menu contextuel
 ***********************************************************/
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.message) {
		case 'updateContextMenu':
			init();
			break;

		default:
			sendResponse({});
			break;
	}
});



/******************************************************
 * Toutes les secondes j'acutalise les téléchargements
 ******************************************************/
setInterval(function(){
	if(check()) {
		chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 0]});
	    chrome.browserAction.setBadgeText({text:__getQueue().length.toString()});
	}
},1000);
/***************************************************
 * Envoi la demande de recréation du menu contexuel
 ***************************************************/
document.addEventListener("mousedown", function(event){
	if (event.button !== 2) {
        return false;
    }

    if(event.button == 2) {
        var selection = window.getSelection();
        var links = new Array();
        if(selection.type == 'Range') {
            var html = getHTMLOfSelection();
            $(html).find('a').each(function() {
                links.push($(this).attr('href'));
            });
            chrome.storage.local.set({'pyload_parse_links': links});
        }

        chrome.extension.sendMessage({
            'message': 'updateContextMenu'
        });
    }
}, true);
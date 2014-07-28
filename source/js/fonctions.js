/************************************
 * Fonction qui initialise le plugin
 ************************************/
function init() {
    if(check()) {
        getPackages();
        setContextMenu();
    } else {
        chrome.contextMenus.removeAll();

        chrome.contextMenus.create({
            "title": "Configurer l'extention PyLoad",
            "contexts": ["page", "link", "selection"],
            "onclick": OpenPyloadOptions
        });        
    }
}



/*************************************************
 * Fonction check si les variables sont attribués
 *************************************************/
function check() {
    if(pseudo == null || passwd == null || ip == null || port == null) {
        return false;
    } else {
        return true;
    }
}



/*************************************
 * Fonction qui récupère les packages
 *************************************/
function getPackages() {
    packageName.length = 0;
    packageID.length = 0;

    var packagesQueue = __getQueue();

    for(var p = 0; p < packagesQueue.length; p++) {
        packageName.push(packagesQueue[p].name);
        packageID.push(packagesQueue[p].pid.toString());
    }
}



/***************************************
 * Fonction qui crée le menu contextuel
 ***************************************/
function setContextMenu() {
    // Retire tous les menus déjà présent
    chrome.contextMenus.removeAll();

    parent = chrome.contextMenus.create({"title": "pyLoad Chrome", "contexts": ["page", "link", "selection"]});

    /***************************
     * Créer un nouveau package
     ***************************/
    chrome.contextMenus.create({
        "title": "Ouvrir pyLoad",
        "id": "open PyLoad",
        "contexts":  ["page", "link", "selection"],
        "parentId": parent,
        "onclick": OpenPyload
    });

    chrome.contextMenus.create({"type":"separator","contexts":["link", "selection"],"parentId": parent});

    /***************************************
     * Ajouter le lien à un nouveau package
     ***************************************/
    chrome.contextMenus.create({
        "title": "Ajouter le lien à un nouveau package",
        "id": "link",
        "contexts": ["link"],
        "parentId": parent,
        "onclick": AddNewPackage
    });

    /********************************
     * Parser les liens sélectionnés
     ********************************/
    chrome.contextMenus.create({
        "title": "Parser les liens sélectionnés",
        "id": "selection",
        "contexts": ["selection"],
        "parentId": parent,
        "onclick": AddNewPackage
    });

    if(packageName.length > 0) {
        parentPkg = chrome.contextMenus.create({"title": "Ajouter à un package existant", "contexts": ["link"], "parentId": parent});

        /********************************
         * Ajouter a un package existant
         ********************************/
        for(var j = 0; j < packageName.length; j++) {
            chrome.contextMenus.create({
                "title": packageName[j],
                "id": packageID[j],
                "contexts": ["link"],
                "parentId": parentPkg,
                "onclick": AddToPackage
            });
        }
    }
}



/**************************************
 * Fonction qui crée les notifications
 **************************************/
function setNotif(image, titre, texte) {
    var havePermission = window.webkitNotifications.checkPermission();
    
    // 0: On a les droits
    if (havePermission == 0) {
        var notification = window.webkitNotifications.createNotification(
            image,
            titre,
            texte
        );

        notification.show();

        setTimeout(function(){
            notification.cancel();
        },3000);
    } else {
        alert(texte);
    }
}



/********************************************
 * Fonction qui ajoute à un package existant
 ********************************************/
function AddToPackage(info, tab) {
    if(check()) {
        var package_name = '';
        var package_id   = info.menuItemId;

        for(var i = 0; i < packageID.length; i++) {
            if(packageID[i] == package_id) {
                package_name = packageName[i];
            }
        }

        var links = new Array(info.linkUrl);
        if(__addFiles(package_id, links)) {
            setNotif('images/pyload_128.png', 'PyLoad', 'Le lien a été ajouté au package ' + package_name);
        } else {
            setNotif('images/error.png', 'PyLoad', "Une erreur est survenue lors de l'ajout du lien");
        }
    } else {
        setNotif('images/error.png', 'PyLoad', "Vous devez d'abord configurer l'application");
    }
}



/**************************************
 * Fonction qui cré un nouveau package
 **************************************/
function AddNewPackage(info, tab) {
    if(check()) {
        var package = prompt("Saisissez le nom du nouveau package package :");

        if(package != null && package.length > 0) {
            switch (info.menuItemId) {
                case "link":
                    var links = new Array(info.linkUrl);

                    if(__addPackage($.trim(package), links)) {
                        setNotif('images/pyload_128.png', 'PyLoad', 'Le package ' + package + ' vient d\'être créé et le lien ajouté au package');
                    } else {
                        setNotif('images/error.png', 'PyLoad', "Une erreur est survenue lors de l'ajout du lien");
                    }
                    break;

                case "selection":
                    chrome.storage.local.set({'pyload_parse_package': $.trim(package)});
                    chrome.tabs.create({"url": "chrome-extension://" + app_id + "/parser.html"});
                    break;
            }
        }
    } else {
        setNotif('images/error.png', 'PyLoad', "Vous devez d'abord configurer l'application");
    }
}



/****************************
 * Fonction qui ouvre PyLoad
 ****************************/
function OpenPyload(info, tab) {
    if(check()) {
        chrome.tabs.create({"url": "http://" + ip + ":" + port});
    } else {
        setNotif('images/error.png', 'PyLoad', "Vous devez d'abord configurer l'application");
    }
}



/*******************************************
 * Fonction qui ouvre les options de PyLoad
 *******************************************/
function OpenPyloadOptions(info, tab) {
    chrome.tabs.create({"url": "chrome-extension://" + app_id + "/options.html"});
}



/***************************************************
 * Fonction qui retour le code HTML d'une sélection
 ***************************************************/
function getHTMLOfSelection() {
    var range;

    if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        return range.htmlText;
    } else if (window.getSelection) {
        var selection = window.getSelection();
        
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
            var clonedSelection = range.cloneContents();
            var div = document.createElement('div');
            div.appendChild(clonedSelection);
            return div.innerHTML;
        } else {
            return '';
        }
    } else {
        return '';
    }
}
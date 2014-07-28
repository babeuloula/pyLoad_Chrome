/******************************************
 * Fonction qui se connecte à l'api PyLoad
 ******************************************/
function __connect(username, password) {
	if(check()) {
        /*$.ajax({
            url: api_url + 'login',
            type: 'post',
            data: 'username=' + username + '&password=' + password,
            success: function(response) {
            	console.log('connected');
                return response;
            },
            error: function(response) {
				console.log(response);
                return false;
            }
        });*/
        return '000';
    } else {
    	return false;
    }
}



/**********************************************
 * Fonction qui ajoute un package et des liens
 **********************************************/
function __addPackage(name, links) {
    if(check()) {
        /*$.ajax({
            url: api_url + 'addPackage',
            type: 'post',
            data: 'name=' + name + '&links=' + links,
            success: function(response) {
                console.log('package added');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });*/
        return 123;
    } else {
        return false;
    }
}



/*********************************************
 * Fonction qui ajoute des liens à un package
 *********************************************/
function __addFiles(pid, links) {
    if(check()) {
        /*$.ajax({
            url: api_url + 'addFiles',
            type: 'post',
            data: 'pid=' + parseInt(pid, 10) + '&links=' + links,
            success: function(response) {
                console.log('links added to package');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });*/
        return true;
    } else {
        return false;
    }
}



/****************************************
 * Fonction récup les infos d'un package
 ****************************************/
function __getPackageInfo(pid) {
    if(check()) {
        $.ajax({
            url: api_url + 'getPackageInfo',
            type: 'post',
            data: 'pid=' + parseInt(pid, 10),
            success: function(response) {
                console.log('get package info');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/******************************************
 * Fonction récup les données d'un package
 ******************************************/
function __getPackageData(pid) {
    if(check()) {
        $.ajax({
            url: api_url + 'getPackageData',
            type: 'post',
            data: 'pid=' + parseInt(pid, 10),
            success: function(response) {
                console.log('get package data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/******************************************
 * Fonction récup les données d'un fichier
 ******************************************/
function __getFileData(fid) {
    if(check()) {
        $.ajax({
            url: api_url + 'getFileData',
            type: 'post',
            data: 'fid=' + fid,
            success: function(response) {
                console.log('get file data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/**************************************************
 * Fonction récup la liste des packages en attente
 **************************************************/
function __getQueue() {
    if(check()) {
        /*$.ajax({
            url: api_url + 'getQueue',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });*/
        
        var array = [
            {
                "name": "Films",
                "pid": 1,
                "sizetotal": 734003200,
                "sizedone": 176160768
            },
            {
                "name": "Musiques",
                "pid": 2,
                "sizetotal": 68157440,
                "sizedone": 28626124
            },
            {
                "name": "Séries TV",
                "pid": 3,
                "sizetotal": 367001600,
                "sizedone": 330301440
            }
        ];

        return array;
    } else {
        return false;
    }
}



/******************************************************************
 * Fonction récup la liste des packages et leur données en attente
 ******************************************************************/
function __getQueueData() {
    if(check()) {
        $.ajax({
            url: api_url + 'getQueueData',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/***********************************************
 * Fonction récup le statut des téléchargements
 ***********************************************/
function __statusDownloads() {
    if(check()) {
        $.ajax({
            url: api_url + 'statusDownloads',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/**************************************
 * Fonction récup le statut du serveur
 **************************************/
function __statusServer() {
    if(check()) {
        $.ajax({
            url: api_url + 'statusServer',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}
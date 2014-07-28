$(document).ready(function() {
	/****************************************
	 * S'il manque un cookie je détruis tout
	 * Et demande une reconnexion
	 ****************************************/
	chrome.storage.local.get(function(result){
		if(result.pyload_pseudo == null || result.pyload_passwd == null || result.pyload_ip == null || result.pyload_port == null) {
			chrome.storage.local.clear();

			$(".connexion").show();
			$(".deconnexion").hide();
		} else {
			$("#affichePseudo").html(result.pyload_pseudo);
			$("#serveur").html(result.pyload_ip + ':' + result.pyload_port);

			$(".connexion").hide();
			$(".deconnexion").show();
		}
	});



	/****************************************
	 * Au clic sur le bouton connexion
	 * J'essaye d'accéder à l'API
	 * Puis je stock le session_id de PyLoad
	 ****************************************/
	$("#connexion").click(function(e) {
		e.preventDefault();

		if($.trim($("#pseudo").val()) == '' || $.trim($("#passwd").val()) == '' || $.trim($("#ip").val()) == '' || $.trim($("#port").val()) == '') {
			setNotif('images/error.png', 'PyLoad', 'Vous devez remplir les champs');
		} else {
			var pseudoLS  = $.trim($("#pseudo").val());
			chrome.storage.local.set({'pyload_pseudo': pseudoLS});

	        var passwdLS  = $.trim($("#passwd").val());
	        chrome.storage.local.set({'pyload_passwd': passwdLS});

        	var ipLS      = $.trim($("#ip").val());
        	chrome.storage.local.set({'pyload_ip': ipLS});
	        
        	var portLS    = $.trim($("#port").val());
        	chrome.storage.local.set({'pyload_port': portLS});

	        var api_urlLS = 'http://' + ipLS + ':' + portLS + '/api/';
	        chrome.storage.local.set({'pyload_api': api_urlLS});

	        var sessidLS = __connect(pseudoLS, passwdLS);
	        if(sessidLS) {
	        	chrome.storage.local.set({'pyload_sessid': sessidLS});

	        	$("#pseudo, #passwd").val('');
	        	$("#affichePseudo").html(pseudoLS);
	        	$("#serveur").html(ipLS + ':' + portLS);

				$(".connexion").hide();
				$(".deconnexion").show();

	        	setNotif('images/pyload_128.png', 'PyLoad', "Vous êtes connecté à l'API de PyLoad.");
	        } else {
	        	setNotif('images/error.png', 'PyLoad', "Impossible de se connecter à l'API de PyLoad. Vérifiez les options.");
	        }
		}
	});



	/************************************
	 * Au clic sur le bouton déconnexion
	 * Je détruis tout les localstorage
	 ************************************/
	$("#deconnexion").click(function(e) {
		e.preventDefault();

		chrome.storage.local.clear();

		$(".connexion").show();
		$(".deconnexion").hide();
	});
});
$(document).ready(function() {
	var id_tab = '';

	chrome.tabs.getCurrent(function (result) {
		id_tab = result.id;
	});

	chrome.storage.local.get(function(result){
		if(result.pyload_parse_links != null && result.pyload_parse_package != null) {
			if(result.pyload_parse_links.length == 0) {
				setNotif('images/error.png', 'PyLoad', "Il n'y a aucun liens à parser");
				chrome.tabs.remove(id_tab);
			}

			var links = result.pyload_parse_links;
			links 	  = links.toString().split(',');
			var titre = result.pyload_parse_package;

			$('h2').html('Nom du package : ' + titre);
			$('#package').val(titre);
			
			$ul = $('<ul/>')
						.addClass('checkable')
						.html('');

			for(var i = 0; i < links.length; i++) {
				$input = $('<input/>')
							.attr('name', 'links[]')
							.attr('type', 'checkbox')
							.attr('checked', 'checked')
							.addClass('linksList')
							.val(links[i]);

				$span = $('<span/>').html(links[i]);

				$li = $('<li/>')
							.append($input)
							.append($span);

				$ul.append($li);
			}
			
			$(".links").html($ul);

			$(document).on('click', '#telecharger', function(e) {
				e.preventDefault();

				var links = new Array();

				$(".linksList").each(function() {
					links.push($(this).attr('name'));
				});

		        if(__addPackage(titre, links)) {
	        		$('#package').val('');
					$('#parser, .links').html('');
					$('.container').hide();

					setNotif('images/pyload_128.png', 'PyLoad', 'Le package ' + titre + ' vient d\'être créer et les liens ajoutés au package');

					chrome.tabs.remove(id_tab);
		        } else {
		            setNotif('images/error.png', 'PyLoad', "Une erreur est survenue lors de l'ajout du lien");
		        }
			});
		} else {
			$('.container').hide();

			chrome.tabs.remove(id_tab);
		}
	});
});
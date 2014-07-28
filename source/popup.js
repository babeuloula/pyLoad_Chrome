$(document).ready(function() {
	var packagesQueue = __getQueue();

    for(var p = 0; p < packagesQueue.length; p++) {
    	var total = packagesQueue[p].sizetotal / 1000000;
    	var cours = packagesQueue[p].sizedone / 1000000;
    	var pouct = (packagesQueue[p].sizedone / packagesQueue[p].sizetotal) * 100;

        $left  	  	 = $("<div/>")
        					.addClass('left')
        					.html(
        						$("<div/>")
        								.addClass('titre')
        								.html(packagesQueue[p].name)
        					);
		$right	  	 = $("<div/>")
							.addClass('right')
							.html(
								$("<div/>")
										.addClass('taille')
										.html(cours.toFixed(2) + ' Mo / ' + total.toFixed(2) + ' Mo')
							);
		$clear	  	 = $("<div/>")
							.addClass('clear');
		$progressBar = $("<div/>")
							.addClass('progressBar')
							.append(
								$('<div/>')
										.addClass('bar')
										.width(pouct.toFixed(0) + '%')
										.append(
											$('<div/>')
													.addClass('progress')
													.append(
														$("<span/>")
																.html(pouct.toFixed(0))
													)
													.append(' %')
										)
							)
		
		$download 	 = $("<div/>")
        					.addClass('download')
        					.append($left)
        					.append($right)
        					.append($clear)
        					.append($progressBar);

		$("#downloads").append($download);
    }
});
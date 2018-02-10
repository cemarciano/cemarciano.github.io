
/* Initialization function: */
$(document).ready(function(){

	// Puts e-mail content where it belongs (to avoid bots):
	var username = "cemarciano";
	var provider = "poli.ufrj.br";
	$(".email").html(username + "@" + provider);

});

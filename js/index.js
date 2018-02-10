
/* Initialization function: */
$(document).ready(function(){

	// Puts e-mail content where it belongs (to avoid bots):
	var username = "cemarciano";
	var provider = "poli.ufrj.br";
	$(".email").html(username + "@" + provider);

	// Calculates my age and adds it to my story:
	var birth = "1995-08-05";
	birth = new Date(birth);
	var today = new Date();
	var age = Math.floor((today-birth) / (365.25 * 24 * 60 * 60 * 1000));
	$('#age').html(age);

});

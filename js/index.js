
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

	// Captures all translate options in the DOM:
	$(".flag").click(function(){
		// Make them translate to the language in their id:
		translate($(this).attr("id"));
	});

	// Attempts to translate using URL parameter "ln":
	translateFromURL("en");

});


function translate(lang){
	console.log("Translating to " + lang);
	// Loads localization json file:
	jQuery.get({ url: 'i18n/' + lang + '.json', cache: false }).done(function (translation) {
		// Selects all elements with a data-i18n attribute previously set:
		var elements = $("[data-i18n]");
		// Applies translation:
		elements.each(function() {
			$(this).text(translation[0][$(this).attr("data-i18n")]);
		});
	});
}


function translateFromURL(defaultLanguage){
	// Captures URL parameters:
	let urlParams = new URLSearchParams(window.location.search);
	// Creates an empty list of available languages:
	var available = [];
	// Gathers all flag elements:
	$(".flag").each(function(){
		// Adds id (available langue) to the list:
		available.push($(this).attr("id"));
	});
	// Checks if desired translation is in the list (i.e. is available):
	if (available.includes(urlParams.get("ln"))){
		// Applies desired translation:
		translate(urlParams.get("ln"));
	} else {
		console.log("Falling back to default translation");
		// Default translation:
		translate(defaultLanguage);
	}
}

var translations = {};
var defaultLanguage = "en";

/* Initialization function: */
$(document).ready(function(){

	// Puts e-mail content where it belongs (to avoid bots):
	var username = "carlos.marciano";
	var provider = "mail.utoronto.ca";
	$(".email").html(username + "@" + provider);

	// Calculates my age and adds it to my story:
	var birth = "1995-08-05";
	birth = new Date(birth);
	var today = new Date();
	var age = Math.floor((today-birth) / (365.25 * 24 * 60 * 60 * 1000));
	$('#age').html(age);

	// Appends flag images to corresponding divs:
	$(".flag").each(function(){
		$(this).css("background-image", "url(static/images/" + $(this).attr("id") + ".png)");
	});

	// Obtains the translation that should be applied at first:
	var firstTranslation = obtainTranslationFromURL();
	// Loads chosen translation first (so it will not compete with other promises):
	jQuery.get({ url: 'i18n/' + firstTranslation + '.json', cache: false }).done(function (translation) {
		// Stores translation for future usage:
		translations[firstTranslation] = translation[0];
		// Applies translation:
		translate(firstTranslation);
		// Loads remaining translations:
		loadRemainingTranslations(firstTranslation);
	});

});


function translate(lang){
	// Selects all elements with a data-i18n attribute previously set:
	var elements = $("[data-i18n]");
	// Applies translation:
	elements.each(function() {
        // Creates a list of json children objects using the data-i18n field value:
        let addrList = $(this).attr("data-i18n").split(".");
        // Dummy variable to run through objects:
        let obj = translations[lang];
        // Loops through children:
        for (i in addrList){
            obj = obj[addrList[i]];
        }
        // Applies translation:
        $(this).html(obj.split('\n').join('<br />'));
	});
	// Applies titles to flags:
	$(".flag").each(function(){
		$(this).attr("title", translations[lang]["flag-titles"][$(this).attr("id")]);
	});
}


function obtainTranslationFromURL(){
	// Captures URL parameters:
	let urlParams = new URLSearchParams(window.location.search);
	// Creates an empty list of available languages:
	var available = [];
	// Gathers all clickable flag elements:
	$(".translation .flag").each(function(){
		// Adds id (available language) to the list:
		available.push($(this).attr("id"));
	});
	// Checks if desired translation is in the list (i.e. is available):
	if (available.includes(urlParams.get("ln"))){
		// Retrieves desired translation:
		return urlParams.get("ln");
	} else {
		// Responds with defaul translation:
		return defaultLanguage;
	}
}

function loadRemainingTranslations(tabu){
	// Captures all translate options in the DOM:
	$(".translation .flag").each(function(){
		// Retrieves language:
		let lang = $(this).attr("id");
		// Adds click callback:
		$(this).click(function(){
			// Checks if translation has already been loaded from the server:
			if (translations[lang] != undefined){
				// Make them translate to the language in their id:
				translate(lang);
			}
		});
		// No need to reload the first applied translation:
		if (lang != tabu){
			// Retrieves translation from server:
			jQuery.get({ url: 'i18n/' + lang + '.json', cache: false }).done(function (translation) {
				// Stores translation for future usage:
				translations[lang] = translation[0];
			});
		}
	});
}

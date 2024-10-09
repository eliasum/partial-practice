
jQuery(function() {
	jQuery(".fancy").fancybox({
		'transitionIn' : 'elastic',
		'transitionOut' : 'none', 
		'titlePosition' : 'over',
		'autoScale' : true,
	});
	
	jQuery("#header .menu-toggle").click(function () {
		jQuery("#header #searchbar").removeClass('active');
		jQuery("#header #topmenu").toggleClass('active');
	});
	jQuery("#header .search-toggle").click(function () {
		jQuery("#header #topmenu").removeClass('active');
		jQuery("#header #searchbar").toggleClass('active');
	});
});


if (document.location.protocol=='http:') {
	var Tynt=Tynt||[];Tynt.push('afimum9fqr4B-Dacwqm_6r');Tynt.i={"ap":"Полная версия на сайте shra.ru: ","b":true,"ba":["/"]};
	(function(){var s=document.createElement('script');s.async="async";s.type="text/javascript";s.src='http://tcr.tynt.com/ti.js';var h=document.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})();
}

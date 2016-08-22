(function( $ ) {
	'use strict';

	$.fn.exists = function () {
		return this.length > 0;
	};

	$('body').prepend('<div id="runner"></div>');
}(jQuery) );

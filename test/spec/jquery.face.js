(function($, QUnit) {
	'use strict';

	var $runner = $('#runner');
	var $fixture = null;

	QUnit.module('jquery.face', {
		beforeEach: function() {
			$fixture = $('<div/>');
			$runner.append($fixture);
		},

		afterEach: function() {
			$fixture.remove();
		}
	});

	QUnit.test('sanity check', function( assert ) {
		assert.equal(typeof $.fn.face, 'function', 'is registrered under jquery.fn');
	});

}(jQuery, QUnit));

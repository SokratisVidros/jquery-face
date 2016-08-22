(function($, QUnit) {
	'use strict';

	var $runner = $('#runner');
	var $fixture = null;

	QUnit.module('jquery.face', {
		beforeEach: function () {
			$fixture = $('<div>');
			$runner.append($fixture);
		},

		afterEach: function () {
			$fixture.remove();
		}
	});

	QUnit.test('sanity check', function ( assert ) {
		assert.equal(typeof $.fn.face, 'function', 'is registrered under jquery.fn');
	});

	QUnit.test('when image exists renders the placeholder and then the actual image', function (assert) {
		var done = assert.async();

		$fixture.append('<div data-face="images/peggy.jpg">').face({
			retries: 1,
			interval: 10
		});

		assert.ok($fixture.find('span.placeholder').exists());

		setTimeout(function() {
			assert.ok($fixture.find('img:eq(0)').exists());
			assert.ok($fixture.find('img:eq(0)').attr('src').match('peggy.jpg'));
			done();
		}, 100);
	});

	QUnit.test('when image does not exist renders the placeholder and finally the default fallback ', function (assert) {
		var done = assert.async();

		$fixture.append('<div data-face="invalid.jpg">').face({
			retries: 1,
			interval: 10
		});

		assert.ok($fixture.find('span.placeholder').exists());

		setTimeout(function() {
			assert.ok($fixture.find('img:eq(0)').exists());
			assert.ok($fixture.find('img:eq(0)').attr('src').match('data:image/png'));
			done();
		}, 100);
	});
}(jQuery, QUnit));

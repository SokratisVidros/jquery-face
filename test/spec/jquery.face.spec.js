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

		assert.ok($fixture.find('div.placeholder').exists());

		setTimeout(function() {
			assert.ok($fixture.find('img:eq(0)').exists());
			assert.ok($fixture.find('img:eq(0)').attr('src').match('peggy.jpg'));
			done();
		}, 100);
	});

	QUnit.test('passes imgProps options to the rendered image', function (assert) {
		var done = assert.async();

		$fixture.append('<div data-face="images/peggy.jpg">').face({
			retries: 1,
			interval: 10,
			imgProps: {
				alt: 'Peggy'
			}
		});

		setTimeout(function() {
			assert.ok($fixture.find('img:eq(0)').prop('alt').match('Peggy'));
			done();
		}, 100);
	});

	QUnit.test('when image does not exist renders the placeholder and finally the fallback', function (assert) {
		var done = assert.async();

		$fixture.append('<div data-face="invalid.jpg">').face({
			retries: 1,
			interval: 10
		});

		assert.ok($fixture.find('div.placeholder').exists());

		setTimeout(function() {
			assert.ok($fixture.find('img:eq(0)').exists());
			assert.ok($fixture.find('img:eq(0)').attr('src').match('data:image/png'));
			done();
		}, 100);
	});

	QUnit.test('when shortcircuit function is used', function (assert) {
		$fixture.append('<div data-face="avatar_default.jpg">').face({
			retries: 1,
			interval: 10,
			shortcircuit: function (url) {
				return !url || /_default(\-.+)?\.(png|jpe?g)/ig.test(url);
			}
		});

		assert.ok($fixture.find('img:eq(0)').exists());
		assert.ok($fixture.find('img:eq(0)').attr('src').match('data:image/png'));
	});
}(jQuery, QUnit));

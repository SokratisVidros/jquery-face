/*
 *  jquery-face - v1.0.4
 *  
 *  
 *
 *  Made by Sokratis Vidros
 *  Under MIT License
 */
;(function($) {
  'use strict';

  var settings = {}
    , URL_REGEX = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    , FALLBACK_IMG = '<img src="data:image/png;base64,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">';

  function stripProtocol(str) {
    return (str || '').replace(/https?:\/\//ig, '//');
  }

  function isHttpUrl(str) {
    var url = $.trim(str) || '';
    return URL_REGEX.test(url);
  }

  function loadImage(url, retries, delay, onLoad, onError) {
    var image = new Image();

    image.onload = onLoad;
    image.onerror = function () {
      if (retries > 0) {
        setTimeout(function () {
          loadImage(url, --retries, delay * 2, onLoad, onError);
        }, delay);
      } else {
        onError();
      }
    };

    image.src = url;
  }

  $.fn.face = function (options) {

    settings = $.extend({
      retries: 3,
      interval: 250,
      imgProps: {},
      className: 'crop',
      fallbackImg: FALLBACK_IMG,
      shortcircuit: function () { return false; }
    }, options);

    this.find('[data-face]')
      .each(function () {
        var $face = $(this)
          , url = stripProtocol($face.data('face'))
          , klass = 'jq-face ' + settings.className;

        function renderImage(e) {
          var $el = $(e.target).prop(settings.imgProps);
          $face.html($el.get(0).outerHTML);
        }

        function renderFallback() {
          if (isHttpUrl(settings.fallbackImg)) {
            $face.html('<img src="' + $.trim(settings.fallbackImg) + '">');
          } else {
            $face.html(settings.fallbackImg);
          }
        }

        $face.addClass(klass);

        if (!url || ($.isFunction(settings.shortcircuit) && settings.shortcircuit(url))) {
          renderFallback();
        } else {
          $face.html('<div class="placeholder"/>');
          loadImage(url, settings.retries, settings.interval, renderImage, renderFallback);
        }
    });
  };
}(jQuery));

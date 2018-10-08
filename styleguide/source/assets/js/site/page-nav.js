/**
 * @file
 * A JavaScript file for the site.
 *
 * @copyright Copyright 2018 Palantir.net
 */

 // JavaScript should be made compatible with libraries other than jQuery by
 // wrapping it with an "anonymous closure". See:
 // - https://drupal.org/node/1446420
 // - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal) {

  Drupal.behaviors.pageNav = {
    attach: function (context, settings) {

      $("#page-nav--trigger", context).click(function (event) {
        $(this).blur();
        $(this).toggleClass('is-active');
        event.preventDefault();
        $(this).siblings('#page-nav').slideToggle();
      });

      $(window).resize(function (event) {
        if ($(window).width() >= 900) {
          $('#page-nav').slideDown();
        }
      });
    }
  };
})(jQuery, Drupal);

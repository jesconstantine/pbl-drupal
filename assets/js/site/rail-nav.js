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

  Drupal.behaviors.railNav = {
    attach: function (context, settings) {

      $("#sidebar-nav--trigger", context).click(function (event) {
        $(this).blur();
        $(this).toggleClass('is-active');
        event.preventDefault();
        $(this).siblings('#sidebar-nav').slideToggle();;
      });

      $(window).resize(function (event) {
        if ($(window).width() >= 900) {
          $('#sidebar-nav', context).slideDown();;
        }
      });

      $(".sidebar-nav__item-trigger", context).click(function (event) {
        $(this).blur();
        event.preventDefault();
        $(this).parents().parents('.sidebar-nav__item').toggleClass('is-active');
        $(this).parents().parents().siblings('.sidebar-nav__item').removeClass('is-active');
      });

      $(".sidebar-nav__parent-trigger", context).click(function (event) {
        $(this).blur();
        event.preventDefault();
        $(this).parents().parents('.sidebar-nav__parent').toggleClass('is-active');
        $(this).parents().parents().siblings('.sidebar-nav__parent').removeClass('is-active');
      });
    }
  };
})(jQuery, Drupal);

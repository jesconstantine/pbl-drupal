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

  Drupal.behaviors.railFilter = {
    attach: function (context, settings) {
      
      $('#rail-filter--trigger', context).click(function (event) {
        $(this).blur();
        $(this).toggleClass('is-active');
        event.preventDefault();
        $(this).siblings('#rail-filter--overflow').slideToggle();
      });
    }
  };
})(jQuery, Drupal);

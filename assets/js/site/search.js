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

  Drupal.behaviors.search = {
    attach: function (context, settings) {
      
      function setHeight() {
        docHeight = $(document).innerHeight();
        headerHeight = $('#site-header').innerHeight();
        $('#menu-overlay').css('min-height', (docHeight - headerHeight));
      };
      
      // Open search when search icon is clicked
      $("#search-trigger").click(function (event) {
        $(this).toggleClass('is-active');
        $(this).blur();
        event.preventDefault();
        $('#search').toggleClass('is-active');
        $('#menu-overlay').toggleClass('is-active--search');
        $('#menu').removeClass('is-active');
        $('.menu-item').removeClass('is-active');
        $('#menu-overlay').removeClass('is-active');
        setHeight();
        if ($('#search').hasClass('is-active')) {
          $('#menu-overlay').fadeIn();
        } else {
          $('#menu-overlay').fadeOut();
        }
        // focus on input
        setTimeout(function() { $('#site-search').focus() }, 300);
      });
      
      
      // Close search when close icon is clicked
      $("#search-close").click(function (event) {
        $("#search-trigger").removeClass('is-active');
        $(this).blur();
        event.preventDefault();
        $('#search').removeClass('is-active');
        $('#menu-overlay').removeClass('is-active--search');
        $('#menu-overlay').fadeOut();
        // removes focus state outline for click users
        $('#search-trigger').blur();
        $('#menu-overlay').css('min-height', '0');
        // focus on search trigger
        setTimeout(function() { $('#search-trigger').focus() }, 300);
      });
    }
  };
})(jQuery, Drupal);

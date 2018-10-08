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

  Drupal.behaviors.menu = {
    attach: function (context, settings) {
      
      // open main mobile menu
      $("#menu-trigger").click(function (event) {
        $(this).blur();
        event.preventDefault();
        $('#menu-overlay').removeClass('is-active--search');
        $('#menu-overlay').fadeOut();
        $('#menu').addClass('is-active');
        $('#menu-overlay').addClass('is-active');
        $('#menu-overlay').fadeIn();
        $("#search-trigger").removeClass('is-active');
        $('#search').removeClass('is-active');
      });
      
      // close main mobile menu
      $("#menu-close").click(function (event) {
        $(this).blur();
        event.preventDefault();
        $('#menu').removeClass('is-active');
        $('#menu').find('.menu-item').removeClass('is-active');
        $('#menu-overlay').fadeOut();
        $('#menu-overlay').removeClass('is-active');
        // removes focus state outline for click users
        setTimeout(function() { 
          $('#menu-trigger').focus();
          $('#menu-trigger').blur(); 
        }, 300);
      });
      
      // close menu on esc press
      $(document).keydown(function(event) { 
        // close mobile menu on esc press
        if (event.keyCode == 27 && ($('#menu').hasClass('is-active'))) { 
          $('#menu').removeClass('is-active');
          $('#menu-overlay').removeClass('is-active');
          $('#menu-overlay').fadeOut();
          $('.menu-item').removeClass('is-active');
          setTimeout(function() { $('#menu-trigger').focus() }, 300);
          // close search on esc press
        } else if (event.keyCode == 27 && ($('#search').hasClass('is-active'))) {
          $("#search-trigger").removeClass('is-active');
          $('#search').removeClass('is-active');
          $('#menu-overlay').removeClass('is-active--search');
          $('#menu-overlay').fadeOut();
          setTimeout(function() { $('#search-trigger').focus() }, 300);
          // close desktop menu on esc press
        } else if (event.keyCode == 27 && ($('.menu-item').hasClass('is-active'))) {
          $('#menu-overlay').removeClass('is-active');
          $('#menu-overlay').fadeOut();
          $('.menu-item').removeClass('is-active');
          setTimeout(function() { $('#menu').focus() }, 300);
        } 
      });
      
      
      $("#menu-overlay").click(function (event) {
        // close menu overlay on menu overlay click press
        if ($(this).hasClass('is-active')) {
          $(this).blur();
          event.preventDefault();
          $('#menu').removeClass('is-active');
          $('.menu-item').removeClass('is-active');
          $(this).removeClass('is-active');
          $(this).fadeOut();
          setTimeout(function() { 
            $('#menu-trigger').focus(); 
            $('#menu-trigger').blur();
          }, 300);
          // removes focus state outline for click users
          
        } else if ($(this).hasClass('is-active--search')) {
          // close menu overlay on search overlay click press
          $(this).blur();
          event.preventDefault();
          $("#search-trigger").removeClass('is-active');
          $(this).removeClass('is-active');
          $('#search').removeClass('is-active');
          $('#menu-overlay').removeClass('is-active--search');
          $('#menu-overlay').fadeOut();
          setTimeout(function() { 
            $('#search-trigger').focus(); 
            $('#search-trigger').blur();
          }, 300);
        }
      });
      
      function setHeight() {
        docHeight = $(document).innerHeight();
        headerHeight = $('#site-header').innerHeight();

        if ($(window).width() >= 900) {
          $('#menu-overlay').css('min-height', (docHeight - headerHeight));
        }
      };
      
      // open child menu item
      $(".menu-trigger--secondary").click(function (event) {
        $(this).blur();
        event.preventDefault();
        $(this).parents().parents('.menu-item').toggleClass('is-active');
        // close other open child items
        $(this).parents().parents().siblings().removeClass('is-active');
        $("#search-trigger").removeClass('is-active');
        $('#search').removeClass('is-active');
        $('#menu-overlay').removeClass('is-active--search');
        
        if ($('.menu-item').hasClass('is-active') || $('#menu').hasClass('is-active')) {
          $('#menu-overlay').fadeIn();
          $('#menu-overlay').addClass('is-active');
          setHeight();
        } else {
          $('#menu-overlay').fadeOut();
        }
      });
    }
  };

})(jQuery, Drupal);

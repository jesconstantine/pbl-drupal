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

  Drupal.behaviors.resourceCard = {
    attach: function (context, settings) {

      // Opens and closes lightbox.
      $('.resource-modal-trigger', context).click(function() {
        event.preventDefault();
        // Unfocus the card
        $(this).blur();
        // add a class to parent wrapper
        $(this).parents('.card--resource').toggleClass('is-active');
        $('.resource-gallery').slick('refresh');
      });

      $('.resource-modal-close').click(function() {
        event.preventDefault();
        // Unfocus the card
        $(this).blur();
        // add a class to parent wrapper
        $(this).parents('.card--resource').removeClass('is-active');
      });

      // close the modal when esc is pressed
      $(document).keydown(function(event) {
        if (event.keyCode == 27) {
          $(".card--resource").removeClass('is-active');
        }
      });

    }
  };
})(jQuery, Drupal);

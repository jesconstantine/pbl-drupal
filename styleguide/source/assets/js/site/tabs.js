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

  Drupal.behaviors.tabs = {
    attach: function (context, settings) {
      
      $(".tabs .tab-links button").click(function (e) {
        var currentAttrValue = $(this).attr('data-id');
        var id = "#" + currentAttrValue;

        // Show/Hide Tabs
        $('.tabs ' + id).addClass('is-active').siblings().removeClass('is-active');
        $('.tabs ' + id).attr("aria-hidden","false").siblings().attr("aria-hidden","true");

        // Change/remove current tab to active
        $(this).parent('li').addClass('is-active').siblings().removeClass('is-active');
        $(this).attr("aria-selected","true").siblings().attr("aria-selected","false");

        e.preventDefault();
      });
      
      $(window).on('ready load resize', function(event) {
        // Select and loop the container element of the elements you want to equalise
        $('.tab-windows').each(function(){  
          // Cache the highest
          var tallest = 0;
          // Select and loop the elements you want to equalise
          $('.tab-window .img-w-text', this).each(function(){
            // If this box is higher than the cached highest then store it
            if($(this).height() > tallest) {
              tallest = $(this).height(); 
            }
          });  
          
          if(!navigator.userAgent.match(/Trident\/7\./)) {
            // Set the height of all those children to whichever was highest 
            $('.tab-window',this).height(tallest); 
            // Set the height of the tab-windows to be this
            $(this).height(tallest); 
          }
        });
      });
    }
  };

})(jQuery, Drupal);

/**
 * @file
 * A JavaScript file for the site that creates a table of contents with anchor
 * link navigation. The class 'format_headers' must be applied to the wrapper
 * for the element that needs IDs applied to contained h2 headers
 *
 * @copyright Copyright 2018 Palantir.net
 */

 // JavaScript should be made compatible with libraries other than jQuery by
 // wrapping it with an "anonymous closure". See:
 // - https://drupal.org/node/1446420
 // - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal) {

  Drupal.behaviors.anchorNav = {
    attach: function (context, settings) {
      var tocheader = $('.page-nav__list', context);
      var headers = [];
      // Function to apply IDs to anchors.
      var applyIds = function(selector) {
        // Anchor link text.
        var text = $(selector).text();
        var markup = '';
        if (!$(selector).attr("id")) {
          // Create IDs if they don't have them from titles
          // Remove spaces and non-alphanumeric characters
          var textId = text.replace(/[^a-z0-9+]+/gi, '-').toLowerCase();
          // Appy the new ID.
          $(selector).attr("id", textId);
          markup = '<li class="page-nav__item"><div class="page-nav__item-container"><a href="#'+ textId +'">' + text + '</a></div></li>';
          // Add markup to  table of contents array.
          // Exclude "On this page" TOC header from TOC.
          if (!$(selector).hasClass("page-nav__title")) {
            headers.push(markup);
          }
        } else if ($(selector).attr("id")) {
          // If they already have IDs use them.
          var anchorId = $(selector).attr('id');
          markup = '<li class="page-nav__item"><div class="page-nav__item-container"><a href="#'+ anchorId +'">' + text + '</a></div></li>';
          // Add markup to  table of contents array.
          // Exclude "On this page" TOC header from TOC.
          if (!$(selector).hasClass("page-nav__title")) {
            headers.push(markup);
          }
        }
      };
      // Look for header tags in wysiwyg body.
      $('.format_headers h2', context).each(function(i) {
        var selector = $(this);
        applyIds(selector);
      });
      // Look for header tags in page section.
      $('.section-header', context).find('h2').each(function(i) {
        var selector = $(this);
        applyIds(selector);
      });
      // Append list markup to TOC header.
      if ($('.page-nav--wrapper').length) {
        tocheader.append(headers);
      }
    }
  };
})(jQuery, Drupal);

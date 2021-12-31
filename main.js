function addLinks() {
  let last_printed_from_address = undefined;
  let appended_elements = [];

  window.setInterval(function() {
    const from_address = $('[role=main] h3 [role=gridcell] > span:first-child').data('hovercard-id');

    if (from_address !== last_printed_from_address) {
      appended_elements.forEach(function (element, idx) {
        element.remove();
      });
      appended_elements = [];

      if (from_address !== undefined) {
        if (!$('#aso_search_form_anchor').length) {
          // No point in continuing here if the location where the links are going to be
          // does not exist yet. This happens when the user navigates to an email directly.
          return;
        }

        const fully_qualified_domain = from_address.split('@')[1];
        const from_domain = fully_qualified_domain.match(/([^\.]+\.[^\.]+)\s*$/)[1];

        /*
        from_address            = 'shipping_notification@orders.apple.com'
        fully_qualified_domain  = 'orders.apple.com'
        from_domain             = 'apple.com'
        */

        const user_number = window.location.href.match(/https:\/\/mail\.google\.com\/mail\/u\/(\d+)/)[1];
        const href_address = `https://mail.google.com/mail/u/${user_number}/#search/in:inbox+from:${from_address}`;
        const href_domain = `https://mail.google.com/mail/u/${user_number}/#search/in:inbox+from:${from_domain}`;

        const new_element = $(
          '<div style="text-align: right; padding-right: 6%;">' +
            `<a href="${href_address}" target="_blank">More from <b>${from_address}</b></a> | <a href="${href_domain}">More from <b>${from_domain}</b></a>` +
          '</div>'
        );

        $('#aso_search_form_anchor').parent().append(new_element);
        appended_elements.push(new_element);
      }

      last_printed_from_address = from_address;
    }

  }, 1000);
}

jQuery(document).ready(function() {
  addLinks();
});

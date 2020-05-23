function addLinks() {
  let last_printed_from_address = undefined;
  let appended_elements = [];

  window.setInterval(function(){
    const from_address = $('[role=main] h3 [role=gridcell] > span:first-child').data('hovercard-id');

    if (from_address !== last_printed_from_address) {
      appended_elements.forEach(function (element, idx) {
        element.remove();
      });
      appended_elements = [];

      if (from_address !== undefined) {
        const from_domain = from_address.split('@')[1];

        // TODO: use the correct user number
        const href_address = `https://mail.google.com/mail/u/0/#search/in%3Ainbox+from%3A${from_address}`;
        const href_domain = `https://mail.google.com/mail/u/0/#search/in%3Ainbox+from%3A${from_domain}`;

        const new_element = $(
          '<div style="text-align: right; padding-right: 6%;">' +
            `<a href="${href_address}" target="_blank">More from <b>${from_address}</b></a> | <a href="${href_domain}">More from <b>${from_domain}</b></a>` +
          '</div>'
        );

        $('#aso_search_form_anchor').parent().append(new_element)
        appended_elements.push(new_element);
      }

      last_printed_from_address = from_address;
    }

  }, 1000);
}

addLinks();

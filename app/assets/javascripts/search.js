$(document).ready(function () {

  // console.log("loaded");
  $('#bar-search-form').on('submit', function (e) {
    e.preventDefault();
    console.log($(this));
    var req = {
      city: $('#bar-search-form input[name="city"]').val(),
      team: $('#bar-search-form input[name="team"]').val()
    }
    console.log(req);

    $.post('/bars/index', req).done(function (data) {
      console.log("res", data);
      $("#map-canvas").removeClass("hidden");

      google.maps.event.addDomListener(window, 'load', initialize(data));
      $('#bar-search-form input[name="city"]').val("")
      $('#bar-search-form input[name="team"]').val("")
      $(".errors").empty();

      if (!data[0]) {

        $('#bar-search-form').prepend('<h4 class="errors"> Sorry. We do not have a bar in this city that is associated with this team. If you know of one, please sign in to suggest one. </h4>')
      }


    }).fail(function() {

      console.log("HERE IS SOMETHING" + " " + data);

      //

    })

  });
});

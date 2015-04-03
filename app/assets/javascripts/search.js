$(document).ready(function () {
  // console.log("loaded");
  $('#bar-search-form').on('submit', function (e) {
    e.preventDefault();
    console.log("submited");
    var req = {
      city: $('#bar-search-form input[name="city"]').val(),
      team: $('#bar-search-form input[name="team"]').val()
    }
    console.log(req);
    $.post('/bars/index', req)
    .done(function (data) {
      console.log("res", data);
      $("#map-canvas").removeClass("hidden");
      google.maps.event.addDomListener(window, 'load', initialize(data));
    })
    .fail(function (res) {
      throw "Ajax request failed";
    })
  });
});

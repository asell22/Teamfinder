var data;
$(document).ready(function () {
    $('#search').click(function (e) {
        e.preventDefault();

        $.post('/bars/search', $('input')
            .serialize())
            .done(function (data) {
               console.log(data)
              data = data;
              $("#map-canvas").removeClass("hidden");
              google.maps.event.addDomListener(window, 'load', initialize(data));
        })
            .fail(function (res) {
            throw "Ajax request failed";
        })
    });
});

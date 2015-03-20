var data;
$(document).ready(function () {
    $('button#search').click(function (e) {
        e.preventDefault();
        $.post('/search', $('input')
            .serialize())
            .done(function (data) {
               console.log(data)
              data = data;
              // $('#map-canvas').empty()
              google.maps.event.addDomListener(window, 'load', initialize(data));
        })
            .fail(function (res) {
            throw "Ajax request failed";
        })
    });
});

function initialize(data) {
  var myLatlng = new google.maps.LatLng(
    data.businesses[0].location.coordinate.latitude,
    data.businesses[0].location.coordinate.longitude
    );
  var mapOptions = {
    zoom: 14,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker;

  $(window).resize(function() {
    // (the 'map' here is the result of the created 'var map = ...' above)
    google.maps.event.trigger(map, "resize");
  });


  for(var i = 0;i < data.businesses.length; i++){
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          data.businesses[i].location.coordinate.latitude,
          data.businesses[i].location.coordinate.longitude
          ),
        map: map,
        name: data.businesses.name,
        url: data.businesses.url,
        display_phone: data.businesses[i].display_phone,
        display_address: data.businesses[i].location.address[0]

    });

    var infoContent = function(i) {
      entry = data.businesses[i]
      return '<div class="info_content">'
              + '<h3>' + entry.name + '</h3>'
              + '<p>' +  entry.location.display_address[0] + '</p>'
              + '<p>' + entry.display_phone + '</p>'
              + '<a href="' + entry.url + '">go to website</a></div>'

    };

    var infoWindow = new google.maps.InfoWindow();
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
             infoWindow.setContent(infoContent(i));
             infoWindow.open(map, marker);
         }
     })(marker, i));


  }

  var styles = [
    {
      "featureType":"landscape",
      "stylers":
      [
        {"saturation":-100},
        {"lightness":65},
        {"visibility":"on"}
      ]
    },

    {
      "featureType":"poi",
      "stylers":
      [
        {"saturation":-100},
        {"lightness":51},
        {"visibility":"simplified"}
      ]
    },

    {
      "featureType":"road.highway",
      "stylers":
      [
        {"saturation":-100},
        {"visibility":"simplified"}
      ]
    },

    {
      "featureType":"road.arterial",
      "stylers":
      [
        {"saturation":-100},
        {"lightness":30},
        {"visibility":"on"}
      ]
    },

    {
      "featureType":"road.local",
      "stylers":
      [
        {"saturation":-100},
        {"lightness":40},
        {"visibility":"on"}
      ]
    },

    {
      "featureType":"transit",
      "stylers":
      [
        {"saturation":-100},
        {"visibility":"simplified"}
      ]
    },

    {
      "featureType":"administrative.province",
      "stylers":
      [
        {"visibility":"off"}
      ]
    },

    {
      "featureType":"water",
      "elementType":"labels",
      "stylers":
      [
        {"visibility":"on"},
        {"lightness":-25},
        {"saturation":-100}
      ]
    },

    {
      "featureType":"water",
      "elementType":"geometry",
      "stylers":
      [
        {"hue":"#ffff00"},
        {"lightness":-25},
        {"saturation":-97}
      ]
    }
  ]

map.setOptions({styles: styles});

}

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require search.js
//= require underscore
//= require semantic-ui
//= require add.js

var styles = function (argument) {
  return [
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
}

function initialize(data) {
  var myLatlng;
  if (data) {
    myLatlng = new google.maps.LatLng(
      data[0].latitude,
      data[0].longitude
    );
  }else{
    myLatlng = new google.maps.LatLng(
      data.latitude,
      data.longitude
    );

  }

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

  for(var i = 0;i < data.length; i++){

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        data[i].latitude,
        data[i].longitude
      ),
      map: map,
      name: data.name,
      url: data.url,
      display_phone: data[i].display_phone,
      display_address: data[i].address[0]

    });

    var infoContent = function(i) {
      entry = data[i]
      return '<div class="info_content">'
      + '<h3>' + entry.name + '</h3>'
      + '<p>' +  entry.address + '</p>'
      + '<p>' + entry.phone + '</p>'
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


  map.setOptions({styles: styles()});
}

function addMapInitialize(data) {
  var lat = data.location.coordinate.latitude
  var lng = data.location.coordinate.longitude
  var myLatlng = new google.maps.LatLng(lat,lng);
  var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 14, center: myLatlng});



  // $(window).resize(function() {
  //   // (the 'map' here is the result of the created 'var map = ...' above)
  //   google.maps.event.trigger(map, "resize");
  // });


  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    name: data.name,
    url: data.url,
    display_phone: data.display_phone,
    display_address: data.location.address[0]
  });

  // var infoContent = function(data) {
  //
  //   return '<div class="info_content"><h3>' + data.name + '</h3></div>'
  //
  // };

  // var infoWindow = new google.maps.InfoWindow();
  // google.maps.event.addListener(marker, 'click', (function(marker) {
  //   return function() {
  //     infoWindow.setContent(infoContent(data));
  //     infoWindow.open(map, marker);
  //   }
  // })(marker));


  map.setOptions({styles: styles()});
}

$(document).ready(function () {
  $('.ui.modal').modal()

  $('form [type="submit"]').click(function (e) {
    e.preventDefault();

		$.ajax({
			method: "post",
			url: '/bars/search',
			data: $('input').serialize()
		})
    .done(function (data) {
      $('.ui.modal').modal('show');

      var address = location.display_address;

      $("#showList").empty()


			data.businesses.splice(5)

      $.each(data.businesses, function (i) {

        $("#showList").append(

          '<div class="bar ui inverted green button" data-id="'+i+'">\
            <div class="title">'+ data.businesses[i].name +'</div>\
            <div class="content">' + data.businesses[i].location.display_address[0] + '\n'
            + data.businesses[i].location.display_address[data.businesses[i].location.display_address.length-1] +
            '</div>\
          </div>'


        )
      })

			window.barList = data;
    })
    .fail(function (res) {
      throw "Ajax request f";
    })
  });



  $("#showList").on("click", ".bar", function() {
    $('.ui.modal').modal('hide')

		// console.log(barList);
    // console.log(barList.businesses[parseInt($(this).data("id"))]);
		setBarDetails(barList.businesses[parseInt($(this).data("id"))])
	});

	$("#teamInput").on("click", "#submitBar", function(){
    var barDetails = $("#barDetails").data();
    var teamNames = $(".team-list").html();
    var teamsRaw = teamNames.replace(/<\/div>|<div>/g, "^").split("^");
    var teams = [];
    $.each(teamsRaw, function (i, name) {
      if (name !== "") {
        teams.push(name);
      };
    })


    $.ajax('/bars',
      {type: 'post',
      data: {
        bar: {
          name: barDetails.name,
          address: barDetails.location.display_address[0],
          city: barDetails.location.city,
          latitude: barDetails.location.coordinate.latitude,
          longitude: barDetails.location.coordinate.longitude,
          url: barDetails.url,
          phone: barDetails.phone
         },
        teams: teams
        }
      }
    )
  });

  $("#teamInput").on("submit", "form", function(e) {
    e.preventDefault();
    var teamName = $('#teamInput input').val();
    $('input').val("");


    $(".team-list").append(
      '<div>'+ teamName +'</div>'
    )

    console.log($(".team-list").text())
  });
});

function setBarDetails(barObj) {
	var phone = getPhoneNumber(barObj.display_phone)

	$("#barDetails").append(
  	'<div class="ui card" >\
  	  <div class="image"><div id="map-canvas" style="height:100%; width:100%"></div></div>\
      <div class="content">\
  	    <a class="header" href="' + barObj.url +'">'+ barObj.name +'</a>\
  	    <div class="description">'+ barObj.location.display_address[0] +', '+ barObj.location.display_address[barObj.location.display_address.length-1] +'</div>\
  	  </div>\
  	 	<div class="extra content">'+ phone +'</div>\
  	</div>'
	)

	$("#barDetails").data(barObj)

  console.log("window", window);
  google.maps.event.addDomListener(window, 'load', addMapInitialize(barObj));
  $("form").fadeOut(300, function() { $(this).remove(); });

  $("#teamInput").html(
    '<div class="teamForm ui secondary segment">\
    <form>\
    <div class="ui action input">\
      <input type="text" placeholder="Enter Team">\
      <button class="ui button" >Submit</button>\
    </div>\
    </form>\
    <div class="team-list"></div>\
    <div id="submitBar" class="ui teal basic button">Add This Bar</div>\
    </div>'
  )

}

function getPhoneNumber(phoneNumStr) {
  if (phoneNumStr && phoneNumStr.match(/^\+\d-\d{3}-\d{3}-\d{4}$/)){
  	var phoneArray = phoneNumStr.split("-");
    var formattedPhoneNumber = "(" + phoneArray[1] + ") " + phoneArray[2] + "-" + phoneArray[3]
  }else{
    formattedPhoneNumber = "No phone found";
  }
	return formattedPhoneNumber;
}

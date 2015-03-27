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

	$("#barDetails").on("click", ".button", function(){
		console.log($(this).closest("#barDetails").data());
	});

});

function setBarDetails(barObj) {
	var phone = getPhoneNumber(barObj.display_phone)
  google.maps.event.addDomListener(window, 'load', initialize(barObj));
	$("#barDetails").append(
	'<div class="ui card" >\
	   <div class="image">\
	     <img src="' + barObj.image_url + '">\
	   </div>\
	   <div class="content">\
	     <a class="header" href="' + barObj.url +'">'+ barObj.name +'</a>\
	     <div class="description">'+ barObj.location.display_address[0] +', '+ barObj.location.display_address[barObj.location.display_address.length-1] +
	 		'</div>\
	  	</div>\
	 	<div class="extra content">'+ phone +
	 	'</div>\
		<div class="extra content"><div class="ui teal basic button">Add This Bar</div></div>\
	 </div>'
	)

	$("#barDetails").data(barObj)
}

function getPhoneNumber(phoneNumStr) {
  if (phoneNumStr){
  	var phoneArray = phoneNumStr.split("-");
    var formattedPhoneNumber = "(" + phoneArray[1] + ") " + phoneArray[2] + "-" + phoneArray[3]
  }else{
    formattedPhoneNumber = "No phone found";
  }
	return formattedPhoneNumber;
}

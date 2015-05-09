
$(document).ready(function () {


  $('#add-form').on("submit", function (e) {
    e.preventDefault();
    alert("You submitted")
    $('.ui.modal').modal()

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


    return false;
  });



  $("#showList").on("click", ".bar", function() {
    $('.ui.modal').modal('hide')

		// console.log(barList);
    // console.log(barList.businesses[parseInt($(this).data("id"))]);
		setBarDetails(barList.businesses[parseInt($(this).data("id"))])
	});

	$("#teamInput").on("click", "#submitBar", function(){
    var barDetails = $("#barDetails").data();
    // var teamNames = $(".ui.search.dropdown").find('option:selected').text().replace(/NFL|NBA|MLB|/g, "").replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")
    //
    // for(var i = 0; i < teamNames.length; i++){
    //   if (i % 2 === 0){
    //     teams.push(teamNames[i] + " " + teamNames[i + 1])
    //   }
    // }
    console.log(teams)
    // var teamsRaw = teamNames.replace(/<\/div>|<div>/g, "^").split("^");

    // $.each(teamsRaw, function (i, name) {
    //   if (name !== "") {
    //     teams.push(name);
    //   };
    // $(".team-list").html("Your Bar Has Been Suggested!");
    // })
    //

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

  // $("#submitTeam").on("submit", "form", function(e) {
  //   e.preventDefault();
  //   var teamName = $('#teamInput input').val();
  //   $('input').val("");
  //
  //
  //   $(".team-list").append(
  //     '<div>'+ teamName +'</div>'
  //   )
  //
  //   console.log($(".team-list").text())
  // });
});
var teams = [];
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
    '<div class="teamForm ui secondary segment" style={height: 50%}>\
    <form>\
      <select class="ui search dropdown" id="MLB">\
        <option value="">MLB</option>\
        <option value="AZ" data-picture="/assets/baseball/diamondbacks_image.png">Arizona Diamondbacks</option>\
        <option value="ATL" data-picture="/assets/baseball/braves_image.png">Atlanta Braves</option>\
        <option value="BAL" data-picture="/assets/baseball/orioles_image.png">Baltimore Orioles</option>\
        <option value="BOS" data-picture="/assets/baseball/red_sox_image.png">Boston Red Sox</option>\
        <option value="CHW" data-picture="/assets/baseball/white_sox_image.png">Chicago White Sox</option>\
        <option value="CHC" data-picture="/assets/baseball/cubs_image.png">Chicago Cubs</option>\
        <option value="CIN" data-picture="/assets/baseball/reds_image.png">Cincinnati Reds</option>\
        <option value="CLE" data-picture="/assets/baseball/indians_image.png">Cleveland Indians</option>\
        <option value="COL" data-picture="/assets/baseball/rockies_image.png">Colorado Rockies</option>\
        <option value="DET" data-picture="/assets/baseball/tigers_image.png">Detroit Tigers</option>\
        <option value="HOU" data-picture="/assets/baseball/astros_image.png">Houston Astros</option>\
        <option value="KC" data-picture="/assets/baseball/royals_image.png">Kansas City Royals</option>\
        <option value="LAA" data-picture="/assets/baseball/angels_image.png">Los Angeles Angels</option>\
        <option value="LAD" data-picture="/assets/baseball/dodgers_image.png">Los Angeles Dodgers</option>\
        <option value="MIA" data-picture="/assets/baseball/marlins_image.png">Miami Marlins</option>\
        <option value="MIL" data-picture="/assets/baseball/brewers_image.png">Milwaukee Brewers</option>\
        <option value="MIN" data-picture="/assets/baseball/twins_image.png">Minnesota Twins</option>\
        <option value="NYY" data-picture="/assets/baseball/yankees_image.png">New York Yankees</option>\
        <option value="NYM" data-picture="/assets/baseball/mets_image.png">New York Mets</option>\
        <option value="OAK" data-picture="/assets/baseball/athletics_image.png">Oakland Athletics</option>\
        <option value="PHI" data-picture="/assets/baseball/phillies_image.png">Philadelphia Phillies</option>\
        <option value="PIT" data-picture="/assets/baseball/pirates_image.png">Pittsburgh Pirates</option>\
        <option value="SD" data-picture="/assets/baseball/padres_image.png">San Diego Padres</option>\
        <option value="SF" data-picture="/assets/baseball/giants_image.png">San Francisco Giants</option>\
        <option value="SEA" data-picture="/assets/baseball/mariners_image.png">Seattle Mariners</option>\
        <option value="STL" data-picture="/assets/baseball/cardinals_image.png">St. Louis Cardinals</option>\
        <option value="TB" data-picture="/assets/baseball/rays_image.png">Tampa Bay Rays</option>\
        <option value="TEX" data-picture="/assets/baseball/rangers_image.png">Texas Rangers</option>\
        <option value="TOR" data-picture="/assets/baseball/blue_jays_image.png">Toronto Blue Jays</option>\
        <option value="WAS" data-picture="/assets/baseball/nationals_image.png">Washington Nationals</option>\
      </select>\
      <select class="ui search dropdown" id="NFL">\
        <option value="">NFL</option>\
        <option value="AZ" data-picture="/assets/football/cardinals_image.png">Arizona Cardinals</option>\
        <option value="ATL" data-picture="/assets/football/falcons_image.png">Atlanta Falcons</option>\
        <option value="BAL" data-picture="/assets/football/ravens_image.png">Baltimore Ravens</option>\
        <option value="BUF" data-picture="/assets/football/bills_image.png">Buffalo Bills</option>\
        <option value="CAR" data-picture="/assets/football/panthers_image.png">Carolina Panthers</option>\
        <option value="CHI" data-picture="/assets/football/bears_image.png">Chicago Bears</option>\
        <option value="CIN" data-picture="/assets/football/bengals_image.png">Cincinnati Bengals</option>\
        <option value="CLE" data-picture="/assets/football/browns_image.png">Cleveland Browns</option>\
        <option value="DAL" data-picture="/assets/football/cowboys_image.png">Dallas Cowboys</option>\
        <option value="DEN" data-picture="/assets/football/broncos_image.png">Denver Broncos</option>\
        <option value="DET" data-picture="/assets/football/lions_image.png">Detroit Lions</option>\
        <option value="GB" data-picture="/assets/football/packers_image.png">Green Bay Packers</option>\
        <option value="HOU" data-picture="/assets/football/texans_image.png">Houston Texans</option>\
        <option value="IND" data-picture="/assets/football/colts_image.png">Indianapolis</option>\
        <option value="JAX" data-picture="/assets/football/jaguars_image.png">Jacksonville Jaguars</option>\
        <option value="KC" data-picture="/assets/football/chiefs_image.png">Kansas City Chiefs</option>\
        <option value="MIA" data-picture="/assets/football/dolphins_image.png">Miami Dolphins/option>\
        <option value="MIN" data-picture="/assets/football/vikings_image.png">Minnesota Vikings</option>\
        <option value="NE" data-picture="/assets/football/patriots_image.png">New England Patriots</option>\
        <option value="NO" data-picture="/assets/football/saints_image.png">New Orleans Saints</option>\
        <option value="NYG" data-picture="/assets/football/giants_image.png">New York Giants</option>\
        <option value="NYJ" data-picture="/assets/football/jets_image.png">New York Jets</option>\
        <option value="OAK" data-picture="/assets/football/raiders_image.png">Oakland Raiders</option>\
        <option value="PHI" data-picture="/assets/football/eagles_image.png">Philadelphia Eagles</option>\
        <option value="PIT" data-picture="/assets/football/steelers_image.png">Pittsburg Steelers</option>\
        <option value="SD" data-picture="/assets/football/chargers_image.png">San Diego Chargers</option>\
        <option value="SF" data-picture="/assets/football/49ers_image.png">San Francisco 49ers</option>\
        <option value="SEA" data-picture="/assets/football/seahawks_image.png">Seattle Seahawks</option>\
        <option value="STL" data-picture="/assets/football/rams_image.png">St. Louis Rams</option>\
        <option value="TB" data-picture="/assets/football/buccaneers_image.png">Tampa Bay Buccaneers</option>\
        <option value="TEN" data-picture="/assets/football/titans.png">Tennessee Titans</option>\
        <option value="WAS" data-picture="/assets/football/redskins_image.png">Washington Redskins</option>\
      </select>\
      <select class="ui search dropdown" id="NBA">\
      <option value="">NBA</option>\
      <option value="ATL" data-picture="/assets/basketball/hawks_image.png">Atlanta Hawks</option>\
      <option value="BOS" data-picture="/assets/basketball/celtics_image.png">Boston Celtics</option>\
      <option value="BRK" data-picture="/assets/basketball/nets_image.png">Brooklyn Nets</option>\
      <option value="CHA" data-picture="/assets/basketball/hornets_image.png">Charlotte Hornets</option>\
      <option value="CHI" data-picture="/assets/basketball/bulls_image.png">Chicago Bulls</option>\
      <option value="CLE" data-picture="/assets/basketball/cavaliers_image.png">Cleveland Cavaliers</option>\
      <option value="DAL" data-picture="/assets/basketball/mavericks_image.png">Dallas Mavericks</option>\
      <option value="DEN" data-picture="/assets/basketball/nuggets_image.png">Denver Nuggets</option>\
      <option value="DET" data-picture="/assets/basketball/pistons_image.png">Detroit Pistons</option>\
      <option value="GS" data-picture="/assets/basketball/warriors_image.png">Golden State Warriors</option>\
      <option value="HOU" data-picture="/assets/basketball/rockets_image.png">Houston Rockets</option>\
      <option value="IND" data-picture="/assets/basketball/pacers_image.png">Indiana Pacers</option>\
      <option value="LAC" data-picture="/assets/basketball/clippers_image.png">Los Angeles Clippers</option>\
      <option value="LAL" data-picture="/assets/basketball/lakers_image.png">Los Angeles Lakers</option>\
      <option value="MEM" data-picture="/assets/basketball/grizzlies_image.png">Memphis Grizzlies</option>\
      <option value="MIA" data-picture="/assets/basketball/heat_image.png">Miami Heat</option>\
      <option value="MIL" data-picture="/assets/basketball/bucks_image.png">Milwaukee Bucks</option>\
      <option value="MIN" data-picture="/assets/basketball/timberwolves_image.png">Minnesota Timberwolves</option>\
      <option value="NO" data-picture="/assets/basketball/pelicans_image.png">New Orleans Pelicans</option>\
      <option value="NYK" data-picture="/assets/basketball/knicks_image.png">New York Knicks</option>\
      <option value="OKC" data-picture="/assets/basketball/thunder_image.png">Oklahoma City Thunder</option>\
      <option value="ORL" data-picture="/assets/basketball/magic_image.png">Orlando Magic</option>\
      <option value="PHI" data-picture="/assets/basketball/76ers_image.png">Philadelphia 76ers</option>\
      <option value="PHO" data-picture="/assets/basketball/suns_image.png">Phoenix Suns</option>\
      <option value="POR" data-picture="/assets/basketball/trail_blazers_image.png">Portland Trail Blazers</option>\
      <option value="SAC" data-picture="/assets/basketball/kings_image.png">Sacramento Kings</option>\
      <option value="SA" data-picture="/assets/basketball/spurs_image.png">San Antonio Spurs</option>\
      <option value="TOR" data-picture="/assets/basketball/raptors_image.png">Toronto Raptors</option>\
      <option value="UT" data-picture="/assets/basketball/jazz_image.png">Utah Jazz</option>\
      <option value="WAS" data-picture="/assets/basketball/wizards_image.png">Washington Wizards</option>\
      </select>\
    </form>\
    <div class="team-list"></div>\
    <div id="submitBar" class="ui teal basic button">Suggest Bar</div>\
    </div>'
  )

  $('.ui.search.dropdown').dropdown();

  $('.ui.search.dropdown').on("change", function(){
    var imageSource = $(this).find('option:selected').data('picture')
    teams.push($(this).find('option:selected').text())
    console.log(teams)
    $(".team-list").append(
      '<img src="' + imageSource + '" style="width:2em; height:2em;">'
    )

  });
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

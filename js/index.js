$(document).ready(function () {
  var data1='';
  $("#search-btn").click(function () {
    var city = $("#city").val();
    console.log(city);
    $.ajax({
      url: `https://weatherapi-com.p.rapidapi.com/current.json?access_key=116f1754bcmsh2a307e567b1c65cp164f04jsn2fe74a2223fc/india&q=${city}`,
      type: "GET",
      headers: {
        "X-RapidAPI-Key": "116f1754bcmsh2a307e567b1c65cp164f04jsn2fe74a2223fc",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
      success: function (data) {
        if (data) {
          var temp_c =Math.round(data.current['temp_c']);
          var temp_f =Math.round(data.current['temp_f']);
          var wind_mph=Math.round(data.current['wind_mph']);
          var wind_kph=Math.round(data.current['wind_kph']);
          var wind_dir=data.current['wind_dir'];
          var humidity =data.current['humidity'];
          var updatetime=data.current['last_updated'];
          console.log(wind_mph)
          $(".name").text(data.location["name"]);
           data1 = `
                  <div class ="name">
                  <i class="fa fa-map-marker" aria-hidden="true"></i> ${data.location["name"]}
                  <p class="region-country">${data.location['region']} , ${data.location['country']}</p>
                  </div>
                  <div class="weather-img">
                    <img src=${data.current.condition['icon']}></img>
                    <p class="weather-msg">${data.current.condition['text']}</p>
                  </div>
                  <div class="temprature">
                   <h1 class="temp_c">${temp_c}<sup>°</sup>C </h1>
                   <h1 class="temp_f">${temp_f}<sup>°</sup>F </h1>
                  </div>
                  <ul class="other-data">
                  <li class="speed-data"><p class ="img-logo"><img src="img/wind-img.png"></p><p class="data-heading">Wind mph</p><span class="actual-data">${wind_mph}</span></li>
                  <li class="speed-data"><p class ="img-logo"><img src="weather-forecast/img/wind-img.png"></p><p class="data-heading">Wind kph</p><span class="actual-data">${wind_kph}</span></li>
                  <li class="speed-data"><p class ="img-logo"><img src="/img/directions-svgrepo-com.png"></p><p class="data-heading">Wind dir</p><span class="actual-data">${wind_dir}</span></li>
                  </ul>
                  <div class="footer-box">
                  <div class="speed-data">
                  <p class ="img-logo humidity"><img src="/img/water-drop-icon.png"></p><p class="data-heading">Humidity</p><span class="actual-data">${humidity}%</span>
                  </div>
                  <div class="box-1"><span>Last Update</span> <h3>${updatetime}</h3></div>
                  `;
          $(".main-box").html(data1);
          $(".result").css("display", "block");
        }
      },
      error: function (error) {
        console.log(error);
        var msg = "";
        if (error.status === 0) {
          msg = "Not connect.\n Verify Network.";
        } else if (
          error.responseText =='{"error":{"code":1003,"message":"Parameter q is missing."}}') {
          msg = "enter location 🧐";
        }
        else if(error.responseText== "{\"error\":{\"code\":1006,\"message\":\"No matching location found.\"}}")
         {
          msg="location not found☹️"
         }
        else if (error.status == 404) {
          msg = "Requested page not found. [404]";
        } else if (error.status == 500) {
          msg = "Internal Server Error [500].";
        } else {
          msg = "Uncaught Error.\n" + error.responseText;
        }
        $(".error").html(msg);
        $(".result").css("display", "block");
      },
    });
  });
  $(".cross-icon").click(function () {
    location.reload(true);
  });
});








// var settings = {
//   "url": "https://weatherapi-com.p.rapidapi.com/current.json?access_key=116f1754bcmsh2a307e567b1c65cp164f04jsn2fe74a2223fc&q=india",
//   "method": "GET",
//   "timeout": 0,
//   "headers": {
//     "X-RapidAPI-Key": "116f1754bcmsh2a307e567b1c65cp164f04jsn2fe74a2223fc",
//     "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response.location);
// });

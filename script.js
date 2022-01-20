$(document).ready(function () {
  var APIKey = "82ad17d25281f665f0ef2bd44088ca51";

  var m = moment();

  $(".time").text(m.format("hh:mm A")); //set current time
  $(".date").text(m.format("dddd MMMM DD YYYY")); //set current day

  //Set the default city to Brisbane//
  setDefaultCity();

  function setDefaultCity() {
    var url = `https:api.openweathermap.org/data/2.5/weather?q=Brisbane&units=metric&appid=${APIKey}`;
    $.get(url, function (data, status) {
      console.log(data);
      showWeatherData(data);
      showForecast();
    });
  }

  //Display the chosen city data//
  function showWeatherData(data) {
    var icon = data.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    var lat = data.coord.lat; //to use for the UVI below
    var lon = data.coord.lon; ///to use for the UVI below
    $(".w-icon").attr("src", iconURL);
    $("#city").text(data.name);
    $("#country").text(data.country);
    $("#temperatureSet").text(Math.round(data.main.temp) + " °C");
    $("#windSet").text(data.wind.speed + " m/s");
    $("#humiditySet").text(data.main.humidity + "  %");

    // get UVI///
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=82ad17d25281f665f0ef2bd44088ca51`
    )
      .then((res) => res.json())
      .then(function (uvData) {
        console.log(uvData);
        var uv = uvData.current.uvi;
        console.log(uv);
        // var uv = 6;
        $("#uvSet").text(uvData.current.uvi);
        //set colors for UV Index
        if (uv < 3) {
          $("#uvSet").css("background-color", "#37c849");
        } else if (uv > 2 && uv < 6) {
          $("#uvSet").css({ "background-color": "#d0c22f", color: "black" });
        } else if (uv > 5 && uv < 8) {
          $("#uvSet").css({ "background-color": "orange", color: "black" });
        } else if (uv > 7 && uv < 11) {
          $("#uvSet").css("background-color", "red");
        } else if (uv > 10) {
          $("#uvSet").css("background-color", "purple");
        }
      });
  }
});

function showForecast() {}

///To Do List/////
//set Default City Name and Country top right - where says must change ***DONE
//use data from default city to set temp/wind etc to current weather items **** DONE
//round temperature to nearest full degree. ***DONE
//colors for UVIndex
//use data from default city to set next 5 day to weather forecast items/weather card info
//update icons for 5 day forecast
//add event listener on search button to change data to new city
//localstorage to save previous searches to "search history"

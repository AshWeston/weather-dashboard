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
    $("#temperatureSet").text(data.main.temp + " °C");
    $("#windSet").text(data.wind.speed + " m/s");
    $("#humiditySet").text(data.main.humidity + "  %");

    // get UVI///

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=82ad17d25281f665f0ef2bd44088ca51`
    )
      .then((res) => res.json())
      .then(function (uvdata) {
        console.log(uvdata);
        $("#uvSet").text("uvi"); ////need to fix this line -this is wrong
      });
  }
});

function showForecast() {}

//`https://api.openweathermap.org/data/2.5/onecall?lat${lat}&lon${lon}&appid=${APIKey}`, https://api.openweathermap.org/data/2.5/uvi/forecast?appid=${APIKey}&lat=${lat}&lon=${lon}
//`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIKey}`,

///To Do List/////
//set Default City Name and Country top right - where says must change ***DONE
//use data from default city to set temp/wind etc to current weather items **** DONE
//use data from default city to set next 5 day to weather forecast items/weather card info
//update icons for 5 day forecast
//add event listener on search button to change data to new city
//localstorage to save previous searches to "search history"

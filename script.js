$(document).ready(function () {
  var APIKey = "82ad17d25281f665f0ef2bd44088ca51";

  var displayDate = moment();
  var forecast = document.querySelector("#weather-forecast");

  $(".time").text(displayDate.format("hh:mm A")); //set current time
  $(".date").text(displayDate.format("dddd MMMM DD YYYY")); //set current day

  //Set the default city to Brisbane//
  // setDefaultCity();

  // function setDefaultCity() {
  //   var defaultURL = `https:api.openweathermap.org/data/2.5/weather?q=Brisbane&units=metric&appid=${APIKey}`;
  //   $.get(defaultURL, function (data, status) {
  //     console.log(data);
  //     showWeatherData(data);
  //   });
  // }

  //event listener on search button
  $("#search-btn").click(function (event) {
    event.preventDefault();
    const searchCity = $("#search-input").val().trim();
    console.log(searchCity);
    var searchCityURL = `https:api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${APIKey}`;
    console.log(searchCityURL);
    forecast.innerHTML = "";
    $.ajax({
      method: "GET",
      url: searchCityURL,
    }).then(function (response) {
      var ul = $(`<ul id='${searchCity}'>${searchCity}</ul>`);
      ul.appendTo(".search-history");
      showWeatherData(response);
      localStorage.setItem("cities", JSON.stringify(searchCity));
    });
    localStorage.setItem("cities", JSON.stringify(searchCity));
    getLocalStorage();
  });

  function getLocalStorage() {
    var searchHistory = localStorage.getItem("cities");
    if (true) {
      console.log("it's working");
    }
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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${APIKey}`
    )
      .then((res) => res.json())
      .then(function (uvData) {
        console.log(uvData);
        var uv = uvData.current.uvi;
        console.log(uv);
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

        showForecast();
        function showForecast() {
          var city = data.name;
          var forecastArray = uvData.daily;
          console.log(city);
          console.log(forecastArray);
          for (var i = 1; i < 6; i++) {
            box = document.createElement("div");
            box.className = "col px-md-5";
            date = document.createElement("h5");
            var img = document.createElement("img");
            img.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" +
                uvData.daily[i].weather[0].icon +
                "@2x.png"
            );
            img.classList.add("row");
            futureForecast = document.createElement("ul");
            futureForecast.classList.add("row");
            futureTemp = document.createElement("li");
            futureWind = document.createElement("li");
            futureHumidity = document.createElement("li");
            nextdate = displayDate.add(1, "day");
            date.textContent = nextdate.format("dddd MMMM DD YYYY");
            futureTemp.textContent =
              "Temp: " + Math.round(uvData.daily[i].temp.day) + " °C";
            futureWind.textContent = `Wind: ${uvData.daily[i].wind_speed} m/s`;
            futureHumidity.textContent = `Humidity: ${uvData.daily[i].humidity} %`;
            forecast.appendChild(box);
            futureForecast.appendChild(futureTemp);
            futureForecast.appendChild(futureWind);
            futureForecast.appendChild(futureHumidity);
            box.appendChild(date);
            box.appendChild(img);
            box.appendChild(futureForecast);
          }
        }
      });
  }
});

///To Do List/////
//set Default City Name and Country top right - where says must change ***DONE
//use data from default city to set temp/wind etc to current weather items **** DONE
//round temperature to nearest full degree. ***DONE
//colors for UVIndex ** DONE
//use data from default city to set next 5 day to weather forecast items/weather card info ** DONE
//update icons for 5 day forecast ** DONE
//add event listener on search button to change data to new city
//localstorage to save previous searches to "search history"

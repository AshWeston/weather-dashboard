$(document).ready(function () {
  var APIKey = "82ad17d25281f665f0ef2bd44088ca51";
  var displayDate = moment();
  var forecast = document.querySelector("#weather-forecast");
  var cities = JSON.parse(window.localStorage.getItem("cities")) || [];

  $(".time").text(displayDate.format("hh:mm A")); //set current time
  $(".date").text(displayDate.format("dddd MMMM DD YYYY")); //set current day

  if (cities.length > 0) {
    var lastCity = cities[cities.length - 1];
    searchCity(lastCity);
    cities.forEach(function (city) {
      var button = $(
        `<button id='${city}' class='historyBox'>${city}</button>`
      );
      button.appendTo(".search-history");
    });
  }

  function searchCity(city) {
    var searchCityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    forecast.innerHTML = "";
    $.ajax({
      method: "GET",
      url: searchCityURL,
    }).then(function (response) {
      var button = $(
        `<button id='${city}' class='historyBox'>${city}</button>`
      );
      button.appendTo(".search-history");
      showWeatherData(response);
    });
    if (cities.indexOf(city) === -1) {
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }
  //event listener on search button
  $("#search-btn").click(function (event) {
    event.preventDefault();
    var city = $("#search-input").val().trim();
    searchCity(city);
    document.getElementById("search-input").value = "";
  });

  //event listener on search history
  $(".historyBox").click(function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
      city = element.innerText;
      searchCity(city);
      console.log(city);
    }
  });

  function getLocalStorage() {
    var searchHistory = localStorage.getItem("cities");
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
              "https://openweathermap.org/img/wn/" +
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

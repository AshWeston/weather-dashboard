$(document).ready(function () {
  var APIKey = "82ad17d25281f665f0ef2bd44088ca51";

  getWeatherData();

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;

      fetch(
        `https:api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${APIKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          showWeatherData(data);
          console.log(data);
        });
    });
  }

  function showWeatherData(data) {}
});

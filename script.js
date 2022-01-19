$(document).ready(function () {
  var APIKey = "82ad17d25281f665f0ef2bd44088ca51";

  $(".time").text("hello");
  $(".date").text(m.format("dddd MMMM DD YYYY")); //set current day

  //Set the default city to Brisbane//
  getWeatherData();

  function getWeatherData() {
    var url = `https:api.openweathermap.org/data/2.5/weather?q=Brisbane&units=metric&appid=${APIKey}`;
    $.get(url, function (data, status) {
      console.log(data);
    });
  }

  //Display the default city//
  showWeatherData();
  function showWeatherData(data) {
    $("#timezone").text("");
    $("#country").text("");
  }
});

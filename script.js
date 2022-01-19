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
      displayDataNew(data);
      fiveDayData(data.name);
    });
  }

  //Display the default city//
  showWeatherData();
  function showWeatherData(data) {
    // $("#timezone").text(""); //must change here
    // $("#country").text("");
  }

  function displayDataNew(data) {}

  function fiveDayData(data) {}
});

///To Do List/////
//set Default City Name and Country top right - where says must change
//use data from default city to set temp/wind etc to current weather items
//use data from default city to set next 5 day to weather forecast items/weather card info
//update icons for 5 day forecast
//add event listener on search button to change data to new city
//localstorage to save previous searches to "search history"


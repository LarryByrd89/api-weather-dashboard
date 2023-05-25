
var searchHistoryList = $('#search-history-list');
var searchCityInput = $("#search-city");
var searchCityButton = $("#search-city-button");
var clearHistoryButton = $("#clear-history");

var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var UVindex = $("#uv-index");

var weatherContent = $("#weather-content");

var APIkey = "23d68278b5b786d3d93337f17d67f78a";

var cityList = [];

var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");







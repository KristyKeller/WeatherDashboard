$(document).ready(function () {

  //function for button click
  $("#citySearch").on("click", function (event) {
    event.preventDefault();
    displayInputCurrentWeather();
    displayInput5DayForecast();
    var value = $(this).siblings("#city").val().toUpperCase();
    var city = $(this).parent().attr("id");
    localStorage.setItem(city, value);
    showRecent();
    displayHistory();
  });

  // local storage 
  var searchedCity = localStorage.getItem("searchTerm");
  $(".recentCities").text(searchedCity);

  //display weather via recent search
  function displayCurrentWeather() {
    var cityName = "Taylor";
    if (localStorage.getItem("searchTerm") !== null) {
      cityName = localStorage.getItem("searchTerm")
    }
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=63d971fb63a8453453f24fc684d7d368&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#currentWeather").empty();

      var currentWeather = $("#currentWeather").append($("<div class='currentWeather'>"));

      currentWeather.append($("<h2>")).text("Current Weather");
      var icon = response.weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      currentWeather.append(weatherImg);

      var city = response.name;
      var pOne = $("<p>").text("City: " + city);
      currentWeather.append(pOne);

      var date = moment.unix(response.dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      currentWeather.append(pTwo);

      var temperature = response.main.temp;
      var pThree = $("<p>").text("Temperature: " + temperature + "  \u2109");
      currentWeather.append(pThree);

      var humidity = response.main.humidity;
      var pFour = $("<p>").text("Humidity: " + humidity + "%");
      currentWeather.append(pFour);

      var windSpeed = response.wind.speed;
      var pFive = $("<p>").text("Wind Speed: " + windSpeed + " mph");
      currentWeather.append(pFive);

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var cityNameUV = $("#city").val().trim();
      if (localStorage.getItem("searchTerm") !== null) {
        cityNameUV = localStorage.getItem("searchTerm")
      }
      var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=63d971fb63a8453453f24fc684d7d368&units=imperial";

      $.ajax({
        url: queryURLUV,
        method: "GET"
      }).then(function (response) {

        var uvIndex = response.value;
        var pSix = $("<p>").text("UV Index: " + uvIndex);
        currentWeather.append(pSix);
      });
    });
  };

  //display current weather for default city on page load
  displayCurrentWeather();

  //displays current weather for user-input city
  function displayInputCurrentWeather() {
    var cityName = $("#city").val().trim();
    if (localStorage.getItem("searchTerm") !== null) {
      cityNameUV = localStorage.getItem("searchTerm")
    }
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=63d971fb63a8453453f24fc684d7d368&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#currentWeather").empty();

      var currentWeather = $("#currentWeather").append($("<div class='currentWeather'>"));

      currentWeather.append($("<h2>")).text("Current Weather");
      var icon = response.weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      currentWeather.append(weatherImg);

      var city = response.name;
      var pOne = $("<p>").text("City: " + city);
      currentWeather.append(pOne);

      var date = moment.unix(response.dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      currentWeather.append(pTwo);

      var temperature = response.main.temp;
      var pThree = $("<p>").text("Temperature: " + temperature + "  \u2109");
      currentWeather.append(pThree);

      var humidity = response.main.humidity;
      var pFour = $("<p>").text("Humidity: " + humidity + "%");
      currentWeather.append(pFour);

      var windSpeed = response.wind.speed;
      var pFive = $("<p>").text("Wind Speed: " + windSpeed + " mph");
      currentWeather.append(pFive);

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var cityNameUV = $("#city").val().trim();
      if (localStorage.getItem("searchTerm") !== null) {
        cityNameUV = localStorage.getItem("searchTerm")
      }
      var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=63d971fb63a8453453f24fc684d7d368";

      $.ajax({
        url: queryURLUV,
        method: "GET"
      }).then(function (response) {

        var uvIndex = response.value;
        var pSix = $("<p>").text("UV Index: " + uvIndex);
        currentWeather.append(pSix);
      });
    });

  };

  //displays 5-day forecast for default city 
  function display5DayForecast() {
    var cityName = "Taylor";
    if (localStorage.getItem("searchTerm") !== null) {
      cityName = localStorage.getItem("searchTerm")
    }
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&mode=json&units=imperial&appid=63d971fb63a8453453f24fc684d7d368";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      var date = moment.unix(response.list[0].dt).format("MM/DD/YYYY");
      var pOne = $("<p>").text("Date: " + date);
      $("#dayOne").append(pOne);

      var icon = response.list[3].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      $("#dayOne").append(weatherImg);

      var temperature = response.list[3].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      $("#dayOne").append(pThree);

      var humidity = response.list[3].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      $("#dayOne").append(pFour);

      date = moment.unix(response.list[8].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      $("#dayTwo").append(pTwo);

      var icon = response.list[11].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      $("#dayTwo").append(weatherImg);

      var temperature = response.list[11].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      $("#dayTwo").append(pThree);

      var humidity = response.list[11].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      $("#dayTwo").append(pFour);

      date = moment.unix(response.list[16].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      $("#dayThree").append(pTwo);

      var icon = response.list[19].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      $("#dayThree").append(weatherImg);

      var temperature = response.list[19].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      $("#dayThree").append(pThree);

      var humidity = response.list[19].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      $("#dayThree").append(pFour);

      date = moment.unix(response.list[24].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      $("#dayFour").append(pTwo);

      var icon = response.list[27].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      $("#dayFour").append(weatherImg);

      var temperature = response.list[27].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      $("#dayFour").append(pThree);

      var humidity = response.list[27].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      $("#dayFour").append(pFour);

      date = moment.unix(response.list[32].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      $("#dayFive").append(pTwo);

      var icon = response.list[35].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      $("#dayFive").append(weatherImg);

      var temperature = response.list[35].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      $("#dayFive").append(pThree);

      var humidity = response.list[35].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      $("#dayFive").append(pFour);

    });
  };

  //display 5-day forecast for default city on page load
  display5DayForecast();

  //display 5-day forecast for user-input city
  function displayInput5DayForecast() {
    var cityName = $("#city").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&mode=json&units=imperial&appid=63d971fb63a8453453f24fc684d7d368";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#forecastWeather").empty();

      var dayOneForecast = $("#forecastWeather").append($("<div class='dayOneWeather'>"));

      var date = moment.unix(response.list[0].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      dayOneForecast.append(pTwo);

      var icon = response.list[3].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      dayOneForecast.append(weatherImg);

      var temperature = response.list[3].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      dayOneForecast.append(pThree);

      var humidity = response.list[3].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      dayOneForecast.append(pFour);

      var dayTwoForecast = $("#forecastWeather").append($("<div class='dayTwoWeather'>"));

      date = moment.unix(response.list[8].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      dayTwoForecast.append(pTwo);

      var icon = response.list[11].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      dayTwoForecast.append(weatherImg);

      var temperature = response.list[11].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      dayTwoForecast.append(pThree);

      var humidity = response.list[11].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      dayTwoForecast.append(pFour);

      var dayThreeForecast = $("#forecastWeather").append($("<div class='dayThreeWeather'>"));

      date = moment.unix(response.list[16].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      dayThreeForecast.append(pTwo);

      var icon = response.list[19].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      dayThreeForecast.append(weatherImg);

      var temperature = response.list[19].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      dayThreeForecast.append(pThree);

      var humidity = response.list[19].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      dayThreeForecast.append(pFour);

      var dayFourForecast = $("#forecastWeather").append($("<div class='dayFourWeather'>"));

      date = moment.unix(response.list[24].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      dayFourForecast.append(pTwo);

      var icon = response.list[27].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      dayFourForecast.append(weatherImg);

      var temperature = response.list[27].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      dayFourForecast.append(pThree);

      var humidity = response.list[27].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      dayFourForecast.append(pFour);

      var dayFiveForecast = $("#forecastWeather").append($("<div class='dayFiveWeather'>"));

      date = moment.unix(response.list[32].dt).format("MM/DD/YYYY");
      var pTwo = $("<p>").text("Date: " + date);
      dayFiveForecast.append(pTwo);

      var icon = response.list[35].weather[0].icon;
      var weatherImg = $("<img>").attr("src", ("https://openweathermap.org/img/w/" + icon + ".png"));
      dayFiveForecast.append(weatherImg);

      var temperature = response.list[35].main.temp;
      var pThree = $("<p>").text("Temp. " + temperature + "  \u2109");
      dayFiveForecast.append(pThree);

      var humidity = response.list[35].main.humidity;
      var pFour = $("<p>").text("Humidity " + humidity + "%");
      dayFiveForecast.append(pFour);

    });
  };

  function showRecent() {
    if (localStorage.getItem("searchTerm")) {
      $(".recentCities").css("display", "block");
      $(".recentSearches").css("display", "block");
    }
  }
  showRecent();


  // recently searched cities
  function displayHistory() {
    $(".recentCities").prepend($("<div class='searchAgain'>")).prepend($("#city").val().toUpperCase().trim());
  };

  // previously searched city
  $(".searchAgain").on("click", function () {

  });

});  

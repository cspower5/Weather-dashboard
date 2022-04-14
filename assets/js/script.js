//Java script created by Christopher Borer
//April 9th 2022.
// node -r dotenv/config index.js;

//variables
var apiKey = "0c390c97a57230e6547b396d84ff33a8";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?";
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?"
var city = "";
// var uvIndex = {};
//Elements

//Data

//function to get city input from user.
$("#searchForm").submit(function (event) {
  event.preventDefault();
  city = $("#currentSearch").val();
  getCurrentWeather(city);
  document.getElementById("currentSearch").value = "";
});

//function to fetch data from weather api
var getCurrentWeather = function (city) {
  let getCurrentWeatherUrl =
    apiUrl + "?q=" + city + "&units=imperial" + "&appid=" + apiKey;
  //   console.log(getCurrentWeatherUrl);
  fetch(getCurrentWeatherUrl)
    .then((response) => {
      // console.log('status', response.status);
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      // do whatever you want with the JSON response
      responseHandler();
      renderCurrrentWeather(response);
      renderForecast(response);
    })
    .catch((error) => {
      // Handle the error
      errorHandler(error);
      console.error(error);
    });
};

//Write Current weather to the page
var renderCurrrentWeather = async function (response) {
  //set all the variables to be render to the current weather
  const name = response.name;
  const date = new Date(response.dt * 1000).toLocaleDateString();
  const icon = response.weather[0].icon;
  const temp = Math.round(response.main.temp);
  const wind = Math.round(response.wind.speed);
  const humidity = response.main.humidity;
  const uvIndex = await getUVIndex(response);
  //   console.log(temp, +wind, +humidity, uvIndex);
  document.querySelector(".currentWeather").innerHTML = `
        <h2>${name} ${date} <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
        <br>Temp: ${temp}
        <br> Wind: ${wind}
        <br> Humidity: ${humidity}
        <br> UVIndex:${uvIndex.current.uvi}
        </h2>
    `;
//   console.log(uvIndex.current);
};
//Get UV Index valaue
var getUVIndex = async function (response) {
  const lat = response.coord.lat;
  const lon = response.coord.lon;
  const uviUrl =
    oneCallUrl +
    "lat=" +
    lat +
    "&" +
    "lon=" +
    lon +
    "&exclude=hourly,daily,minutely,alerts" +
    "units=imperial" +
    "&appid=" +
    apiKey;
//   console.log(uviUrl);
  fetch(uviUrl);
  let data = await fetch(uviUrl);
  return await data.json();
};

var renderForecast = function(response) {
  const lat = response.coord.lat;
  const lon = response.coord.lon;
  const numDays = 5;
  const dailyUrl =
    forecastUrl +
    "lat=" +
    lat +
    "&" +
    "lon=" +
    lon +
    "&cnt=" + 
    numDays +
    "&units=imperial" +
    "&appid=" +
    apiKey;
    // console.log(response);
    console.log(dailyUrl);
    fetch(dailyUrl);
    let dailyData = fetch(dailyUrl);
    console.log(dailyData);


    for(i = 1; i <= 5; i++) {
    let day = "day" + i;
    console.log(day);
    }
}
var responseHandler = function () {
    document.querySelector(".verifyCity")?.remove();
  };
  //Handle display a message to input a valid city name
  var errorHandler = function (error) {
    if (error && document.getElementsByClassName("verifyCity").length === 0) {
      let verifyCityEl = document.createElement("h2");
      verifyCityEl.classList.add("verifyCity");
      verifyCityEl.textContent = "Please Enter a Valid City!!";
      document.querySelector("header").append(verifyCityEl);
    }
  };
//fuction to fetch index from api
//funciton fetch 5 day forcast from api

//function calls
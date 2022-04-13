//Java script created by Christopher Borer
//April 9th 2022.
// node -r dotenv/config index.js;

//variables
var apiKey = "0c390c97a57230e6547b396d84ff33a8";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?";
var city = "";
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
  let getCurrentWeatherUrl = apiUrl + "?q=" + city + "&appid=" + apiKey;
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
      //   console.log(response);
      renderCurrrentWeather(response);
    })
    .catch((error) => {
      // Handle the error
      errorHandler(error);
      console.error(error);
    });
};
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
//Write Current weather to the page
var renderCurrrentWeather = function (response) {
  //set all the variables to be render to the current weather
  const name = response.name;
  const date = new Date(response.dt * 1000).toLocaleDateString();
  const icon = response.weather[0].icon;
  const temp = Math.round(((response.main.temp - 273.15) * 9) / 5 + 32);
  const wind = Math.round(response.wind.speed * 2.236936);
  const humidity = response.main.humidity;
  const uvIndex = getUVIndex(response);
  console.log(temp, + wind, + humidity, uvIndex);
  document.querySelector(".currentWeather").innerHTML = `
        <h2>${name} ${date} <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
        <br>Temp: ${temp}
        <br> Wind: ${wind}
        <br> Humidity: ${humidity}
        <br> UVIndex:
        </h2>
    `;
};
//Get UV Index valaue
var getUVIndex = function (response) {
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
    "&appid=" +
    apiKey;
  console.log(uviUrl);
  fetch(uviUrl)
    .then((response) => {
      console.log("status", response.status);
      if (response.status >= 200 && response.status <= 299) {
        response.json();
        // return(response.current);
        console.log(response);
      } else {
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      // do whatever you want with the JSON response
      console.log(response);
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};
//fuction to fetch index from api
//funciton fetch 5 day forcast from api

//function calls

//Java script created by Christopher Borer
//April 9th 2022.
// node -r dotenv/config index.js;

//variables
var apiKey = "0c390c97a57230e6547b396d84ff33a8";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?";
var city = "";
var localStorageKey = "cityName";

//Elements
var btnEl = document.createElement("button");

//Data
var pastCities = [];
var limitCities = [];
 
//function to get city input from user.
$("#searchForm").submit(function (event) {
  event.preventDefault();
  city = $("#currentSearch").val();
  document.getElementById("currentSearch").value = "";
  getCurrentWeather(city);
  saveStorage(city);
});
// renderPastCities creates buttons of to submit past searcches;
var renderPastCities = function () {
  const pastCities = getStorage();
  document.querySelector(".pastCities").innerHTML = '';
  for (pastCity of pastCities) {
    let btnEl = document.createElement("button");
    btnEl.innerHTML = pastCity;
    btnEl.addEventListener("click", (event) => {
      event.preventDefault();
      getCurrentWeather(btnEl.textContent);
    });
    document.querySelector(".pastCities").appendChild(btnEl);
    
  }
};
//Pull the past searches from localStorage
function getStorage() {
    const pastCities = localStorage.getItem(localStorageKey);
    return JSON.parse(pastCities);

}
//Add searches to localStorage to be rendered to the screen
function saveStorage(city) {
  if (localStorage.getItem(localStorageKey) === null) {
    pastCities = [];
  } else {
    pastCities = JSON.parse(localStorage.getItem(localStorageKey));
  }
  if (!pastCities.includes(city.toUpperCase())) {
     pastCities.unshift(city.toUpperCase());
  }
  localStorage.setItem(localStorageKey, JSON.stringify(pastCities.slice(0,5)));
}
//function to fetch data from weather api
var getCurrentWeather = function (city) {
  let getCurrentWeatherUrl =
    apiUrl + "?q=" + city + "&units=imperial" + "&appid=" + apiKey;

  fetch(getCurrentWeatherUrl)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      // Calls functions
      responseHandler();
      renderCurrrentWeather(response);
      renderForecast(response);
      renderPastCities();
    })
    .catch((error) => {
      // Handle the error
      errorHandler(error);
    });
};

//Writes the Current weather to the page
var renderCurrrentWeather = async function (response) {
  //set all the variables to be render to the current weather
  const name = response.name;
  const date = new Date(response.dt * 1000).toLocaleDateString();
  const icon = response.weather[0].icon;
  const temp = Math.round(response.main.temp);
  const wind = Math.round(response.wind.speed);
  const humidity = response.main.humidity;
  const uvIndex = await getUVIndex(response);
  document.querySelector(".currentWeather").innerHTML = `
        <h2>${name} ${date} <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
        <br>Temp: ${temp}
        <br> Wind: ${wind}
        <br> Humidity: ${humidity}
        <br> UVIndex:${uvIndex.current.uvi}
        </h2>
    `;
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
  let data = await fetch(uviUrl);
  return await data.json();
};
//Show the 5 day forecast for the searched city
var renderForecast = async function (response) {
  const lat = response.coord.lat;
  const lon = response.coord.lon;
  const days = ["day-1", "day-2", "day-3", "day-4", "day-5"];
  const dailyUrl =
    // forecastUrl +
    oneCallUrl +
    "lat=" +
    lat +
    "&" +
    "lon=" +
    lon +
    "&exclude=hourly,minutely,alerts" +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(dailyUrl);
  let dailyData = await fetch(dailyUrl).then(function (res) {
    return res.json();
  });
  let i = 1;
  document.querySelector(".pastWeather").textContent = "";
  for (const day of days) {
    let date = new Date(dailyData.daily[i].dt * 1000).toLocaleDateString();
    let icon = dailyData.current.weather[0].icon;
    let temp = Math.round(dailyData.daily[i].temp.max);
    let wind = Math.round(dailyData.daily[i].wind_speed);
    let humidity = Math.round(dailyData.daily[i].humidity);
    let newDiv = document.createElement("div");
    newDiv.classList.add(day);
    newDiv.innerHTML = `<h4> Date:${date}
                        <br><img src="http://openweathermap.org/img/wn/${icon}.png">
                        <br>Temp:${temp}
                        <br>wind:${wind}
                        <br>Humidity:${humidity}
                      `;
    document.querySelector(".pastWeather").append(newDiv);
    i++;
  }
};
//Creates the element to print to the screen when a improper city name is entered
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
//Show the past searches on load
renderPastCities();
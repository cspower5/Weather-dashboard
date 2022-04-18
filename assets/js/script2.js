//Java script created by Christopher Borer
//April 9th 2022.
// node -r dotenv/config index.js;

//variables
var apiKey = "0c390c97a57230e6547b396d84ff33a8";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
var localStorageKey = "cityName";
var searchHistory = [];
//Elements
// var getCity = function(event) {
  var formEL = document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var city = document.getElementsByID("h2").textContent();
    console.log(city);
  
  });
};
//function to get city input from user.
// $("#searchForm").submit(function (event) {
//   event.preventDefault();
//   city = $("#currentSearch").val();
//   document.getElementById("currentSearch").value = "";
//   getCurrentWeather(city);
//   saveStorage(city);
//   console.log(city);
// });
// var searchCity = function() {
//   searchEl = d
//   console.log(searchEl);
//   submitEvt = document.getElementById("#searchForm").addEventListener("submit", function(event) {
//   event.preventDefault();
//   city = submitEvt.val();
//   console.log(city);
//   // document.getElementById("currentSearch").value = "";
//   console.log(city);
//   });
  
// }
// searchCity();

var renderPastCities = function () {
  const pastCities = getStorage();
  console.log(pastCities);
}

//function to fetch data from weather api
var getCurrentWeather = function (city) {
  let getCurrentWeatherUrl =
    apiUrl + "?q=" + city + "&units=imperial" + "&appid=" + apiKey;
  // console.log(getCurrentWeatherUrl);
  fetch(getCurrentWeatherUrl)
    .then(handleErrors)
    .then(function(response) {
    return response.json();
    }).catch(function(error) {
       console.log(error);
    });
    // .then((response) => {
    //   // console.log('status', response.status);
    //   if (response.status >= 200 && response.status <= 299) {
    //     return response.json();
    //   } else {
    //     throw Error(response.statusText);
    //   }
    // })
    // .then((response) => {
    //   // do whatever you want with the JSON response
       responseHandler();
       renderCurrrentWeather(response);
       renderForecast(response);
    //   console.log(response);
    // })
    // .catch((error) => {
    //   // Handle the error
    //   errorHandler(error);
    //   console.error(error);
    // });
};
var handleErrors = function (response) {

  if (!response.ok) {
    
  }
  return response;
}
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
  // console.log(response);
  fetch(dailyUrl);
  let dailyData = await fetch(dailyUrl).then(function (res) {
    // console.log(res.json());
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
    console.log(dailyData);
  }
};

function getStorage() {
  const pastCities = localStorage.getItem(localStorageKey);
  if (!pastCities) return [];
  return JSON.parse(pastCities);
}
function saveStorage(city) {
  searchHistory.push(city);
  localStorage.setItem(localStorageKey, JSON.stringify(searchHistory));
  console.log(searchHistory);
}

var responseHandler = function () {
  document.querySelector(".verifyCity")?.remove();
};



//fuction to fetch index from api
//funciton fetch 5 day forcast from api

//function calls

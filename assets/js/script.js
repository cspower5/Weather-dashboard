//Java script created by Christopher Borer
//April 9th 2022.
// node -r dotenv/config index.js;

//variables
var apiKey = "0c390c97a57230e6547b396d84ff33a8";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
//Elements
//Data

//function to get city input from user.
$("#searchBtn").submit(function() {
  var city = $("#currrentSearch").val();
  console.log(city);
  //Call to geet the current weather
  getCurrentWeather(city);
});

//function to fetch data from weather api.
var getCurrentWeather = function (city) {
  let getCurrentWeatherUrl = apiUrl + "?q=" + city + "&appid=" + apiKey;
  console.log(getCurrentWeatherUrl);
  fetch(getCurrentWeatherUrl)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
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
      console.log(error);
    });
};
//fuction to fetch index from api
//funciton fetch 5 day forcast from api

//function calls

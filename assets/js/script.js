//Java script created by Christopher Borer
//April 9th 2022.

//variables
var city = "Minneapolis";
var getCurrentWeatherUrl="https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=0c390c97a57230e6547b396d84ff33a8";
//Elements
//Data
//function to get city input from user.

//function to fetch data from weather api.
var getCurrentWeather = function () {
  //fetch(getCurrentWeatherUrl)
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=0c390c97a57230e6547b396d84ff33a8')
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      // do whatever you want with the JSON response
      .then(response) => console.log(response.statusText);
    }).catch((error) => {
      // Handle the error
      console.log(error);
    });
};
//fuction to fetch index from api
//funciton fetch 5 day forcast from api

//function calls
getCurrentWeather(city);

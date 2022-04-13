//Java script created by Christopher Borer
//April 9th 2022.
// node -r dotenv/config index.js;

//variables
var apiKey = "0c390c97a57230e6547b396d84ff33a8";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
var city = "";
//Elements


//Data

//function to get city input from user.
$("#searchForm").submit(function (event) {
  event.preventDefault();
  city = $("#currentSearch").val();
  getCurrentWeather(city);
  document.getElementById('currentSearch').value = "";
});

//function to fetch data from weather api
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
      responseHandler();
      console.log('this is my ' + response);
    })
    .catch((error) => {
      // Handle the error
      errorHandler(error);
      //   console.log(error);
    });
};
var responseHandler = function() {
    if(document.getElementsByClassName('verifyCity').length === 1) {
        let verifyCityEl = document.getElementsByClassName('verifyCity');
        console.log(verifyCityEl);
        verifyCityEl.remove(); 
    }
}

//Handle display a message to input a valid city name
var errorHandler = function (error) {
    if (error && document.getElementsByClassName('verifyCity').length === 0) {
    let verifyCityEl = document.createElement("h2");
    verifyCityEl.classList.add('verifyCity');
    verifyCityEl.textContent = "Please Enter a Valid City!!"
    document.querySelector('header').append(verifyCityEl);
  }

};

//fuction to fetch index from api
//funciton fetch 5 day forcast from api

//function calls


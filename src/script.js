// Current Temperature
function showTemperature(response) {
  farTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#currentTemp");
  let temperature = Math.round(farTemperature);
  let iconElement = document.querySelector("#icon");
  currentTemp.innerHTML = temperature;

  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Search for your City - Submit
function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("h1");
  city.innerHTML=`${searchInput.value}`;

  searchCity(`${searchInput.value}`);
}

// Find the City
function searchCity(city) {
  let apiKey = `60127c861398555d83daebe249ae66b4`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index= 0; index < 6; index++) {
  let forecast = response.data.list[index];
  forecastElement.innerHTML += `            
  <div class="col-2">
    <div class="card">
        <h5 class="card-img-top">
          ${formatHours(forecast.dt * 1000)}
        </h5>
    <div class="card-body">
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Sunny" class="card-title" />
        <p class="card-text">
          <strong>${Math.round(forecast.main.temp_max)}&#8457</strong>${Math.round(forecast.main.temp_min)}&#8457
        </p>
    </div>
    </div>
</div>
`;
  }  


}

function formatHours (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}



// Search Location - Coordinates
function searchLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `60127c861398555d83daebe249ae66b4`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

// Current Location 
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Celsius Temperature
function currentTempC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let celTemp = Math.round((farTemperature - 32) * 5/9);
  temperatureElement.innerHTML = celTemp;
}

// Far Temperature
function currentTempF(event) {
  event.preventDefault();
  let farTemp = document.querySelector(".temperature");
  farTemp.innerHTML = Math.round(farTemperature);
}

let now = new Date();
let currentDate = document.querySelector("#date");

  let days = [
    "Sunday", 
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];
  let hours =  now.getHours();
  let minutes = now.getMinutes();

currentDate.innerHTML=`${day} ${hours}:${minutes}`;

let farTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", currentTempC)

let far = document.querySelector("#far");
far.addEventListener("click", currentTempF);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

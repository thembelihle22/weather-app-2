function currentWeekDay(date) {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDay[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, Time: ${hours}:${minutes}`;
}

function weatherForecast(response) {
  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#h1");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#discription");
  conditionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = currentWeekDay(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon">`;

  getForecast(response.data.city);
}

function cityWeather(city) {
  let apiKey = "59tfe2c834300cb76dbcd14b56oa0baf";
  let api = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(api).then(weatherForecast);
}

function getForecast(city) {
  let apiKey = "59tfe2c834300cb76dbcd14b56oa0baf";
  let api = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(api).then(forecastDisplay);
}

function forecastDisplay(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = "";
  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `<li>
          ${days}
          <div class="weatherIcon">🌦️</div>
          <div><strong>19</strong>° 12°</div>
        </li>`;

    forecast.innerHTML = forecastHTML;
  });
}

function citySearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");

  cityWeather(searchInput.value);
}

let search = document.querySelector("#form-input");
search.addEventListener("submit", citySearchForm);

cityWeather("Durban");

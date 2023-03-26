const dateEl = document.getElementById("date");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Seppember",
  "October",
  "November",
  "December",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  dateEl.innerHTML = days[day] + ", " + months[month] + " " + date;
}, 1000);

let weather = {
  apiKey: "",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed, deg } = data.wind;
    console.log(name, icon, description, temp, humidity, speed, pressure, deg);
    document.querySelector(".city").innerText = name;

    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = parseInt(temp) + "°";
    document.querySelector(".pressure").innerText = pressure + "hPa";
    document.querySelector(".wind").innerText = speed + "km/h ";
    document.querySelector(".humidity").innerText = humidity + "% ";
    document.querySelector(".direction").innerText = deg + "°";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
weather.fetchWeather("Clanton");

const APIKey = '8652a6bb674d5365b4b3346bfd95a324';
const APIBase = 'https://api.openweathermap.org/data/2.5/';
const searchBtn = document.getElementById('searchBtn');
const city = document.getElementById('search-city');

function getWeather() {
    const requestUrl = `https://api.openweathermap.org/data/2.5/q=${city.value}&appid=${APIKey}`;

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        const currentConditions = $('#current-conditions');
        currentConditions.innerHTML = `
            <h3 id="city-name">${data.name}</h3>
            <p id="date">${new Date().toLocaleDateString()}</p>
            <p id="temperature">Temperature: ${data.main.temp} °C</p>
            <p id="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
            <p id="humidity">Humidity: ${data.main.humidity}%</p>
        `;
    })
}

searchBtn.addEventListener('click', getWeather)
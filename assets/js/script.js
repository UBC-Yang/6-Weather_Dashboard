const APIKey = '8652a6bb674d5365b4b3346bfd95a324';
const APIBase = 'https://api.openweathermap.org/data/2.5/';

const cityEl = document.getElementById('search-city');
const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const currentTempEl = document.getElementById('temperature');
const currentHumidityEl = document.getElementById('humidity');
const currentWindEl = document.getElementById('wind-speed');
const searchHistoryEl = document.getElementById('search-history');
const searchBtn = document.getElementById('search-button');
const clearBtn = document.getElementById('clear-button');

let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

function getWeather(cityName) {
    const requestUrl = `${APIBase}weather?q=${cityName}&appid=${APIKey}&units=imperial`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(response => {
            const currentDate = new Date(response.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            cityNameEl.innerHTML = `${response.name} (${month}/${day}/${year})`;
            const icon = response.weather[0].icon;
            weatherIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
            weatherIconEl.setAttribute('alt', response.weather[0].description);
            currentTempEl.innerHTML = `Temperature: ${response.main.temp} &#176F`;
            currentHumidityEl.innerHTML = `Humidity: ${response.main.humidity}%`;
            currentWindEl.innerHTML = `Wind Speed: ${response.wind.speed} MPH`;

            getForecast(response.id);
        });
}

function getForecast(cityID) {
    const forecastUrl = `${APIBase}forecast?id=${cityID}&appid=${APIKey}&units=imperial`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(response => {
            const forecasts = document.getElementById('forecasts-cards-container');
            forecasts.innerHTML = '';

            const currentDate = new Date();

            for (let i = 1; i<= 5; i++) {
                const forecast = response.list[i * 8 - 1];
                const forecastDate = new Date(forecast.dt * 1000);
                const day = forecastDate.getDate();
                const month = forecastDate.getMonth() + 1;
                const year = forecastDate.getFullYear();

                const forecastEl = document.createElement('div');
                forecastEl.classList.add('col-md-2', 'forecast', 'bg-dark', 'text-white', 'm-2', 'rounded');

                const forecastDateEl = document.createElement('p');
                forecastDateEl.classList.add('mt-3', 'mb-0', 'forecast-date');
                forecastDateEl.innerHTML = `${month}/${day}/${year}`;
                forecastEl.appendChild(forecastDateEl);

                const forecastIcon = document.createElement('img');
                forecastIcon.setAttribute('src', `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
                forecastIcon.setAttribute('alt', forecast.weather[0].description);
                forecastEl.appendChild(forecastIcon);

                const forecastTempEl = document.createElement('p');
                forecastTempEl.innerHTML = `Temp: ${forecast.main.temp} &#176F`;
                forecastEl.appendChild(forecastTempEl);

                const forecastWindEl = document.createElement('p');
                forecastWindEl.innerHTML = `Wind: ${forecast.wind.speed} MPH`;
                forecastEl.appendChild(forecastWindEl);

                const forecastHumidityEl = document.createElement('p');
                forecastHumidityEl.innerHTML = `Humidity: ${forecast.main.humidity}%`;
                forecastEl.appendChild(forecastHumidityEl);

                forecasts.appendChild(forecastEl);
            }
        });
}

function renderSearchHistory() {
    searchHistoryEl.innerHTML = '';
    searchHistory.forEach(city => {
        const historyItem = document.createElement('button');
        historyItem.classList.add('btn', 'btn-secondary', 'mt-2', 'd-block', 'w-100');
        historyItem.innerHTML = city;
        historyItem.addEventListener('click', () => {
            getWeather(city);
        });
        searchHistoryEl.appendChild(historyItem);
    });
}

searchBtn.addEventListener('click', () => {
    const searchCity = cityEl.value;
    getWeather(searchCity);
    if (!searchHistory.includes(searchCity)) {
        searchHistory.push(searchCity);
        localStorage.setItem('search', JSON.stringify(searchHistory));
        renderSearchHistory();
    }
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
    clearWeatherDisplay();
});

function showDiv() {
    document.getElementById('show').style.display = "block";
 }

renderSearchHistory();

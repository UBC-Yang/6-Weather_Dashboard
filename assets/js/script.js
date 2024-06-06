const APIKey = '8652a6bb674d5365b4b3346bfd95a324';
const APIBase = 'https://api.openweathermap.org/data/2.5/';

const cityEl = document.getElementById('search-city');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const currentTemp = document.getElementById('temperature');
const currentHumidity = document.getElementById('humidity');
const currentWind = document.getElementById('wind-speed');
const pastSearch = document.getElementById('search-history')
const searchBtn = document.getElementById('search-button');
const clearBtn = document.getElementById('clear-button');

let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

function getWeather (cityName) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            // Display current weather condition
            const currentDate = new Date(response.data);
            const day = currentDate.getDate();
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            cityName.innerHTML = response.data.name+ " (" + month + "/" + day + "/" + year + ") ";
            let icon = response.data.weather[0].icon;
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
            weatherIcon.setAttribute('alt', response.data.weather[0].description);
            currentTemp.innerHTML = "Temperature: " + response.data.main.temp + " &#176F";
            currentHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
        })

        // 5 day Forecast
        let cityID = response.data.id;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${APIKey}`;

        fetch(forecastUrl)
            .then(function(response) {
                const forecast = document.querySelectorAll('.forecast');
                for (i = 0; i < forecast.length; i++) {
                    forecast[i].innerHTML = "";
                    const forecastDate = new Date(response.data.list[forecastIndex].dt);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth();
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecast[i].append(forecastDateEl);
                }
            })

}

// Store History
searchBtn.addEventListener('click', function() {
    const searchCity = cityEl.value;
    getWeather(searchCity);
    searchHistory.push(searchCity);
    localStorage.setItem('search', JSON.stringify(searchHistory));
    renderSearchHistory();
})

// Clear History
clearBtn.addEventListener('click', function() {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
})
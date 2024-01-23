const apiKey = 'b9c947de9f629d9acfacc30e0d7a2b0d';
let unit = 'metric'; // Default unit is Celsius

document.addEventListener('DOMContentLoaded', () => {
    // Get weather for the user's current location by default
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        }, error => {
            console.error(`Geolocation error: ${error.message}`);
        });
    }
});

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`City not found: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => displayWeather(data))
            .catch(error => console.error(`Error: ${error.message}`));
    }
}

function getWeatherByCoords(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => console.error(`Error: ${error.message}`));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} ${unit === 'metric' ? '°C' : '°F'}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

function toggleUnit() {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    // Refresh weather data with the new unit
    getWeather();
}

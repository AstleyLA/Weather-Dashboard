const apiKey = '34c6001ea504ad28bc03b8736e8ef5e1';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const submitButton = document.getElementById('submitButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherIconElement = document.getElementById('weatherIcon');
const weatherConditionElement = document.getElementById('weatherCondition');

// event listener for clicking submit button
submitButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

// event listener for hitting the enter key
locationInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchWeather(locationInput.value);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;


// if request not successful, show error
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('City not found.');
        }
        return response.json();
    })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Get the weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIconElement.src = iconUrl;
            weatherIconElement.alt = data.weather[0].description;
            // remove hidden so the weather icon is shows after a city is searched
            weatherIconElement.classList.remove('hidden');
            weatherConditionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // check if the error message is "City not found." and tell this user this 
            if (error.message === 'City not found.') {
                window.alert('City not found. Please check the spelling or try another city.');
            // if a different error, display general error message
            } else {
                window.alert('Something went wrong. Please try again later.');
            }
        });
}
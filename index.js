const API_KEY = '3f4fcd2de2027ae1e3d091e175fcae70';

const refs = {
    weatherBlock: document.querySelector('.container'),
};


function loadingWeather() {
    refs.weatherBlock.innerHTML = `<div class='weather-info'><div class='loading-img-wrapper'><img src='./images/loading-img.gif' alt='Loading'></div></div>`
};

// loadingWeather();


async function fetchWeatherInfo() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vinnytsia&appid=${API_KEY}&units=metric`);
    const weatherInfo = await response.json();
    return weatherInfo;
    
};

fetchWeatherInfo()
    .then(weatherInfo => {
        renderWeather(weatherInfo);
    })
    .catch(error => {
        loadingWeather();
    });

function renderWeather(data) {
    const city = data.name;
    const temp = Math.round(data.main.temp);
    const tempFeelsLike = Math.round(data.main.feels_like);
    const clouds = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;
console.log(data)
    const markup = `<div class="wrapper">
    <div class="weather-info">
        <p class="city">${city}</p>
        <p class="clouds">${clouds}</p>
        <p class="temperature">${temp}&deg;</p>
        <p class="feels-like">Feels like ${tempFeelsLike}&deg;</p>
        </div>
        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather" class="weather-image" width="200" height="200">
    </div>`;
    refs.weatherBlock.insertAdjacentHTML('beforeend', markup);
}
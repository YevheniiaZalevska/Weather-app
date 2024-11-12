

const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error');
const cityName = document.querySelector('h2.city-name');
const weatherImg = document.querySelector('img.weather-img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelsLike = document.querySelector('span.feels-like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind-speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');
const pollutionImg = document.querySelector('img.pollution-img');
const pm25 = document.querySelector('p.pollution-value');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=2dbc7632fbfe2a2c4dc8a85c71f953a8';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeatherInfo() {
    const apiCity = input.value;
    const apiURL = `${apiLink}${apiCity}${apiKey}${apiUnits}${apiLang}`;

    axios.get(apiURL).then((response) => {
        console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.floor(response.data.main.temp)}°C`;
        description.textContent = `${response.data.weather[0].description}`;
        description.classList.add('description_color');
        feelsLike.textContent = `${Math.floor(response.data.main.feels_like)}°C`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        windSpeed.textContent = `${Math.floor(response.data.wind.speed * 3.6)} km/h`;
        clouds.textContent = `${response.data.clouds.all} %`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        errorMsg.textContent = '';

        //air pollution api
        const airPollutionApi = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${apiKey}`;

        axios.get(airPollutionApi).then((res) => {
            console.log(res.data.list)
            pm25.textContent = `${res.data.list[0].components.pm2_5}`;

            const pm25Value = res.data.list[0].components.pm2_5;
            console.log(pm25Value);

            if (pm25Value < 10) {
                pollutionImg.style.backgroundColor = 'green';
            } else if (pm25Value >= 10 && pm25Value < 25) {
                pollutionImg.style.backgroundColor = 'yellowgreen';
            } else if (pm25Value >= 20 && pm25Value < 50) {
                pollutionImg.style.backgroundColor = 'yellow';
            } else if (pm25Value >= 50 && pm25Value < 75) {
                pollutionImg.style.backgroundColor = 'orange';
            } else {
                pollutionImg.style.backgroundColor = 'red';
            }
        })

    }).catch((error) => {
        // console.log(error.response);

        errorMsg.textContent = `${error.response.data.message}`;
        [cityName, temp, description, feelsLike, pressure, humidity, windSpeed, clouds, visibility, pm25].forEach((element) => {
            element.textContent = '';
        })
        weatherImg.src = '';
        description.classList.remove('description_color');
        pollutionImg.style.backgroundColor = 'transparent';

    }).finally(() => {
        input.value = '';
    })
}

const getWeatherInfoByEnter = (e) => {
    if (e.key === 'Enter') {
        getWeatherInfo();
    }
}

input.addEventListener('keydown', getWeatherInfoByEnter);
button.addEventListener('click', getWeatherInfo);
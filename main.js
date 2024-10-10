const button = dcument.querySelector('button');
const errorMsg = dcument.querySelector('p.error');
const temp = dcument.querySelector('p.temp');
const cityName = dcument.querySelector('h2.city-name');
const weatherImg = dcument.querySelector('img.wether-img');
const descr = dcument.querySelector('p.descr');
const temperatura = dcument.querySelector('span.temperatura');
const pressure = dcument.querySelector('span.perssure');
const humidity = dcument.querySelector('span.humidity');
const windSpeed = dcument.querySelector('span.wind-speed');
const clouds = dcument.querySelector('span.clouds');
const visibility = dcument.querySelector('span.visibility');
const pollutionImg = dcument.querySelector('img.pollution.img');
const mp25 = dcument.querySelector('p.pollution-value');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=2dbc7632fbfe2a2c4dc8a85c71f953a8';
const apiUnits = '&units=metric';
const apiLang ='&lang=pl';
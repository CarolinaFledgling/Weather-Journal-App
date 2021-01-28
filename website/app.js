// Global Variables

const inputZipCode = document.querySelector('.holder__input');
const btn = document.querySelector('.btn');
const descriptionTextarea = document.querySelector('.holder__textarea');
const temperature = document.getElementById('temp');
const date = document.getElementById('date');
const city = document.getElementById('content');
const weather = document.getElementById('weather');
const describeAnswer = document.getElementById('describe');
const photo = document.querySelector('.entry__photo')


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// API openWeather.org

const apiLink = 'api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '5bb278a6a7c5f285bd3b3bfd9852892a';
const units = '&units=metric';

let zipCode;
let url;


// Function to get info about Weather 

const getWeather = () => {
    zipCode = inputZipCode.value;
    let describeFeelings = descriptionTextarea.value;
    describeAnswer.textContent = 'Your answered :' + describeFeelings;
    console.log(zipCode, describeAnswer)

    if (zipCode === '') {
        return console.log('there is no zip code')
    }
    url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}${units}`;

    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            const temp = res.main.temp;
            const cityName = res.name;
            const statusWeather = Object.assign({}, ...res.weather);
            const weatherDes = statusWeather.main;
            console.log(temp, cityName, weatherDes)
            temperature.textContent = Math.floor(temp) + ' ℃';
            city.textContent = cityName;
            date.textContent = newDate;
            weather.textContent = weatherDes;

            // adjust the display picture according to the weather status https://openweathermap.org/weather-conditions
            if (statusWeather.id >= 200 && statusWeather.id < 300) {
                photo.setAttribute('src', './img/thunderstorm.png');
            } else if (statusWeather.id >= 300 && statusWeather.id < 400) {
                photo.setAttribute('src', './img/drizzle.png');
            } else if (statusWeather.id >= 500 && statusWeather.id < 600) {
                photo.setAttribute('src', './img/rain.png');
            } else if (statusWeather.id >= 600 && statusWeather.id < 700) {
                photo.setAttribute('src', './img/ice.png');
            } else if (statusWeather.id >= 700 && statusWeather.id < 800) {
                photo.setAttribute('src', './img/fog.png');
            } else if (statusWeather.id === 800) {
                photo.setAttribute('src', './img/sun.png');
            } else if (statusWeather.id > 800 && statusWeather.id < 900) {
                photo.setAttribute('src', './img/cloud.png');
            } else {
                photo.setAttribute('src', './img/unknown.png');
            }
        })
        .catch(error => console.log(error));

}

btn.addEventListener('click', getWeather)
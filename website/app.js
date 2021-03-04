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
const warning = document.querySelector('.warning')


let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// API openWeather.org

const apiLink = 'api.openweathermap.org/data/2.5/weather?q=';
const apiKey = `***************`;
const units = '&units=metric';

// Function to get info about Weather 

const getWeather = () => {
    const zipCode = inputZipCode.value;
    const describeFeelings = descriptionTextarea.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}${units}`;

    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            const temp = res.main.temp;
            const cityName = res.name;
            const statusWeather = Object.assign({}, ...res.weather); // Object.assign this method is used to copy one or more source objects to a target object
            const weatherDes = statusWeather.main;
            console.log(temp, cityName, weatherDes)
            const tempFloor = Math.floor(temp)
            city.textContent = cityName;
            weather.textContent = weatherDes;
            postData('/add', {
                temperature: tempFloor,
                date: newDate,
                describeAnswer: describeFeelings,
            }).then((res) => {
                const responeJson = res.json();
                return responeJson
            }).then((json) => {
                console.log(json)
                updateUI();
            })

            inputZipCode.value = '';

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
        .catch(() => {
            if (zipCode === '') {
                warning.textContent = 'Please enter a valid zip code'
                return console.log('there is no zip code')
            }
        })

    warning.textContent = '';
}
// Function post date to my server 

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin', //usunac 
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data) // need to be change for JSON , because of 'Content-Type': "application/json"
    });
};

//  Function updateUI

const updateUI = () => {
    fetch('/all')
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            date.innerHTML = json.date;
            temperature.innerHTML = json.temperature + ' °C';
            describeAnswer.innerHTML = 'Your answered: ' + json.describeAnswer;
        })
}

btn.addEventListener('click', getWeather)
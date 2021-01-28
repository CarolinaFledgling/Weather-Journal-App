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
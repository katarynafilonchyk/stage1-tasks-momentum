
const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const input = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next.slider-icon');
const slidePrev = document.querySelector('.slide-prev.slider-icon');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');


let randomNum = getRandomNum(1, 20);
let bgNum;
let bgNum1;
const MORNING = 'morning'
const AMOUNT_SLIDER = 20


showData()
setBg()

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showGreeting()
    setTimeout(showTime, 1000)
}

showTime()

function showData() {   
    const date = new Date(); 
    const options = {weekday: 'long', month: 'long', day: 'numeric',};
    const currentDate = date.toLocaleDateString('en-US', options);    
    data.textContent = currentDate;
    setTimeout(showData, 1000)
}

function showGreeting()  {    
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText
} 

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if(hours >= 6 && hours < 12){
        return MORNING
    } else if(hours >= 12 && hours < 18) {
        return 'afternoon'
    } else if(hours >= 18 && hours < 24) {
        console.log (hours)
        return 'evening'
    } else if(hours = 24 || hours < 6) {
        return 'night'
    }
}

// function setLocalStorage() {
//     localStorage.setItem('name', input.value);
//   }
//   window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      input.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;   
  }
  
function setBg() {    
    const timeOfDay = getTimeOfDay();
    let bgNum = String(randomNum).padStart(2, "0");
    const img = new Image();
    img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/' + timeOfDay + '/' + bgNum + '.jpg';
    img.onload = () => {      
    document.body.style.backgroundImage = "url" + '(' + img.src + ')'
    }

}
 function getSlideNext() {
    if(randomNum > 0 && randomNum < AMOUNT_SLIDER) {
        randomNum = randomNum + 1
    } else if(randomNum === AMOUNT_SLIDER) {
        randomNum = 1
    }
  setBg()
 }

 function getSlidePrev() {
    if(randomNum > 1 && randomNum <= AMOUNT_SLIDER) {
        randomNum = randomNum - 1
    } else if(randomNum === 1) {
        randomNum = 20
    }
  setBg()
 }
 
 slideNext.addEventListener('click', getSlideNext);
 slidePrev.addEventListener('click', getSlidePrev);




 async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=88203d78370013019dafebd989e151ed&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = 'Wind speed: ' + Math.round(data.wind.speed) + ' m/s';
    humidity.textContent = 'Humidity: ' + data.main.humidity + ' %';
  }

  function setLocalStorageСity() {
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload', setLocalStorageСity)

 function getLocalStorageСity() {
    if(localStorage.getItem('city')) {
       city.value = localStorage.getItem('city');
     } else {
         city.value = 'Minsk';  
     }
     getWeather()
  }
   window.addEventListener('load', getLocalStorageСity)

  
  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }
  
  document.addEventListener('DOMContentLoaded', getLocalStorageСity);
  city.addEventListener('keypress', setCity);
  city.addEventListener('change', getWeather);

  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const changeQuote = document.querySelector('.change-quote')

  function getRandomQuotes(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;   
  }

  async function getQuotes() {  
    const getRandomNumQuotes = getRandomQuotes(1, 1643);
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    quote.textContent = '"' + data[getRandomNumQuotes].text + '"'
    author.textContent = data[getRandomNumQuotes].author
  }
  getQuotes();

  changeQuote.addEventListener('click', getQuotes);

  


 
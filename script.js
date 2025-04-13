console.log("Welcome to the weather forecast app using open weather api");
console.log("This is an open source project for learning purpose .");

let api_key = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + api_key;
let city = document.querySelector('.text-img');
let form = document.querySelector("form");
let temperature = document.querySelector('.cloud-img');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('city');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let wind_speed = document.getElementById('wind-speed');
let visibility = document.getElementById('visibility');
let dew_point = document.getElementById('dew-point');
let main = document.querySelector('main');

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (valueSearch.value != '') {
        searchweather();
    }
});

const searchweather=()=>{
    fetch(url+'&q='+ valueSearch.value)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            if (data.cod==200) {
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
                wind_speed.innerText = data.wind.speed;
                visibility.innerText = (data.visibility / 1000).toFixed(1); 
                const dewPoint = calculateDewPoint(data.main.temp,data.main.humidity);
                dew_point.innerText=`${dewPoint}°C`;
            }else{
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
}

document.addEventListener("DOMContentLoaded", () => {
    valueSearch.value = "Jharkhand"; // Default city name
    searchweather(); // Fetch weather for default city
});


function calculateDewPoint(temperature, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint.toFixed(2);  // Return dew point rounded to 2 decimal places
}

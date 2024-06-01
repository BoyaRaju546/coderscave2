document.getElementById('city').addEventListener('input',function(){

var city = this.value;
getweather(city);
});

async function getweather() {
    try {
        var city = document.getElementById('city').value;
        console.log('Sahar adi:', city);
        
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                appid: '54a57bc234ad752a4f59e59cd372201d',
                units: 'metric'
            },
        });
        const currentTemperature = response.data.list[0].main.temp;
        
        document.querySelector('.weather-temp').textContent = Math.round(currentTemperature) + '°C';
        
        const forecastData = response.data.list;
        
        const dailyForecast = {};
        forecastData.forEach((data) => {
            const day = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_mах,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    icon: data.weather[0].icon,
                };
            } else {
                dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, data.main.temp_min);
                dailyForecast[day].maxTemp = Math.max(dailyforecast[day].maxTemp, data.main.temp_max);
            }
        });
        
        document.querySelector('.date-dayname').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        
        const date = new Date().toUTCString();
        const extractedDateTime = date.slice(5, 16);
        document.querySelector('date-day').textContent = extractedDateline.toLocalestring('en-us');
        
        const currentweatherIconCode = dailyForecast[new Date().toLocaleDateString('en-US', {weekday: 'long'})].icon;
        const weatherIconElement = document.querySelector('.weather-icon');
        weatherIconElement.innerHTML = getweatherIcon(currentweatherIconCode);
        
        document.querySelector('location').textContent = response.data.city.name;
        document.querySelector('weather-desc').textContent = dailyforecast[new Date().toLocaleDateString('en-US', { weekday: 'long'})].day;
        
        document.querySelector('humidity.value').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].humidity;
        document.querySelector('wind.value').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].windSpeed;

        
        const dayElements = document.querySelectorAll('.day-name');
        const tempElements = document.querySelectorAll('.day-temp');
        const iconElements = document.querySelectorAll('.day-icon');
        
        dayElements.forEach((dayElement, index) => {
            const day = Object.keys(dailyForecast) [index];
            const data = dailyForecast [day];
            dayElement.textContent = day;
            tempElements[index].textContent `${Math.round(data.minTemp)}° / ${Math.round(data.maxTemp)}°`;    
            iconElements[index].innerHTML = getweatherIcon(data.icon);
        });
    } catch (error) {
        console.error('Məlumat alsharkən səhv baş verdi:', error.message);
    }
}
function getweatherIcon(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconsize = '@2x.png';
    return `<img src="${iconBasetUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}
document.addEventListener("DOMContentLoaded", function () {
    getweather();
    setInterval(getweather, 900000);
});
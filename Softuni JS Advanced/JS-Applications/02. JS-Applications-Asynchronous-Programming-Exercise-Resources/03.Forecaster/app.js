function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
    console.log("TODO...");
}

async function getWeather(){
    const input = document.getElementById('location').value;
    const forecastSection = document.getElementById('forecast');
    const data = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
    if (data.status != 200){
        return;
    }
    const json = await data.json();
    ''.localeCompare('',)

    for (let obj of json){
        if (obj.name.toLowerCase().localeCompare(input.toLowerCase()) == 0){
            getCurrentWeather(obj.code);
            getThreeDayForecast(obj.code);
            forecastSection.style.display = 'block';
            return;
        }
    }
    const current = document.getElementById('current');
    current.children[0].textContent = 'Error';
    const upcoming = document.getElementById('upcoming');
    upcoming.children[0].textContent = 'Error';
    forecastSection.style.display = 'block';


}

async function getCurrentWeather(locationCode){
    const obj = {
        sunny: '☀',
        'partly sunny':'⛅',
        overcast: '☁',
        rain: '☂',
    }
    const data = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`);
    const json = await data.json();
    
    const current = document.getElementById('current');
    const spanLabel = current.children[0];
    spanLabel.textContent = 'Current conditions';
    current.replaceChildren(spanLabel);
    const forecast = json.forecast;
    const forecastDiv = document.createElement('div');
    forecastDiv.className = 'forecasts';

    forecastDiv.innerHTML = `<span class="condition symbol">${obj[forecast.condition.toLowerCase()]}</span>
<span class="condition">
    <span class="forecast-data">${json.name}</span>
    <span class="forecast-data">${forecast.low}°/${forecast.high}°</span>
    <span class="forecast-data">${forecast.condition}</span>
</span>`
    current.appendChild(forecastDiv);
}

async function getThreeDayForecast(locationCode){
    const obj = {
        sunny: '☀',
        'partly sunny':'⛅',
        overcast: '☁',
        rain: '☂',
    }
    const data = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`);
    const json = await data.json();
    
    const upcomingDiv = document.getElementById('upcoming');
    const spanLabel = upcomingDiv.children[0];
    spanLabel.textContent = 'Three-day forecast';
    upcomingDiv.replaceChildren(spanLabel);

    const forecasts = json.forecast;
    const forecastInfoDiv = document.createElement('div');
    forecastInfoDiv.className = 'forecast-info';

    for(let forecast of forecasts){
        const upcomingSpan = document.createElement('span');
        upcomingSpan.className = 'upcoming';
        upcomingSpan.innerHTML = `<span class="symbol">${obj[forecast.condition.toLowerCase()]}</span>
        <span class="forecast-data">${forecast.low}°/${forecast.high}°</span>
        <span class="forecast-data">${forecast.condition}</span>`;
        forecastInfoDiv.appendChild(upcomingSpan);
    }

    upcomingDiv.appendChild(forecastInfoDiv);

}

attachEvents();
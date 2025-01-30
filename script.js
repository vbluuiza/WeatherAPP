const apiKey = "0c8e0a9f2dbf5ae9e1c6f031dd876802";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const weatherElement = document.querySelector(".weather");
const ErrorElement = document.querySelector(".error");

function showWeather() {
    weatherElement.style.display = "block";
}

function hideWeather() {
    weatherElement.style.transition = "none";
    weatherElement.style.opacity = 0;
    weatherElement.style.display = "none";
}

async function checkWeather(city) {
    const informacaoTempo = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (informacaoTempo.status === 404) {
        console.log("City not found. Try again.");
        ErrorElement.style.display = "block";
        hideWeather();
    } 
    
    else {
        let dados = await informacaoTempo.json();

        document.querySelector(".city").innerHTML = dados.name;
        document.querySelector(".temp").innerHTML = Math.round(dados.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = dados.main.humidity + "%";
        document.querySelector(".wind").innerHTML = dados.wind.speed + " km/h";
    
        if (dados.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.webp";
        }
        else if (dados.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.webp";
        }
        else if (dados.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.webp";
        }
        else if (dados.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.webp";
        }
        else if (dados.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.webp";
        }
    
        showWeather();
        ErrorElement.style.display = "none";
    }
}
searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
})


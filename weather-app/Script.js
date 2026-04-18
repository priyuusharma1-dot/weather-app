const apiKey = "3a3618cede43b26e5166cff1335b8e50";

const searchInput = document.getElementById("search");
const weatherDiv = document.getElementById("weather");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

let timeout;

// Debounce
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch Weather
async function getWeather(city) {
    if (!city) return;

    city = city.trim();

    loading.style.display = "block";
    errorDiv.innerText = "";
    weatherDiv.innerHTML = "";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

        console.log("API URL:", url); // DEBUG

        const response = await fetch(url);

        const data = await response.json();

        console.log(data); // DEBUG

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        weatherDiv.innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡 Temp: ${data.main.temp}°C</p>
            <p>🌥 ${data.weather[0].description}</p>
        `;
    } catch (error) {
        errorDiv.innerText = error.message;
    } finally {
        loading.style.display = "none";
    }
}

// Debounced input
const handleSearch = debounce((e) => {
    getWeather(e.target.value);
}, 500);

searchInput.addEventListener("input", handleSearch);
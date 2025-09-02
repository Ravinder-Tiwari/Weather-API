const apikey = "919df66aabd9fa12492b19a8d5653c5a";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchinput = document.querySelector(".search_button input");
const searchbtn = document.querySelector(".search_button button");
const sky = document.querySelector(".weathericon");
const spinner = document.querySelector(".spinner");
const mainWeather = document.querySelector(".main_weather");
const errorBox = document.querySelector(".error");

async function checkweather(city) {
    if (!city) {
        mainWeather.style.display = "none";
        errorBox.style.display = "none";
        return;
    }

    try {
        spinner.style.display = "block";
        mainWeather.style.display = "none";
        errorBox.style.display = "none";

        
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(apiurl + encodeURIComponent(city) + `&appid=${apikey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".h_percentage").textContent = data.main.humidity + "%";
        document.querySelector(".w_percentage").textContent = Math.round(data.wind.speed) + " km/h";

     
        const weatherType = data.weather[0].main;
        switch (weatherType) {
            case "Clouds":
                sky.src = "images/clouds.png";
                break;
            case "Clear":
                sky.src = "images/clear.png";
                break;
            case "Rain":
                sky.src = "images/rain.png";
                break;
            case "Drizzle":
                sky.src = "images/drizzle.png";
                break;
            case "Mist":
                sky.src = "images/mist.png";
                break;
            default:
                sky.src = "images/default.png"; // fallback image
        }

        mainWeather.style.display = "block";
        errorBox.style.display = "none";
    } catch (error) {
        console.error("Fetch failed:", error);
        mainWeather.style.display = "none";
        errorBox.style.display = "block";
    } finally {
        // 🔹 Always hide spinner after loading is done
        spinner.style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchinput.value.trim());
    searchinput.value = "";
});

searchinput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkweather(searchinput.value.trim());
        searchinput.value = "";
    }
});

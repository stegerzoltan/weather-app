const BACKEND_URL = "/api/weather";

function showError(message) {
  const el = document.getElementById("error-message");
  el.textContent = message;
  el.classList.add("active");
}

function clearError() {
  const el = document.getElementById("error-message");
  el.textContent = "";
  el.classList.remove("active");
}

function showWeather(data) {
  clearError();
  document.getElementById("weather-display").classList.remove("hidden");
  document.getElementById("temperature").textContent = Math.round(
    data.main.temp
  );
  document.getElementById("city-name").textContent = `${data.name}, ${
    data.sys?.country || ""
  }`;
  document.getElementById("description").textContent =
    data.weather?.[0]?.description || "";
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind-speed").textContent = data.wind.speed;
  document.getElementById("pressure").textContent = data.main.pressure;

  const iconCode = data.weather?.[0]?.icon;
  if (iconCode) {
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").alt = data.weather[0].description;
  }
}

async function getWeather(city) {
  if (!city) {
    showError("Kérlek adj meg egy városnevet.");
    return;
  }

  try {
    const url = `${BACKEND_URL}?city=${encodeURIComponent(city)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      showError(data.message || "Hiba a szerver válaszában.");
      return;
    }
    showWeather(data);
  } catch (err) {
    showError("Nem sikerült csatlakozni a szerverhez.");
    console.error(err);
  }
}

document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  getWeather(city);
});

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("search-button").click();
  }
});

// Optional: try to load a default city
// getWeather('Budapest');

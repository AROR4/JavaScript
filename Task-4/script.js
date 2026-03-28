const API_KEY = "113a811d5404d63026739cb91b9720cb";

    const input = document.getElementById("city-input");
    const button = document.getElementById("search-btn");
    const result = document.getElementById("weather-result");
    const errorDiv = document.getElementById("error");

    button.addEventListener("click", fetchWeather);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") fetchWeather();
    });

    async function fetchWeather() {
      const city = input.value.trim();

      if (!city) {
        showError("Please enter a city name");
        return;
      }

      try {
        clearError();
        result.innerHTML = "Loading...";

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

      } catch (error) {
        showError(error.message);
        result.innerHTML = "";
      }
    }

    function displayWeather(data) {
      const { name, main, weather } = data;
      const icon = weather[0].icon;

      result.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
        <p>🌡 Temperature: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌥 Condition: ${weather[0].main}</p>
      `;
    }

    function showError(message) {
      errorDiv.textContent = message;
    }

    function clearError() {
      errorDiv.textContent = "";
    }
import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import { getWeather } from "./api.js";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <div className="app">
      <div className="weather-app">
        <h1>Weather App</h1>
        <p className="subtitle">Check the weather in any city.</p>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <div className="spinner"></div>}
        {error && <p className="error">⚠️ {error}</p>}
        {weather && (
          <WeatherCard
            weather={weather}
            unit={unit}
            onToggleUnit={toggleUnit}
          />
        )}
      </div>
    </div>
  );
}

export default App;

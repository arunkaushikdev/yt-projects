import { describeWeather } from "../weatherCodes.js";

function WeatherCard({ weather, unit, onToggleUnit }) {
  const { label, icon } = describeWeather(weather.code);
  const temp =
    unit === "C" ? weather.temp : (weather.temp * 9) / 5 + 32;

  return (
    <div className="weather-card">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <div className="weather-icon">{icon}</div>
      <p className="temp">
        {Math.round(temp)}°{unit}
      </p>
      <p className="label">{label}</p>

      <div className="details">
        <span>💧 Humidity: {weather.humidity}%</span>
        <span>💨 Wind: {weather.wind} km/h</span>
      </div>

      <button className="unit-toggle" onClick={onToggleUnit}>
        Show °{unit === "C" ? "F" : "C"}
      </button>
    </div>
  );
}

export default WeatherCard;

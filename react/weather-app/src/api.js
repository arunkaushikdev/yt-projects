const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// fetch + JSON, but give up after 10 seconds so the spinner never hangs
async function fetchJSON(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    throw new Error("Weather service not responding. Try again!");
  }
}

export async function getWeather(city) {
  // 1. City name → latitude & longitude
  const query = encodeURIComponent(city); // "New York" → "New%20York"
  const geoData = await fetchJSON(`${GEO_URL}?name=${query}&count=1`);

  if (!geoData.results) {
    throw new Error("City not found");
  }

  const { name, country, latitude, longitude } = geoData.results[0];

  // 2. Coordinates → current weather
  const params =
    "current=temperature_2m,relative_humidity_2m," +
    "wind_speed_10m,weather_code";
  const weatherData = await fetchJSON(
    `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&${params}`
  );
  const current = weatherData.current;

  return {
    city: name,
    country: country,
    temp: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m,
    code: current.weather_code,
  };
}

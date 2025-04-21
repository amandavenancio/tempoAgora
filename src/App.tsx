import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather, fetchWeatherByCoords, fetchForecast } from "./services/weatherService";
import { WeatherData } from "./types/Weather";
import Spinner from "./components/Spinner";
import ForecastCard from "./components/ForecastCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [isGeolocated, setIsGeolocated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<any[]>([]);

  const backgroundClass = weather?.main.temp > 25
    ? 'bg-gradient-to-r from-yellow-200 to-yellow-400'
    : 'bg-gradient-to-r from-blue-200 to-blue-400';

  const handleSearch = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setWeather(data);
      setForecast(forecastData);
    } catch (err) {
      console.error(err);
      setWeather(null);
      setForecast([]);
      setError("Cidade não encontrada.");
    } finally {
      setLoading(false);
    }
  };


  const getGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true); // inicia o loading
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeatherByCoords(latitude, longitude);
            setWeather(data);
            setIsGeolocated(true);
          } catch (error) {
            setError("Erro ao buscar clima pela localização.");
          } finally {
            setLoading(false); // finaliza o loading
          }
        },
        () => {
          setError("Não foi possível obter sua localização.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocalização não é suportada neste navegador.");
    }
  };


  useEffect(() => {
    getGeolocation();
  }, []);

  return (
    <div className={`${backgroundClass} transition-colors duration-800 min-h-screen flex flex-col items-center justify-center p-4`}>
      <h1 className="text-3xl font-bold mb-4">Tempo Agora</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="px-4 py-2 rounded-md"
          type="text"
          value={city}
          placeholder="Digite a cidade..."
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading && (
        <>
          <Spinner />
          <p className="text-white text-lg mt-2 animate-pulse">Buscando clima...</p>
        </>
      )}

      {weather && (
        <>
          <WeatherCard data={weather} />
          {forecast.length > 0 && <ForecastCard forecast={forecast} />}
        </>
      )}

      {isGeolocated && !weather && <p className="text-green-500">Clima encontrado automaticamente pela sua localização!</p>}
    </div>
  );
}

export default App;

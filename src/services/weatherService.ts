import { WeatherData } from "../types/Weather";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Função para buscar clima por cidade
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(`${API_URL}?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
  console.log(response); // Verifique o que é retornado pela API
  if (!response.ok) {
    throw new Error("Cidade não encontrada");
  }
  const data = await response.json();
  console.log(data); // Verifique os dados recebidos
  return data;
};

// Função para buscar clima por coordenadas
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
  console.log(response); // Verifique o que é retornado pela API
  if (!response.ok) {
    throw new Error("Erro ao obter dados da localização");
  }
  const data = await response.json();
  console.log(data); // Verifique os dados recebidos
  return data;
};

export const fetchForecast = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar a previsão do tempo");
  }
  const data = await response.json();
  return data.list; // Lista com previsões de 3 em 3 horas
};

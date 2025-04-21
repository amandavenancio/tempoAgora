import { WeatherData } from "../types/Weather";
import { format } from "date-fns";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  const cardColor = data.weather[0].description.includes("cloud")
    ? "bg-gray-300" // Nuvens claras
    : data.main.temp > 25
    ? "bg-yellow-200" // Sol quente
    : "bg-blue-200"; // Clima frio

  const timezoneOffsetInSeconds = data.timezone;
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const cityTime = new Date(utcTime + timezoneOffsetInSeconds * 1000);
  const formattedTime = format(cityTime, "HH:mm");

  return (
    <div className={`p-6 rounded-xl shadow-md text-center animate-scale-up ${cardColor} animate-scale-up`}>
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <p className="text-xl mt-4 animate-pulse">Hora local: {formattedTime}</p>
      <p className="text-xl">{Math.round(data.main.temp)}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      <img
        className="mx-auto"
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Ícone do clima"
      />
    </div>
  );
}
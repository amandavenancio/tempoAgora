import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface Props {
  forecast: ForecastItem[];
}

export default function ForecastCard({ forecast }: Props) {
  // Filtra um horário por dia, por exemplo: 12:00
  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
      {dailyForecast.map((item, index) => {
        // Determina a cor do card com base na descrição do clima e na temperatura
        const cardColor = item.weather[0].description.includes("cloud")
          ? "bg-gray-300" // Nuvens
          : item.main.temp > 25
          ? "bg-yellow-200" // Sol quente
          : "bg-blue-200"; // Clima frio

        return (
          <div
            key={index}
            className={`p-4 rounded-lg shadow text-center ${cardColor} animate-scale-up`}
          >
            <p className="font-semibold">
              {format(new Date(item.dt_txt), "EEEE", { locale: ptBR })}
            </p>
            <p>{format(new Date(item.dt_txt), "dd/MM")}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="Ícone do clima"
              className="mx-auto"
            />
            <p>{item.main.temp.toFixed(0)}°C</p>
            <p className="capitalize text-sm">{item.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
}

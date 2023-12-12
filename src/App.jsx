import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import LocationAndTime from "./components/LocationAndTime";
import WeatherInfo from "./components/WeatherInfo";
import ThreeHourForecast from "./components/ThreeHourForecast";
import { useEffect, useState } from "react";
import DailyForecast from "./components/DailyForecast";

function App() {
  const [units, setUnits] = useState("metric");
  const [country, setCountry] = useState("london");
  const [lat, setLat] = useState("51.5085");
  const [lon, setLon] = useState("-0.1257");
  const [londonWeather, setLondonWeather] = useState(null);
  const [utcTime, setUtcTime] = useState(null);
  const [adjustedTime, setAdjustedTime] = useState(null);
  const [threeHourForecast, setThreeHourForecast] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [fullForecast, setFullForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  const settingTime = () => {
    if (londonWeather) {
      setUtcTime(londonWeather.dt);
    }
  };

  useEffect(() => {
    settingTime();
  }, [londonWeather]);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9b1100f339549fb4ca4266516c9d5265&units=${units}`
      );
      const data = await response.json();
      setLondonWeather(data);
    };

    fetchCurrentWeather();
  }, [country, units]);

  useEffect(() => {
    const forecastTheRightCountry = () => {
      if (londonWeather && londonWeather.coord) {
        setLat(londonWeather.coord.lat);
        setLon(londonWeather.coord.lon);
      }
    };
    forecastTheRightCountry();
  }, [londonWeather]);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9b1100f339549fb4ca4266516c9d5265&units=${units}`
      );
      const data = await response.json();
      console.log("DATA AFFF", data);
      const slicedData = data.list.slice(1, 6);
      setThreeHourForecast(slicedData);
      setFullForecast(data);
    };
    if (lat && lon) {
      fetchForecast();
    }
  }, [lat, lon, units]);

  useEffect(() => {
    const whatPng = () => {
      if (
        londonWeather &&
        londonWeather.weather &&
        londonWeather.weather.length > 0
      ) {
        setWeatherIcon(londonWeather.weather[0].icon);
      }
    };
    whatPng();
  }, [londonWeather]);

  useEffect(() => {
    console.log(fullForecast);
  }, [fullForecast]);

  useEffect(() => {
    function filterObjectsByTime() {
      if (fullForecast) {
        // Filter objects based on the "dt_txt" property corresponding to 15:00:00
        const filteredObjects = fullForecast.list.filter((obj) => {
          // Extract the time part from the "dt_txt" property
          const timePart = obj.dt_txt.split(" ")[1];

          // Check if the time is 15:00:00
          return timePart === "15:00:00";
        });

        // console.log("THE FILTERED MF OBJECTS", filteredObjects);
        setDailyForecast(filteredObjects);
      }
    }

    filterObjectsByTime();
  }, [fullForecast]);
  console.log("3 HOUR FORECSAT", threeHourForecast);

  return (
    <div className="mx-auto max-w-screen py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      {londonWeather && weatherIcon && threeHourForecast ? (
        <div>
          <TopButtons setCountry={setCountry} />
          <Inputs setCountry={setCountry} setUnits={setUnits} />
          <LocationAndTime
            londonWeather={londonWeather}
            utcTime={utcTime}
            setAdjustedTime={setAdjustedTime}
            adjustedTime={adjustedTime}
            weatherIcon={weatherIcon}
          />
          <WeatherInfo londonWeather={londonWeather} units={units} />
          <ThreeHourForecast
            title="3 hour forecast"
            threeHourForecast={threeHourForecast}
            londonWeather={londonWeather}
          />
          <DailyForecast
            title="Daily Forecast"
            dailyForecast={dailyForecast}
            londonWeather={londonWeather}
          />
        </div>
      ) : (
        <div>
          <div role="status" className="max-w-screen h-screen m-0 p-0">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path data */}
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// App.js
import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import LocationAndTime from "./components/LocationAndTime";
import WeatherInfo from "./components/WeatherInfo";
import ThreeHourForecast from "./components/ThreeHourForecast";
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
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9b1100f339549fb4ca4266516c9d5265&units=${units}`
        );

        if (!response.ok) {
          setError(response.status);
          return;
        }

        const data = await response.json();
        setLondonWeather(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("NetworkError");
      }
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

      if (!response.ok) {
        setError(response.status);
        return;
      }

      const data = await response.json();

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
    function filterObjectsByTime() {
      if (fullForecast) {
        const filteredObjects = fullForecast.list.filter((obj) => {
          const timePart = obj.dt_txt.split(" ")[1];
          return timePart === "15:00:00";
        });

        setDailyForecast(filteredObjects);
      }
    }

    filterObjectsByTime();
  }, [fullForecast]);

  return (
    <div className="mx-auto max-w-screen py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      {initialLoading ? (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
          <RingLoader
            color="white"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="text-white">Looking outside everyone's window...</p>
        </div>
      ) : (
        <div>
          <TopButtons setCountry={setCountry} />
          <Inputs setCountry={setCountry} setUnits={setUnits} />
          {error && (
            <p className="text-red-500 text-lg mb-4 text-center">
              Invalid city or country.
            </p>
          )}
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
      )}
    </div>
  );
}

export default App;

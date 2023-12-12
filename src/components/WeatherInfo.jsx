import React, { useEffect, useState } from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

function WeatherInfo({ londonWeather, units }) {
  const [adjustedSunsetTime, setAdjustedSunsetTime] = useState(null);
  const [adjustedSunriseTime, setAdjustedSunriseTime] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const getTheSunTimes = () => {
    if (
      londonWeather &&
      londonWeather.sys &&
      londonWeather.sys.sunrise &&
      londonWeather.sys.sunset
    ) {
      setAdjustedSunriseTime(londonWeather.sys.sunrise);
      setAdjustedSunsetTime(londonWeather.sys.sunset);
    }
  };

  const whatPng = () => {
    if (
      londonWeather &&
      londonWeather.weather &&
      londonWeather.weather[0] &&
      londonWeather.weather[0].icon
    ) {
      setWeatherIcon(londonWeather.weather[0].icon);
    }
  };

  useEffect(() => {
    if (londonWeather) {
      getTheSunTimes();
      whatPng();
    }
  }, [londonWeather]);

  function unixTimeToReadable(x) {
    const date = new Date(x * 1000);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }

  const sunsetTime = adjustedSunsetTime
    ? unixTimeToReadable(adjustedSunsetTime)
    : "";
  const sunriseTime = adjustedSunriseTime
    ? unixTimeToReadable(adjustedSunriseTime)
    : "";

  const roundedTemp =
    londonWeather && londonWeather.main && Math.round(londonWeather.main.temp);
  const roundedRealFeel =
    londonWeather &&
    londonWeather.main &&
    Math.round(londonWeather.main.feels_like);
  const roundedWindSpeed =
    londonWeather && londonWeather.wind && Math.round(londonWeather.wind.speed);
  const roundedTempMax =
    londonWeather &&
    londonWeather.main &&
    Math.round(londonWeather.main.temp_max);
  const roundedTempMin =
    londonWeather &&
    londonWeather.main &&
    Math.round(londonWeather.main.temp_min);

  function changeUnits() {
    if (units === "metric") {
      return "kmh";
    }
    if (units === "imperial") {
      return "mph";
    }
  }

  return (
    <>
      {londonWeather && londonWeather.weather && londonWeather.weather[0] && (
        <>
          <div className="flex flex-col md:flex-row items-center justify-center py-6 text-xl text-cyan-300">
            <p>{londonWeather.weather[0].main}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center text-white py-3">
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              className="w-20"
            />
            <p className="text-5xl mt-2 md:mt-0 md:ml-4">{roundedTemp}°</p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:ml-4 md:mt-2">
              <div className="flex font-light text-sm items-center justify-center md:mr-4">
                <UilTemperature size={18} className="mr-1" />
                Real feel:
                <span className="font-medium ml-1">{roundedRealFeel}°</span>
              </div>
              <div className="flex font-light text-sm items-center justify-center md:mr-4">
                <UilTear size={18} className="mr-1" />
                Humidity:
                <span className="font-medium ml-1">
                  {londonWeather.main.humidity}%
                </span>
              </div>
              <div className="flex font-light text-sm items-center justify-center">
                <UilWind size={18} className="mr-1" />
                Wind:
                <span className="font-medium ml-1">
                  {roundedWindSpeed} {changeUnits()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:mt-2 text-white text-sm py-3">
            <UilSun />
            <p className="font-light">
              Rise:
              <span className="font-medium m-2">{sunriseTime} AM</span>
            </p>
            <p className="font-light">|</p>
            <UilSunset />

            <p className="font-light">
              Set:<span className="font-medium m-2">{sunsetTime} PM</span>
            </p>
            <p className="font-light">|</p>
            <UilSun />
            <p className="font-light">
              High:
              <span className="font-medium m-2">{roundedTempMax}°</span>
            </p>
            <p className="font-light">|</p>
            <UilSun />
            <p className="font-light">
              Low:<span className="font-medium m-2">{roundedTempMin}°</span>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default WeatherInfo;

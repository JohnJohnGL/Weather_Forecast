import React, { useState, useEffect } from "react";

function ThreeHourForecast({ title, threeHourForecast, londonWeather }) {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    whatPng();

    // Event listener for screen width changes
    window.addEventListener("resize", updateScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [londonWeather]);

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

  function unixTimeToReadable(x) {
    const date = new Date(x * 1000);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }

  return (
    <>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {threeHourForecast &&
          threeHourForecast.map((forecast, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <p className="font-light text-sm pr-1">
                {unixTimeToReadable(forecast.dt)}
              </p>
              {forecast.weather.map((weather, index) => (
                <div key={index}>
                  {weather.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      className="w-20 "
                    />
                  )}
                  {/* Conditional rendering based on screen width */}
                  <p
                    className={`font-light text-sm ${
                      screenWidth < 750 ? "hidden" : ""
                    }`}
                  >
                    {weather.description}
                  </p>
                </div>
              ))}
              <p className="font-medium">{Math.ceil(forecast.main.temp)}°</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default ThreeHourForecast;

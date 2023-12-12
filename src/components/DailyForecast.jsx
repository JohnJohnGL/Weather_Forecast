import React, { useState, useEffect } from "react";

function DailyForecast({ title, dailyForecast, londonWeather }) {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  console.log("FROM OTHER COMPONENT", dailyForecast);

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
    whatPng();

    // Event listener for screen width changes
    window.addEventListener("resize", updateScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [londonWeather]);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  return (
    <>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {dailyForecast &&
          dailyForecast.map((forecast, index) => (
            <div key={index}>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-light text-sm">
                  {forecast.dt_txt.slice(0, 10).split("-").reverse().join("-")}
                </p>
                {forecast.weather &&
                  forecast.weather.map((weatherIcon, index) => (
                    <div key={index}>
                      {weatherIcon.icon && (
                        <img
                          src={`http://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`}
                        />
                      )}
                      {/* Conditional rendering based on screen width */}
                      <p
                        className={`font-light text-sm ${
                          screenWidth < 750 ? "hidden" : ""
                        }`}
                      >
                        {weatherIcon.description}
                      </p>
                    </div>
                  ))}
                <p className="font-medium">{Math.round(forecast.main.temp)}°</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default DailyForecast;

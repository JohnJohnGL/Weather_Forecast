import React from "react";

function LocationAndTime({
  londonWeather,
  utcTime,
  setAdjustedTime,
  adjustedTime,
}) {
  const convertUnixToReadable = (UnixTime, timezone) => {
    const date = new Date((UnixTime + timezone) * 1000);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "numeric", // Use numeric format for month
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const formattedDate = date.toLocaleString("en-US", options);

    // Manually format the date string
    const [, weekday, day, month, year, time] = formattedDate.match(
      /(\w+), (\d+)\/(\d+)\/(\d+), (.+)/
    );
    return `${weekday}, ${day} ${getMonthName(month)}, ${year} at ${time}`;
  };

  // Helper function to get month name
  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[parseInt(month, 10) - 1];
  };

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        {londonWeather && (
          <p className="text-white">
            {convertUnixToReadable(londonWeather.dt, londonWeather.timezone)}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
          {londonWeather ? londonWeather.name : null}
        </p>
      </div>
    </div>
  );
}

export default LocationAndTime;

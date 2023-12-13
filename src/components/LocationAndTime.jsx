import React from "react";

function LocationAndTime({
  londonWeather,
  utcTime,
  setAdjustedTime,
  adjustedTime,
}) {
  function getTimeZoneName(offsetSeconds) {
    const offsetMilliseconds = offsetSeconds * 1000;
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const localTime = date.toLocaleString("en-US", options);
    const localOffset = date.getTimezoneOffset() * 60 * 1000;
    const utcTime = date.getTime() + localOffset;

    // Calculate the target time with the given offset
    const targetTime = utcTime + offsetMilliseconds;

    // Create a new date object for the target time
    const targetDate = new Date(targetTime);

    // Get the time zone name of the target date
    const timeZoneName = targetDate.toLocaleString("en-US", options);

    return timeZoneName;
  }

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        {londonWeather && (
          <p className="text-white">
            {getTimeZoneName(londonWeather.timezone)}
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

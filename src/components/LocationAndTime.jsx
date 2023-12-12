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
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
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

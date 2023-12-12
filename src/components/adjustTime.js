function adjustTime(utcTime, setAdjustedTime) {
  var utcTimeStamp = utcTime;
  var notUtcTimeLol;
  var utcDateToMillisecond = new Date(utcTimeStamp * 1000);
  var londonOffset = 0;
  if (
    utcDateToMillisecond.getMonth() >= 2 &&
    utcDateToMillisecond.getMonth() <= 9
  ) {
    londonOffset = 1;
  }
  notUtcTimeLol = new Date(
    utcDateToMillisecond.getTime() + londonOffset * 3600 * 1000
  );
  setAdjustedTime(notUtcTimeLol);
}

export default adjustTime;

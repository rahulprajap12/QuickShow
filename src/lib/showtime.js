import { dummyDateTimeData } from "../assets/assets";

export const formatShowTime = (isoTime) =>
  new Date(isoTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const findShowtimeByShowId = (showId) => {
  for (const [date, times] of Object.entries(dummyDateTimeData)) {
    const showtime = times.find((item) => item.showId === showId);
    if (showtime) {
      return {
        date,
        day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        ...showtime,
      };
    }
  }
  return null;
};

export const getShowtimesForDate = (date) => dummyDateTimeData[date] ?? [];

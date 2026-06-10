import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatShowTime } from "../lib/showtime";

const DateSelect = forwardRef(({ dateTime, movieId }, ref) => {
  const navigate = useNavigate();
  const timeSectionRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(dateTime?.[0]?.date ?? null);
  const [selectedShowId, setSelectedShowId] = useState(null);

  useImperativeHandle(ref, () => ({
    scrollToTimeSection: () => {
      timeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  }));

  const selectedShowtimes =
    dateTime?.find((item) => item.date === selectedDate)?.times ?? [];

  const goToSeatLayout = (showtime) => {
    navigate(`/movies/${movieId}/${showtime.showId}`);
    window.scrollTo(0, 0);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedShowId(null);
  };

  const handleTimeSelect = (showtime) => {
    setSelectedShowId(showtime.showId);
  };

  const handleBookNow = () => {
    const showtime = selectedShowtimes.find(
      (item) => item.showId === selectedShowId
    );

    if (!showtime) {
      timeSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    goToSeatLayout(showtime);
  };

  return (
    <div className="mt-20 rounded-2xl border border-primary/20 bg-gradient-to-r from-[#2c0911] to-[#16070a] p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="w-full">
          <h2 className="text-white text-2xl font-semibold mb-8">
            Choose Date
          </h2>

          <div className="flex flex-wrap gap-4">
            {dateTime?.slice(0, 7).map((item) => (
              <button
                key={item.date}
                onClick={() => handleDateSelect(item.date)}
                className={`border border-primary text-white rounded-lg px-5 py-3 hover:bg-primary transition ${
                  selectedDate === item.date ? "bg-primary" : ""
                }`}
              >
                <div className="font-semibold">{item.date}</div>
                <div className="text-sm opacity-80">{item.day}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBookNow}
          disabled={!selectedShowId}
          className="bg-primary text-white px-8 py-3 rounded-lg whitespace-nowrap hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Ticket
        </button>
      </div>

      <div ref={timeSectionRef} className="mt-10 pt-8 border-t border-primary/20">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Choose Time
        </h2>

        <div className="flex flex-wrap gap-4">
          {selectedShowtimes.map((showtime) => (
            <button
              key={showtime.showId}
              onClick={() => handleTimeSelect(showtime)}
              className={`border border-primary text-white rounded-lg px-6 py-3 hover:bg-primary transition ${
                selectedShowId === showtime.showId ? "bg-primary" : ""
              }`}
            >
              {formatShowTime(showtime.time)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

DateSelect.displayName = "DateSelect";

export default DateSelect;

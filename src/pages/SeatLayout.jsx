import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import { findShowtimeByShowId, formatShowTime } from "../lib/showtime";

const SeatLayout = () => {
  const { id, showId } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const seatRows = [
    ["A", 9],
    ["B", 9],
    ["C", 9],
    ["D", 9],
    ["E", 9],
    ["F", 9],
    ["G", 9],
    ["H", 9],
    ["I", 9],
    ["J", 9],
  ];

  useEffect(() => {
    setLoading(true);

    const movie = dummyShowsData.find(
      (item) => item.id === parseInt(id, 10)
    );
    const showtime = findShowtimeByShowId(showId);

    if (!movie || !showtime) {
      setBooking(null);
      setLoading(false);
      return;
    }

    setBooking({ movie, showtime });
    setSelectedSeats([]);
    setLoading(false);
  }, [id, showId]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((item) => item !== seat)
        : [...prev, seat]
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-xl text-gray-400">Show not found</p>
        <button
          onClick={() => navigate(`/movies/${id}`)}
          className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Back to Movie
        </button>
      </div>
    );
  }

  const { movie, showtime } = booking;

  return (
    <div className="relative min-h-screen px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-20 overflow-hidden">
      <BlurCircle top="150px" left="-100px" />
      <BlurCircle bottom="100px" right="-100px" />

      <div className="flex flex-col lg:flex-row gap-16 relative z-10">
        <div className="w-full lg:w-72">
          <div className="bg-[#1b0b12] border border-primary/20 rounded-xl p-6">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold text-white mb-1">
              {movie.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6">
              {showtime.date} • {showtime.day}
            </p>

            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Selected Show
            </h4>

            <button className="flex items-center gap-2 border border-primary bg-primary text-white px-4 py-3 rounded-lg w-full">
              <Clock size={16} />
              {formatShowTime(showtime.time)}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Select your seat
          </h1>

          <div className="relative mb-16 flex flex-col items-center">
            <div className=" w-[520px]
      h-[40px]
      border-t-[8px]
      border-primary/60
      rounded-[100%]" />
            <p className="text-gray-400 text-sm mt-2">
              SCREEN SIDE
            </p>
          </div>

          <div className="space-y-3">
            {seatRows.map(([row, count], rowIndex) => (
              <div key={row} className="flex justify-center gap-2">
                {[...Array(count)].map((_, seatIndex) => {
                  const seat = `${row}${seatIndex + 1}`;
                  const selected = selectedSeats.includes(seat);
                  const middleGap = seatIndex === 3 && rowIndex >= 2;

                  return (
                    <div key={seat} className="flex items-center">
                      <button
                        onClick={() => toggleSeat(seat)}
                        className={`w-9 h-9 rounded-md border text-xs transition-all duration-200 ${
                          selected
                            ? "bg-primary border-primary text-white"
                            : "border-primary text-gray-300 hover:bg-primary/20"
                        }`}
                      >
                        {seat}
                      </button>

                      {middleGap && <div className="w-6" />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 mb-3">Selected Seats</p>
            <div className="text-white font-medium">
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No Seat Selected"}
            </div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            className="mt-12 bg-primary hover:opacity-90 transition-all px-10 py-4 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;

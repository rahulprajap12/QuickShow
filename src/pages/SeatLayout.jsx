import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [occupiedSeats] = useState(["B3", "B4", "C5", "D2", "E7", "F1", "G3", "H5"]);

  const seatRows = [
    ["A", 9], ["B", 9], ["C", 9], ["D", 9], ["E", 9],
    ["F", 9], ["G", 9], ["H", 9], ["I", 9], ["J", 9],
  ];

  const showPrice = 299; // dummy price

  useEffect(() => {
    setLoading(true);
    const movie = dummyShowsData.find((item) => item.id === parseInt(id, 10));
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
    if (occupiedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    toast.success(`Booking confirmed for seats: ${selectedSeats.join(", ")}!`);
    // In real app: navigate to payment page
  };

  if (loading) return <Loading />;

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
  const totalAmount = selectedSeats.length * showPrice;

  return (
    <div className="relative min-h-screen px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-20 overflow-hidden">
      <BlurCircle top="150px" left="-100px" />
      <BlurCircle bottom="100px" right="-100px" />

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">

        {/* Left: Movie Info Card */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-[#1b0b12] border border-primary/20 rounded-xl p-6 sticky top-28">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-44 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-white mb-1">{movie.title}</h3>
            <p className="text-gray-400 text-sm mb-6">
              {showtime.date} • {showtime.day}
            </p>

            <h4 className="text-sm font-semibold text-gray-300 mb-3">Selected Show</h4>
            <button className="flex items-center gap-2 border border-primary bg-primary text-white px-4 py-3 rounded-lg w-full">
              <Clock size={16} />
              {formatShowTime(showtime.time)}
            </button>

            {/* Seat Legend */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-5 h-5 rounded border border-primary bg-transparent" />
                Available
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-5 h-5 rounded bg-primary border border-primary" />
                Selected
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-5 h-5 rounded bg-gray-600 border border-gray-600" />
                Occupied
              </div>
            </div>

            {/* Summary */}
            {selectedSeats.length > 0 && (
              <div className="mt-6 border-t border-primary/20 pt-4">
                <p className="text-gray-400 text-sm">Selected: <span className="text-white font-medium">{selectedSeats.join(", ")}</span></p>
                <p className="text-gray-400 text-sm mt-2">Tickets: <span className="text-white font-medium">{selectedSeats.length}</span></p>
                <p className="text-gray-400 text-sm mt-1">Total: <span className="text-green-400 font-bold text-lg">₹{totalAmount}</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Seat Grid */}
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-10">Select Your Seats</h1>

          {/* Screen */}
          <div className="relative mb-16 flex flex-col items-center w-full max-w-lg">
            <div className="w-full h-[8px] bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full" />
            <p className="text-gray-400 text-sm mt-3 tracking-widest uppercase">Screen</p>
          </div>

          {/* Seats */}
          <div className="space-y-3">
            {seatRows.map(([row, count]) => (
              <div key={row} className="flex justify-center items-center gap-2">
                <span className="text-gray-500 text-xs w-4">{row}</span>
                {[...Array(count)].map((_, seatIndex) => {
                  const seat = `${row}${seatIndex + 1}`;
                  const isSelected = selectedSeats.includes(seat);
                  const isOccupied = occupiedSeats.includes(seat);
                  const isMiddleGap = seatIndex === 4;

                  return (
                    <div key={seat} className="flex items-center">
                      {isMiddleGap && <div className="w-5" />}
                      <button
                        onClick={() => toggleSeat(seat)}
                        disabled={isOccupied}
                        title={seat}
                        className={`w-9 h-9 rounded-md text-xs font-medium transition-all duration-200 border
                          ${isOccupied
                            ? "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
                            : isSelected
                            ? "bg-primary border-primary text-white scale-110"
                            : "border-primary text-gray-300 hover:bg-primary/20"
                          }`}
                      >
                        {seatIndex + 1}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <div className="mt-12 flex flex-col items-center gap-4">
            {selectedSeats.length > 0 && (
              <p className="text-gray-300 text-sm">
                {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} × ₹{showPrice} = <span className="text-green-400 font-bold">₹{totalAmount}</span>
              </p>
            )}
            <button
              onClick={handleCheckout}
              disabled={selectedSeats.length === 0}
              className="bg-primary hover:opacity-90 transition-all px-12 py-4 rounded-full font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;

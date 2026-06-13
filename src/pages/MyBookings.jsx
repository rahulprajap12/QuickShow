import { useEffect, useState } from "react";
import { dummyBookingsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { dateFormat } from "../lib/dateFormet";
import timeFormat from "../lib/timeFormat";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingsData);
    setIsLoading(false);
  };

  const handlePayment = (booking) => {
    console.log("Payment:", booking);
    alert("Payment Gateway Integration Pending");
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 md:px-12 py-16">
      <BlurCircle top="150px" left="100px" />
      <BlurCircle top="400px" left="700px" />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">
          My Bookings
        </h1>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-400">
              No bookings found.
            </p>
          ) : (
            bookings.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#2d1117] to-[#3b121f] border border-[#4b1d2a] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg"
              >
                <div className="flex gap-4 items-center w-full">
                  <img
  src={item.show?.movie?.poster_path}
  alt={item.show?.movie?.title}
  className="w-64 h-40 object-cover rounded-xl"
/>

                  <div>
                    <h2 className="text-white text-2xl font-semibold">
                      {item.show?.movie?.title}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      {timeFormat(item.show?.movie?.runtime || 0)}
                    </p>

                    <p className="text-gray-400 text-sm mt-3">
                      {dateFormat(item.show?.showDateTime)}
                    </p>
                  </div>
                </div>

                <div className="text-right min-w-[220px]">
                  <h2 className="text-white text-4xl font-bold">
                    {currency}
                    {item.amount}
                  </h2>

                  {!item.isPaid && (
                    <button
                      onClick={() => handlePayment(item)}
                      className="mt-3 bg-pink-500 hover:bg-pink-600 transition-all text-white px-5 py-2 rounded-full font-medium"
                    >
                      Pay Now
                    </button>
                  )}

                  <div className="mt-4">
                    <p className="text-gray-300 text-sm">
                      Total Tickets:{" "}
                      <span className="font-semibold">
                        {item.bookedSeats?.length || 0}
                      </span>
                    </p>

                    <p className="text-gray-300 text-sm mt-1">
                      Seat Number:{" "}
                      <span className="font-semibold">
                        {item.bookedSeats?.join(", ") || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
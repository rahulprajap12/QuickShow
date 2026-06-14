import { CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import { dateFormat } from '../../lib/dateFormet'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const [bookings] = useState(dummyBookingData)

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">List Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-12 text-center text-gray-400">
          No bookings found.
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Movie</th>
                  <th className="px-6 py-3 text-left">Show Time</th>
                  <th className="px-6 py-3 text-left">Seats</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {bookings.map((booking, index) => (
                  <tr key={booking._id + index} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>

                    <td className="px-6 py-4 font-medium">
                      {booking.user?.name || 'N/A'}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.show?.movie?.poster_path}
                          alt={booking.show?.movie?.title}
                          className="w-9 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <span className="font-medium line-clamp-1">
                          {booking.show?.movie?.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {dateFormat(booking.show?.showDateTime)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-300">
                        {booking.bookedSeats?.join(', ') || 'N/A'}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({booking.bookedSeats?.length || 0})
                      </span>
                    </td>

                    <td className="px-6 py-4 text-green-400 font-semibold">
                      {currency}{booking.amount}
                    </td>

                    <td className="px-6 py-4">
                      {booking.isPaid ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs font-medium">
                          <CheckCircle size={14} />
                          Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
                          <XCircle size={14} />
                          Unpaid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListBookings

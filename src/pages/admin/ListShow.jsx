import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { dummyDashboardData } from '../../assets/assets'
import { dateFormat } from '../../lib/dateFormet'

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const [shows, setShows] = useState(dummyDashboardData.activeShows)

  const handleDelete = (id) => {
    setShows((prev) => prev.filter((s) => s._id !== id))
    toast.success('Show removed successfully')
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">List Shows</h1>

      {shows.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-12 text-center text-gray-400">
          No shows available.
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Movie</th>
                  <th className="px-6 py-3 text-left">Date & Time</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Seats Booked</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {shows.map((show, index) => (
                  <tr key={show._id} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={show.movie.poster_path}
                          alt={show.movie.title}
                          className="w-10 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">{show.movie.title}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {show.movie.genres?.[0]?.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {dateFormat(show.showDateTime)}
                    </td>

                    <td className="px-6 py-4 text-green-400 font-semibold">
                      {currency}{show.showPrice}
                    </td>

                    <td className="px-6 py-4">
                      {Object.keys(show.occupiedSeats).length > 0 ? (
                        <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium">
                          {Object.keys(show.occupiedSeats).length} booked
                        </span>
                      ) : (
                        <span className="bg-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">
                          None
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(show._id)}
                        className="text-red-400 hover:text-red-300 transition p-2 rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </button>
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

export default ListShows

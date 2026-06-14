import { CalendarDays, IndianRupee, TrendingUp, Users } from 'lucide-react'
import { dummyDashboardData } from '../../assets/assets'
import { dateFormat } from '../../lib/dateFormet'

const Dashboard = () => {
  const { totalBookings, totalRevenue, totalUser, activeShows } = dummyDashboardData
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const stats = [
    {
      label: 'Total Bookings',
      value: totalBookings,
      icon: CalendarDays,
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Total Revenue',
      value: `${currency}${totalRevenue}`,
      icon: IndianRupee,
      color: 'bg-green-500/10 text-green-400',
    },
    {
      label: 'Total Users',
      value: totalUser,
      icon: Users,
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      label: 'Active Shows',
      value: activeShows.length,
      icon: TrendingUp,
      color: 'bg-pink-500/10 text-pink-400',
    },
  ]

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow"
          >
            <div className={`p-3 rounded-xl ${color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows Table */}
      <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Active Shows</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Movie</th>
                <th className="px-6 py-3 text-left">Show Date & Time</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Seats Booked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {activeShows.map((show) => (
                <tr key={show._id} className="hover:bg-gray-750 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={show.movie.poster_path}
                        alt={show.movie.title}
                        className="w-10 h-14 object-cover rounded-lg"
                      />
                      <span className="font-medium">{show.movie.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {dateFormat(show.showDateTime)}
                  </td>
                  <td className="px-6 py-4 text-green-400 font-semibold">
                    {currency}{show.showPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium">
                      {Object.keys(show.occupiedSeats).length} seats
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

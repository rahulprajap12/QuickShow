import { useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import toast from 'react-hot-toast'

const AddShow = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [formData, setFormData] = useState({
    movieId: '',
    showDate: '',
    showTime: '',
    showPrice: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.movieId || !formData.showDate || !formData.showTime || !formData.showPrice) {
      toast.error('Please fill all fields')
      return
    }
    toast.success('Show added successfully!')
    setFormData({ movieId: '', showDate: '', showTime: '', showPrice: '' })
  }

  return (
    <div className="text-white max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New Show</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 space-y-6 shadow">

        {/* Select Movie */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Movie
          </label>
          <select
            name="movieId"
            value={formData.movieId}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
          >
            <option value="">-- Choose a Movie --</option>
            {dummyShowsData.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {/* Movie Preview */}
        {formData.movieId && (() => {
          const movie = dummyShowsData.find(m => m.id === parseInt(formData.movieId))
          return movie ? (
            <div className="flex items-center gap-4 bg-gray-700 rounded-xl p-4">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-14 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{movie.title}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {movie.genres?.map(g => g.name).join(', ')} • {movie.release_date?.split('-')[0]}
                </p>
                <p className="text-yellow-400 text-sm mt-1">⭐ {movie.vote_average?.toFixed(1)}</p>
              </div>
            </div>
          ) : null
        })()}

        {/* Show Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Show Date
          </label>
          <input
            type="date"
            name="showDate"
            value={formData.showDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Show Time */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Show Time
          </label>
          <input
            type="time"
            name="showTime"
            value={formData.showTime}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Ticket Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ticket Price ({currency})
          </label>
          <input
            type="number"
            name="showPrice"
            value={formData.showPrice}
            onChange={handleChange}
            placeholder="e.g. 299"
            min="1"
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold text-lg"
        >
          Add Show
        </button>
      </form>
    </div>
  )
}

export default AddShow

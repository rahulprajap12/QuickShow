import { Search } from 'lucide-react'
import { useState } from 'react'
import { dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  // Collect all unique genres
  const allGenres = ['All', ...new Set(
    dummyShowsData.flatMap(m => m.genres?.map(g => g.name) || [])
  )]

  const filtered = dummyShowsData.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || movie.genres?.some(g => g.name === genre)
    return matchesSearch && matchesGenre
  })

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-16 overflow-hidden">
      <BlurCircle top="100px" left="-80px" />
      <BlurCircle bottom="200px" right="-80px" />

      <h1 className="text-3xl font-bold text-white mb-2">Now Showing</h1>
      <p className="text-gray-400 mb-8">Browse all available movies and book your seats</p>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-[#1a2236] border border-gray-700 rounded-full pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {allGenres.slice(0, 6).map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border
                ${genre === g
                  ? 'bg-primary border-primary text-white'
                  : 'border-gray-600 text-gray-300 hover:border-primary'
                }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh] gap-4">
          <p className="text-2xl font-bold text-white">No Movies Found</p>
          <p className="text-gray-400">Try a different search or genre filter</p>
          <button
            onClick={() => { setSearch(''); setGenre('All') }}
            className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Movies

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import MovieCard from '../components/MovieCard'

const Favorite = () => {
  // In a real app this would come from context/API; for now all movies start as favorite
  const [favorites, setFavorites] = useState(dummyShowsData.map(m => m.id))

  const favoriteMovies = dummyShowsData.filter(m => favorites.includes(m.id))

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-10 overflow-hidden">
      <BlurCircle top="100px" right="-80px" />

      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-pink-500 fill-pink-500 w-7 h-7" />
        <h1 className="text-3xl font-bold text-white">Favorite Movies</h1>
      </div>

      {favoriteMovies.length > 0 ? (
        <>
          <p className="text-gray-400 mb-8">{favoriteMovies.length} movie{favoriteMovies.length !== 1 ? 's' : ''} saved</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {favoriteMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                {/* Remove from favorites button */}
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  title="Remove from favorites"
                  className="absolute top-3 right-3 bg-black/60 hover:bg-pink-600 transition p-2 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <Heart size={16} className="text-white fill-white" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <Heart className="w-16 h-16 text-gray-600" />
          <h2 className="text-2xl font-bold text-white">No Favorites Yet</h2>
          <p className="text-gray-400">Movies you like will appear here.</p>
        </div>
      )}
    </div>
  )
}

export default Favorite

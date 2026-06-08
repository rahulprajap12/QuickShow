import React from 'react'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MovieCard = (movie) => {
  const navigate = useNavigate()

  return (
    <div className="w-full max-w-[290px] bg-[#1E2A44] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

      <img
        onClick={() => {
          navigate(`/movies/${movie.id}`)
          window.scrollTo(0, 0)
        }}
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-[260px] object-cover cursor-pointer"
      />

      <div className="p-4">

        <h3 className="text-white text-xl font-semibold truncate">
          {movie.title}
        </h3>

        <p className="text-gray-400 text-sm mt-3">
          {new Date(movie.release_date).getFullYear()} •{" "}
          {movie.genres?.slice(0, 2).map((genre) => genre.name).join(" | ")} •{" "}
          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          {/* timeFormat(movie.runtime) */}
        </p>

        <div className="flex items-center justify-between mt-6">

          <button
            onClick={() => {
              navigate(`/movies/${movie.id}/tickets`)
              window.scrollTo(0, 0)
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            Buy Tickets
          </button>

          <div className="flex items-center gap-1 text-pink-500">
            <Star size={16} fill="currentColor" />
            <span className="font-medium">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default MovieCard
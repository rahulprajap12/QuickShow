import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/assets'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />

        <p className="text-gray-300 font-medium text-lg">
          Now Showing
        </p>

        <button
          onClick={() => navigate('/movies')}
          className="group flex items-center gap-2 text-pink-500 hover:text-pink-600"
        >
          View All
          <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {dummyShowsData.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate('/movies')
            window.scrollTo(0, 0)
          }}
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection
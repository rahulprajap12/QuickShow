import React from 'react'
import {dummyShowsData} from '../assets/assets'
import MovieCard from '../components/MovieCard'

const Favorite = () => {
  return dummyShowsData.length>0?(
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-10"> 
      <h1 className='text-3xl font-bold text-white mb-6'>Favorite Movies</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
        {dummyShowsData.map((movie)=>{
          return <MovieCard movie={movie} key={movie.id} />
        })}
      </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center h-[70vh] gap-6'>
      <h1 className='text-3xl font-bold text-white mb-6'>No Movies Found</h1>
    </div>
  )
}

export default Favorite

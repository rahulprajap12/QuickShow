import { CalendarDays, Clock3, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from '../components/BlurCircle'

const upcomingReleases = [
  {
    id: 1,
    title: 'Avengers: Doomsday',
    releaseDate: '2025-05-01',
    genre: 'Action | Sci-Fi | Adventure',
    runtime: 150,
    rating: null,
    poster: 'https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg',
    overview: 'The Avengers unite once more to battle the most powerful villain the universe has ever seen.',
    tag: 'Upcoming',
  },
  {
    id: 2,
    title: 'Mission: Impossible 8',
    releaseDate: '2025-05-23',
    genre: 'Action | Thriller',
    runtime: 140,
    rating: null,
    poster: 'https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg',
    overview: 'Ethan Hunt returns in the most daring mission of his career as a new enemy emerges from the shadows.',
    tag: 'Coming Soon',
  },
  {
    id: 3,
    title: 'Jurassic World: Rebirth',
    releaseDate: '2025-07-02',
    genre: 'Adventure | Sci-Fi',
    runtime: 125,
    rating: null,
    poster: 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
    overview: 'A new chapter in the Jurassic saga begins as scientists venture into uncharted territory.',
    tag: 'Coming Soon',
  },
  {
    id: 4,
    title: 'Superman: Legacy',
    releaseDate: '2025-07-11',
    genre: 'Action | Superhero',
    runtime: 130,
    rating: null,
    poster: 'https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg',
    overview: 'The Man of Steel faces his greatest challenge yet in this bold new vision of the DC Universe.',
    tag: 'Most Awaited',
  },
  {
    id: 5,
    title: 'Fast & Furious 11',
    releaseDate: '2025-04-04',
    genre: 'Action | Thriller',
    runtime: 145,
    rating: 7.1,
    poster: 'https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg',
    overview: 'The final chapter of the Fast Saga brings Dominic Toretto face-to-face with his biggest enemy.',
    tag: 'Now Showing',
  },
  {
    id: 6,
    title: 'Wicked: Part Two',
    releaseDate: '2025-11-20',
    genre: 'Musical | Fantasy | Drama',
    runtime: 155,
    rating: null,
    poster: 'https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
    overview: 'The breathtaking conclusion to the beloved story of Elphaba and Glinda continues in spectacular fashion.',
    tag: 'Coming Soon',
  },
]

const tagColors = {
  'Now Showing': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Upcoming': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Coming Soon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Most Awaited': 'bg-primary/20 text-primary border-primary/30',
}

const Releases = () => {
  const navigate = useNavigate()

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-20 overflow-hidden">
      <BlurCircle top="100px" right="-80px" />
      <BlurCircle bottom="200px" left="-80px" />

      <h1 className="text-3xl font-bold text-white mb-2">Upcoming Releases</h1>
      <p className="text-gray-400 mb-10">Stay updated with the latest and most anticipated movies</p>

      <div className="space-y-6">
        {upcomingReleases.map((movie) => (
          <div
            key={movie.id}
            className="bg-[#1a2236] rounded-2xl overflow-hidden shadow-lg flex flex-col sm:flex-row gap-0 hover:scale-[1.01] transition duration-300"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full sm:w-36 h-48 sm:h-auto object-cover flex-shrink-0"
            />

            <div className="p-6 flex flex-col justify-center gap-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-white font-bold text-xl">{movie.title}</h2>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColors[movie.tag]}`}>
                  {movie.tag}
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                {movie.overview}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                <span>{movie.genre}</span>

                <span className="flex items-center gap-1">
                  <Clock3 size={14} />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {formatDate(movie.releaseDate)}
                </span>

                {movie.rating && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    {movie.rating.toFixed(1)}
                  </span>
                )}
              </div>

              <div className="flex gap-3 mt-2">
                {movie.tag === 'Now Showing' ? (
                  <button
                    onClick={() => navigate('/movies')}
                    className="bg-primary hover:opacity-90 transition text-white px-5 py-2 rounded-full text-sm font-medium"
                  >
                    Book Now
                  </button>
                ) : (
                  <button className="bg-gray-700 hover:bg-gray-600 transition text-white px-5 py-2 rounded-full text-sm font-medium">
                    Notify Me
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Releases

import BlurCircle from '../components/BlurCircle'

const theaterData = [
  {
    id: 1,
    name: 'PVR Cinemas - Select City Walk',
    location: 'Saket, New Delhi',
    screens: 9,
    amenities: ['Dolby Atmos', '4DX', 'IMAX', 'Recliner Seats'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'INOX Multiplex - R City Mall',
    location: 'Ghatkopar, Mumbai',
    screens: 7,
    amenities: ['Dolby Sound', 'LUXE Seats', 'Laser Projection'],
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format',
    rating: 4.3,
  },
  {
    id: 3,
    name: 'Cinepolis - VR Chennai Mall',
    location: 'Anna Nagar, Chennai',
    screens: 6,
    amenities: ['4K Projection', 'Recliner Seats', 'Dolby Sound'],
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Miraj Cinemas - Nexus Mall',
    location: 'Koramangala, Bengaluru',
    screens: 5,
    amenities: ['Digital Projection', 'Surround Sound', 'Snack Bar'],
    image: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=600&auto=format',
    rating: 4.1,
  },
  {
    id: 5,
    name: 'Carnival Cinemas - City Centre',
    location: 'Salt Lake, Kolkata',
    screens: 8,
    amenities: ['IMAX', 'Dolby Atmos', '3D', 'VIP Lounge'],
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'SPI Cinemas - Forum Mall',
    location: 'Koramangala, Bengaluru',
    screens: 4,
    amenities: ['Laser IMAX', '4DX', 'Recliner'],
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&auto=format',
    rating: 4.6,
  },
]

const Theaters = () => {
  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-20 overflow-hidden">
      <BlurCircle top="100px" left="-80px" />
      <BlurCircle bottom="200px" right="-80px" />

      <h1 className="text-3xl font-bold text-white mb-2">Theaters Near You</h1>
      <p className="text-gray-400 mb-10">Find the best cinemas and book your seats instantly</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theaterData.map((theater) => (
          <div
            key={theater.id}
            className="bg-[#1a2236] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <img
              src={theater.image}
              alt={theater.name}
              className="w-full h-44 object-cover"
            />

            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-white font-semibold text-lg leading-tight">
                  {theater.name}
                </h2>
                <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium flex-shrink-0">
                  ⭐ {theater.rating}
                </span>
              </div>

              <p className="text-gray-400 text-sm mt-1">📍 {theater.location}</p>
              <p className="text-gray-400 text-sm mt-1">🎬 {theater.screens} Screens</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {theater.amenities.map((a) => (
                  <span
                    key={a}
                    className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-full text-xs"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <button className="mt-5 w-full bg-primary hover:opacity-90 transition text-white py-2 rounded-xl font-medium text-sm">
                View Shows
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Theaters

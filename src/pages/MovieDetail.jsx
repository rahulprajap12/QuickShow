import { HeartIcon, PlayCircleIcon, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import DateSelect from "../components/DateSelect";
import timeFormat from "../lib/timeFormat";

const MovieDetail = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);

  const getShow = () => {
    const movie = dummyShowsData.find(
      (movie) => movie.id === parseInt(id, 10)
    );

    if (!movie) {
      setShow(null);
      return;
    }

    const dateTime = Object.entries(dummyDateTimeData).map(([date, times]) => ({
      date,
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      times,
    }));

    setShow({
      movie,
      dateTime,
    });
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Show not found</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Poster */}
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="w-full md:w-[280px] h-[420px] rounded-xl object-cover shadow-2xl"
        />

        {/* Movie Info */}
        <div className="relative flex flex-col gap-5 flex-1">
          <BlurCircle top="-120px" left="-120px" />

          <p className="text-primary uppercase font-medium tracking-wider">
            English
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {show.movie.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-lg">
              {show.movie.vote_average.toFixed(1)} User Rating
            </span>
          </div>

          {/* Overview */}
          <p className="text-gray-400 max-w-3xl leading-relaxed">
            {show.movie.overview}
          </p>

          {/* Details */}
          <p className="text-gray-300">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres
              ?.map((genre) => genre.name)
              .join(", ")}{" "}
            • {show.movie.release_date?.split("-")[0]}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center bg-[#1b2436] hover:bg-[#28344d] text-white px-5 py-3 rounded-lg transition">
              <PlayCircleIcon className="w-5 h-5 mr-2" />
              Watch Trailer
            </button>

            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
              Buy Tickets
            </button>

            <button className="p-3 rounded-full bg-[#1b2436] hover:bg-[#28344d] transition">
              <HeartIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-20">
        <h2 className="text-white text-2xl font-semibold mb-8">
          Your Favorite Cast
        </h2>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-8 w-max">
            {show.movie.casts
              ?.slice(0, 12)
              .map((cast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[90px]"
                >
                  <img
                    src={cast.profile_path}
                    alt={cast.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <p className="text-white text-xs text-center mt-3">
                    {cast.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} />

      {/* Recommended Movies */}
      <div className="mt-20">
        <h2 className="text-white text-2xl font-semibold mb-8">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyShowsData.slice(0, 4).map((movie) => (
            <div
              key={movie.id}
              className="bg-[#1a2236] rounded-xl overflow-hidden"
            >
              <img
                src={movie.backdrop_path}
                alt={movie.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="text-white font-semibold line-clamp-1">
                  {movie.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {movie.release_date?.split("-")[0]} •{" "}
                  {movie.genres?.[0]?.name}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
                    Buy Tickets
                  </button>

                  <div className="flex items-center gap-1 text-primary">
                    <StarIcon className="w-4 h-4 fill-current" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
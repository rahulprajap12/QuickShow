import { HeartIcon, PlayCircleIcon, StarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import DateSelect from "../components/DateSelect";
import Loading from "../components/Loading";
import timeFormat from "../lib/timeFormat";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const dateSelectRef = useRef(null);

  const goToMovie = (movieId) => {
    navigate(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setLoading(true);

    const movie = dummyShowsData.find(
      (item) => item.id === parseInt(id, 10)
    );

    if (!movie) {
      setShow(null);
      setLoading(false);
      return;
    }

    const dateTime = Object.entries(dummyDateTimeData).map(([date, times]) => ({
      date,
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      times,
    }));

    setShow({ movie, dateTime });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!show) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-xl text-gray-400">Show not found</p>
        <button
          onClick={() => navigate("/movies")}
          className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="w-full md:w-[280px] h-[420px] rounded-xl object-cover shadow-2xl"
        />

        <div className="relative flex flex-col gap-5 flex-1">
          <BlurCircle top="-120px" left="-120px" />

          <p className="text-primary uppercase font-medium tracking-wider">
            {show.movie.original_language === "en" ? "English" : show.movie.original_language}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-lg">
              {show.movie.vote_average.toFixed(1)} User Rating
            </span>
          </div>

          <p className="text-gray-400 max-w-3xl leading-relaxed">
            {show.movie.overview}
          </p>

          <p className="text-gray-300">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres?.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date?.split("-")[0]}
          </p>

          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center bg-[#1b2436] hover:bg-[#28344d] text-white px-5 py-3 rounded-lg transition">
              <PlayCircleIcon className="w-5 h-5 mr-2" />
              Watch Trailer
            </button>

            <button
              onClick={() => dateSelectRef.current?.scrollToTimeSection()}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Buy Tickets
            </button>

            <button className="p-3 rounded-full bg-[#1b2436] hover:bg-[#28344d] transition">
              <HeartIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {show.movie.casts?.length > 0 && (
        <div className="mt-20">
          <h2 className="text-white text-2xl font-semibold mb-8">
            Your Favorite Cast
          </h2>

          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-8 w-max">
              {show.movie.casts.slice(0, 12).map((cast) => (
                <div
                  key={cast.name}
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
      )}

      <DateSelect
        ref={dateSelectRef}
        dateTime={show.dateTime}
        movieId={show.movie.id}
      />

      {/* Recommended Movies */}
      <div className="mt-20">
        <h2 className="text-white text-2xl font-semibold mb-8">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyShowsData
            .filter((movie) => movie.id !== show.movie.id)
            .slice(0, 4)
            .map((movie) => (
              <div
                key={movie.id}
                className="bg-[#1a2236] rounded-xl overflow-hidden"
              >
                <img
                  src={movie.backdrop_path}
                  alt={movie.title}
                  onClick={() => goToMovie(movie.id)}
                  className="w-full h-52 object-cover cursor-pointer"
                />

                <div className="p-4">
                  <h3
                    onClick={() => goToMovie(movie.id)}
                    className="text-white font-semibold line-clamp-1 cursor-pointer hover:text-primary transition"
                  >
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    {movie.release_date?.split("-")[0]} •{" "}
                    {movie.genres?.[0]?.name}
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <button
                      onClick={() => goToMovie(movie.id)}
                      className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
                    >
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

        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              navigate("/movies");
              window.scrollTo(0, 0);
            }}
            className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

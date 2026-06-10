import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import { PlayCircleIcon } from "lucide-react";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <section className="px-6 md:px-16 lg:px-24 py-20">

      <h2 className="text-4xl font-bold text-white mb-8">
        Trailers
      </h2>
  
      <div className="max-w-6xl mx-auto">

        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${currentTrailer.videoId}`}
            title={currentTrailer.title}
            allowFullScreen
          />
        </div>

        <h3 className="text-white text-xl font-semibold mt-4">
          {currentTrailer.title}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          {dummyTrailers.map((trailer, index) => (
            <div
              key={index}
              onClick={() => setCurrentTrailer(trailer)}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all
              ${
                currentTrailer.videoId === trailer.videoId
                  ? "border-red-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={trailer.image}
                alt={trailer.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircleIcon
                  size={45}
                  className="text-white"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TrailersSection;
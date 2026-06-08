import React, { useState } from "react";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { dummyTrailers } from "../assets/assets";

const TrailersSection = () => {
  const [currentTrailer] = useState(dummyTrailers?.[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 flex flex-col items-center gap-12">

      <p className="text-white text-2xl font-semibold">
        Latest Trailer
      </p>

      <div className="relative w-full max-w-[960px] aspect-video rounded-xl overflow-hidden shadow-lg">

        <BlurCircle top="-100px" left="-100px" />

        {currentTrailer && (
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        )}

      </div>

    </div>
  );
};

export default TrailersSection;
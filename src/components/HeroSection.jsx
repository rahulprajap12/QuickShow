import React from "react";
import { assets } from "../assets/assets";
import { Calendar, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate=useNavigate();
  return (
    <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen">

      <img
        src={assets.marvelLogo}
        alt=""
        className="max-h-11 lg:h-11 mt-20"
      />

      <h1 className="text-5xl md:text-[70px] md:leading-[75px] font-semibold max-w-[500px]">
        Guardians <br /> of the Galaxy
      </h1>

      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>

        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>2018</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock3 className="w-4 h-4" />
          <span>2h 8m</span>
        </div>
      </div>

      <p className="max-w-[550px] text-gray-300">
        In a post-apocalyptic world where cities ride on wheels and consume
        each other to survive, two people meet in London and try to stop a
        conspiracy.
      </p>

      <button onClick={() => navigate('/movies')} className="mt-3 bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full font-medium transition">
        Explore Movies →
      </button>

    </div>
  );
};

export default HeroSection;
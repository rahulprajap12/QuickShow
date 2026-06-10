import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-700 pb-10">

        <div className="md:max-w-96">
          <img
            src={assets.logo}
            alt="QuickShow Logo"
            className="h-11"
          />

          <p className="mt-6 text-sm leading-6">
            QuickShow is your one-stop destination for discovering movies,
            watching trailers, and booking tickets seamlessly.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <h2 className="font-semibold text-white mb-5">
              Company
            </h2>

            <ul className="space-y-2 text-sm">
               <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-5">
              Get In Touch
            </h2>

            <div className="text-sm space-y-2">
              <p>+91 9876543210</p>
              <p>support@quickshow.com</p>
            </div>
          </div>
        </div>

      </div>

      <p className="text-center text-sm py-5">
        © {new Date().getFullYear()} QuickShow. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
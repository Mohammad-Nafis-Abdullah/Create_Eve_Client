import React from "react";
import { Link } from "react-router-dom";
import Memories from "./Memories";

function Gallery() {
  return (
    <div className="route">
      <div className="p-3 bg-image lg:h-[340px] h-[200px] banner-background">
        <div className="flex justify-center items-center h-full lg:-mt-8">
          <div className="text-white text-center " data-aos="zoom-in">
            <p className="tracking-[8px] uppercase">Create-Eve Gallery</p>
            <p className="text-4xl text-center font-bold my-3">
              <span className="font-normal tracking-wide mr-2">Create-Eve</span>
              <span className=" text-[#ffbe30] uppercase">Gallery</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-3 lg:-mt-16 -mt-10 text-white ">
          <Link to="/" className="text-lg" data-aos="fade-right">
            Home
          </Link>
          <span>|</span>
          <p className="text-lg" data-aos="fade-left">
            Create-Eve Gallery
          </p>
        </div>
      </div>
      <Memories />
    </div>
  );
}

export default Gallery;

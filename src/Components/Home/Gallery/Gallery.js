import React from "react";
import { Link } from "react-router-dom";
import Memories from "../../Gallery/Memories";

function Gallery() {
  return (
    <div>
      <section className="overflow-hidden text-gray-700 w-full">
        <div className=" py-2 mx-auto ">
          <div className="mt-12 mb-14">
            <h1
              className="text-center uppercase my-5 text-gray-400 text-[20px] tracking-[10px]"
              data-aos="fade-right"
            >
              Create-Eve Gallery
            </h1>
            <h1
              className="text-4xl uppercase text-center title_line"
              data-aos="fade-left"
            >
              Beautiful & <span className="font-bold">Unforgettable Times</span>
            </h1>
          </div>
          <Memories />
        </div>
      </section>

      <div className="flex justify-center py-20">
        <Link
          to="/gallery"
          className="uppercase bg-gradient-to-r from-rose-600 to-pink-600 px-8 py-4 text-white font-semibold tracking-wider rounded-full"
        >
          view all gallery
        </Link>
      </div>
    </div>
  );
}

export default Gallery;

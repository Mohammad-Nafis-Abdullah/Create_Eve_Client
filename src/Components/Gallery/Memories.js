import React from "react";
import gallery1 from "../../asset/images/gallery/gallery1.jpg";
import gallery2 from "../../asset/images/gallery/gallery2.jpg";
import gallery3 from "../../asset/images/gallery/gallery3.jpg";
import gallery4 from "../../asset/images/gallery/gallery4.jpg";
import gallery5 from "../../asset/images/gallery/gallery5.jpg";
import gallery6 from "../../asset/images/gallery/gallery6.jpg";

function Memories() {
  return (
    <div className="py-5 px-3 max-w-7xl mx-auto ">
      <div className="flex flex-wrap -m-1 md:-m-2">
        <div className="flex flex-wrap w-1/2">
          <div
            className="w-1/2 overflow-hidden cursor-pointer"
            data-aos="zoom-out-right"
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-full h-full hover:scale-110 transition-all "
              src={gallery1}
            />
          </div>

          <div
            className="w-1/2 overflow-hidden cursor-pointer"
            data-aos="fade-down"
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-full h-full hover:scale-110 transition-all"
              src={gallery2}
            />
          </div>

          <div
            className="w-full h-[360px] overflow-hidden cursor-pointer"
            data-aos="fade-right"
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-full h-full hover:scale-110 transition-all "
              src={gallery3}
            />
          </div>
        </div>

        <div className="flex flex-wrap w-1/2">
          <div
            className="w-full h-[360px] overflow-hidden cursor-pointer"
            data-aos="fade-left"
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-full h-full hover:scale-110 transition-all "
              src={gallery4}
            />
          </div>

          <div
            className="w-1/2 overflow-hidden cursor-pointer"
            data-aos="fade-up"
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-full h-full hover:scale-110 transition-all "
              src={gallery5}
            />
          </div>

          <div
            className="w-1/2 overflow-hidden cursor-pointer"
            data-aos="zoom-out-left"
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-full h-full hover:scale-110 transition-all"
              src={gallery6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Memories;

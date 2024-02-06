/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import sponser from "../../../asset/Client/image1.png";
import "./PartnerClient.css";
import Slider from "react-slick";

const PartnerClient = () => {
  const singleSponser = [0, 1, 2, 3, 4, 5];
  const sponserCount = [0, 1, 2];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
  };

  return (
    <div id="partner-client" className="mb-20 2xl:max-w-7xl mx-auto">
      <div className="px-5 sm:px-56 text-center pt-20 pb-14">
        <h5
          style={{ wordSpacing: "4px", letterSpacing: "5px" }}
          className="text-base sm:text-lg text-gray-500 mb-4"
        >
          WE ARE CREATE-EVE
        </h5>
        <h1 className="text-3xl sm:text-5xl mb-5 sm:mb-7">
          We Have <span className="font-bold">Best Partners & Clients</span>
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dollor site amet the best consectuer adipiscing elites sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat insignia the consectuer adipiscing elit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-3 sm:mx-20">
        <div className="relative pl-16 pb-14 sm:pb-0">
          <span className="sponser-title uppercase">
            <span className="font-semibold ml-1 text-highlight">
              Create-EVE
            </span>{" "}
            Review
          </span>
          <Slider {...settings}>
            {sponserCount?.map((sc, index) => (
              <div key={index} className="grid grid-cols-1">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {singleSponser?.map((h, index) => (
                    <div
                      key={index}
                      className="px-8  py-10  border backgroundSet"
                    >
                      <img className="w-52  h-14 " src={sponser} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="myclass">
          <h4
            style={{ letterSpacing: "4px" }}
            className="mt-9 mb-4 text-lg text-highlight text-center uppercase"
          >
            Testimonial
          </h4>
          <h1 className="text-center text-5xl text-white">
            Client <span className="font-bold">Says</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PartnerClient;

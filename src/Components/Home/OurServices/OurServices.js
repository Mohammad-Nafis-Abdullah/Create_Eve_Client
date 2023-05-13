/* eslint-disable no-unused-vars */
import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import Slider from "react-slick";
import "./OurServices.css";
import { useNavigate } from "react-router-dom";
import useFetch from "./Hook/useFetch";
import ServiceCard from "./ServiceCard";

export default function OurServices() {
  const serviceInfo = useFetch("https://create-eve-server.onrender.com/packages");

  const NextArrow = ({ onClick }) => {
    return (
      <div className="myArrow right" onClick={onClick}>
        <BiRightArrow className="text-4xl relative right-5" />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="myArrow left" onClick={onClick}>
        <BiLeftArrow className="text-4xl relative left-5" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    className: "px-3 max-w-7xl mx-auto",
  };

  return (
    <div className="py-10 px-3 max-w-7xl mx-auto bg-gray-100">
      <div className="mt-6 mb-14">
        <h1 className="text-center uppercase my-5 text-gray-400 text-[18px] tracking-[10px]">
          Create-Eve
        </h1>
        <p className="text-4xl tracking-wider text-center">
          Our <span className="font-bold">Packages</span>
        </p>
      </div>

      <div>
        <Slider {...settings}>
          {serviceInfo?.map((service, index) => (
            <ServiceCard key={service?._id} service={service} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./UpcomingEvent.css";
import Event from "./Event";
import Loading from "../../Share/Loading/Loading";
import { useGetUpcomingEventQuery } from "../../../Features/AllUpcomingEvent";

const UpcommingEvent = () => {
  // const events = [astronaut, celebrating, education];
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight className="text-4xl" />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft className="text-4xl" />
      </div>
    );
  };
  const [imageIndex, setImageIndex] = useState(0);

  const { data, error, isLoading, isSuccess, isError } = useGetUpcomingEventQuery();

  const upComingSettings = {
    className: "center",
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <>
      {isLoading && <Loading />}
      {isError && error.message}
      {isSuccess &&
        <div className="container mx-auto px-10 pt-16"
          id="upcoming-event"
        >
          <div className="space-y-2 py-3">
            <h1 className="text-center uppercase text-gray-400 text-[18px] tracking-[10px]">
              Upcoming Events
            </h1>
            <p className="text-5xl tracking-wider text-center">
              Latest <span className="font-bold">Awesome Events</span>
            </p>
          </div>
          <div>
            <Slider {...upComingSettings} className="px-5 overflow-visible">
              {data?.map((event, idx) => (
                <Event
                  key={event._id}
                  event={event}
                  idx={idx}
                  imageIndex={imageIndex}
                />
              ))}
            </Slider>
          </div>
        </div>
      }
    </>
  );
};

export default UpcommingEvent;

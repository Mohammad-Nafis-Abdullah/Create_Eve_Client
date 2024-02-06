import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const EventBooking = () => {
  const eventDetails = useLocation()?.state;

  useEffect(()=> {
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="route">
      <div className="py-20 bg-[url('/src/asset/12tmag-switzerland-slide-E5KB-superJumbo.jpg')] bg-fixed bg-no-repeat bg-cover text-center">
        <h4
          style={{ wordSpacing: "4px", letterSpacing: "5px" }}
          className="font-semibold text-lg text-white uppercase"
        >
          Package Booking
        </h4>
        <h2 className="text-5xl font-semibold mt-5 text-white space-x-1 uppercase">
          Create-Eve <span className="font-bold text-highlight">Booking</span>
        </h2>
        <p className="text-white mt-12 font-bold">
          <span className="pr-8 border-r-2">Home</span>
          <span className="pl-8">Booking</span>
        </p>
      </div>
      <div className="2xl:max-w-7xl mx-auto p-3 text-center">
        <h3 className="text-2xl sm:text-3xl">
          Please Complete Payment{" "}
          <span className="font-bold text-highlight">Within 12 Hours.</span>
        </h3>
      </div>
      <OrderSummary eventDetails={eventDetails} />
    </div>
  );
};

export default EventBooking;

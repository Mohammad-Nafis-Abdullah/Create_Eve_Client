import React from "react";
import { Link } from "react-router-dom";
import { closeModal } from "../Prebuild/Modal";

const ServiceList = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <ul
        onClick={(e) => {
          e.target.tagName === "A" && closeModal();
        }}
        className="text-left bg-slate-100 border-2 rounded max-w-sm w-full font-bold"
      >
        <li>
          <Link
            className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block"
            to="/catering"
          >
            1. Catering
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block"
            to="/audiovisual"
          >
            2. Audiovisual
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block"
            to="/sound-lighting"
          >
            3. Sound And Lighting
          </Link>
        </li>
        {/* <li>
          <Link
            className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block"
            to="/event-linen"
          >
            4. Event Linen Rentals
          </Link>
        </li> */}
        {/* <li>
                    <Link className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block" to="/destination">
                        5. Destination Management
                    </Link>
                </li>
                <li>
                    <Link className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block" to="/logistics-registration">
                        6. Logistic And Registration
                    </Link>
                </li> */}
        {/* <li>
          <Link
            className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block"
            to="/venue-facility"
          >
            5. Venue & Facility Negotiation
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-highlight p-3 transition-colors cursor-pointer duration-300 block"
            to="/photography"
          >
            6. Videography & Photography
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default ServiceList;

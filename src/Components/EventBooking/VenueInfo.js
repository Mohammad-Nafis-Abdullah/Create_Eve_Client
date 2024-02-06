import {
  faChevronUp,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { FaLink, FaFacebookF, FaTwitter } from "react-icons/fa";

const VenueInfo = () => {
  return (
    <div className="bg-white">
      <div className="mt-8 p-8 border-b">
        <div className="grid grid-cols-12">
          <div className="col-span-2 flex flex-col justify-center">
            <AiFillEnvironment className="text-5xl bg-amber-400 p-3 text-white rounded-full" />
          </div>
          <div className="col-span-9 pl-5">
            <h4 style={{ color: "#333333" }} className="font-semibold">
              event location
            </h4>

            <h3 className="text-lg font-bold uppercase">Vanilla Hotel</h3>
          </div>
          <div className="col-span-1 flex items-center">
            <FontAwesomeIcon
              className="text-xs bg-gray-400 p-1 text-white rounded-full"
              icon={faChevronUp}
            />
          </div>
        </div>
      </div>

      <div className="p-8 border-b">
        <span className="bg-slate-100 px-8 py-3 inline-block font-bold text-highlight">
          Istanbul Turkey
        </span>
        <ul className="flex flex-col gap-3 mt-8 text-sm pb-8">
          <li className="flex items-center">
            <span>
              <FontAwesomeIcon
                className="text-highlight text-lg mr-2"
                icon={faCircleArrowRight}
              />
            </span>
            <span>Bayezid II Mosque and Beyazid Square</span>
          </li>

          <li className="flex items-center">
            <span>
              <FontAwesomeIcon
                className="text-highlight text-lg mr-2"
                icon={faCircleArrowRight}
              />
            </span>
            <span>Istanbul, IS 240012</span>
          </li>

          <li className="flex items-center">
            <span>
              <FontAwesomeIcon
                className="text-highlight text-lg mr-2"
                icon={faCircleArrowRight}
              />
            </span>
            <span>Thursday, December 26, 2018</span>
          </li>

          <li className="flex items-center">
            <span>
              <FontAwesomeIcon
                className="text-highlight text-lg mr-2"
                icon={faCircleArrowRight}
              />
            </span>
            <span>
              From <b className="mx-1">15.00 PM</b> to{" "}
              <b className="mx-1">20.00 PM</b> (EST)
            </span>
          </li>
        </ul>
        <button className="py-4 px-9 custom-btn rounded-full uppercase font-semibold text-white">
          Add To My Calender
        </button>
      </div>

      <div className="p-8 border-b">
        <div className="grid grid-cols-12">
          <div className="col-span-2 flex flex-col justify-center">
            <FaLink className="text-5xl bg-amber-400 p-3 text-white rounded-full" />
          </div>
          <div className="col-span-9 pl-5">
            <h4 style={{ color: "#333333" }} className="font-semibold">
              contact information
            </h4>
            <h3 className="text-lg font-bold uppercase">Create-Eve Event</h3>
          </div>
          <div className="col-span-1 flex items-center">
            <FontAwesomeIcon
              className="text-xs bg-gray-400 p-1 text-white rounded-full"
              icon={faChevronUp}
            />
          </div>
        </div>
      </div>

      <div className="p-8 border-b">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div>
              <FaFacebookF className="text-4xl bg-amber-400 p-2 text-white rounded-full" />
            </div>
            <div className="pl-5">
              <h3 className="text-base font-bold">facebook.com/create_eve</h3>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <FaTwitter className="text-4xl bg-amber-400 p-2 text-white rounded-full" />
            </div>
            <div className="pl-5">
              <h3 className="text-base font-bold"> twitter.com@create-eve</h3>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <FaLink className="text-4xl bg-amber-400 p-2 text-white rounded-full" />
            </div>
            <div className="pl-5">
              <h3 className="text-base font-bold">http://www.create.eve.com</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo;

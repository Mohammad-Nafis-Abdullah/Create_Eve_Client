import React from "react";
import { GiShakingHands } from "react-icons/gi";
import { GiBalloons } from "react-icons/gi";
import { FaGlassCheers } from "react-icons/fa";
import { FiFilm } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="p-5 py-10 bg-gray-100 ">

      <section className="flex flex-wrap items-center justify-center max-w-7xl mx-auto">
        <div className="grow-[1] basis-96">
          <div className="border-t-2 w-[60px] border-[#fd1d1d]" />
          <h1 className="uppercase my-5 text-gray-400 text-[20px] tracking-[10px]">
            We are Create-Eve
          </h1>
          <h1 className="text-4xl font-bold my-4">
            A Great <br /> Events Management
          </h1>
          <p className="text-lg">
            Create Eve Event Planner specialises in large-scale events for
            individual and public clients. Our in-house team of designers and
            architects creates environments that combine advanced technology
            with refined craftsmanship.
          </p>
          <div className="flex justify-center mt-10 mb-8 lg:mb-0">
            <Link
              to="/about"
              className="uppercase bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-3 rounded-full text-white font-semibold tracking-widest"
            >
              About Create-Eve
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grow-[2]">
          <div className="h-[230px] border flex gap-y-3 flex-col justify-center items-center">
            <GiShakingHands className={`text-5xl text-rose-600`} />
            <div>
              <p className="text-center font-bold">Friendly Team</p>
              <p className="text-center text-sm text-gray-500">
                More than 200 teams
              </p>
            </div>
          </div>

          <div className="h-[230px] border flex gap-y-3 flex-col justify-center items-center">
            <GiBalloons className="text-5xl text-rose-600" />
            <div>
              <p className="text-center font-bold">Perfact Vanues</p>
              <p className="text-center text-sm text-gray-500">
                Perfact Vanues
              </p>
            </div>
          </div>

          <div className="h-[230px] border flex gap-y-3 flex-col justify-center items-center">
            <FaGlassCheers className="text-5xl text-rose-600" />
            <div>
              <p className="text-center font-bold">Unique Scenario</p>
              <p className="text-center text-sm text-gray-500">
                We thinking out of the box
              </p>
            </div>
          </div>

          <div className="h-[230px] border flex gap-y-3 flex-col justify-center items-center">
            <FiFilm className="text-5xl text-rose-600" />
            <div>
              <p className="text-center font-bold">
                Unforgettable Time
              </p>
              <p className="text-center text-sm text-gray-500">
                We make you perfect event
              </p>
            </div>
          </div>

          <div className="h-[230px] border flex gap-y-3 flex-col justify-center items-center">
            <FiPhoneCall className="text-5xl text-rose-600" />
            <div>
              <p className="text-center font-bold">
                24/7 Hours Support
              </p>
              <p className="text-center text-sm text-gray-500">
                Anytime anywhere
              </p>
            </div>
          </div>

          <div className="h-[230px] border flex gap-y-3 flex-col justify-center items-center">
            <HiLightBulb className="text-5xl text-rose-600" />
            <div>
              <p className="text-center font-bold">Briliant Idea</p>
              <p className="text-center text-sm text-gray-500">
                We have million idea
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;

/* eslint-disable no-unused-vars */
import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../Home/OurServices/Hook/useFetch";
import useAdmin from "../../Hooks/useAdmin";
import useLocalStorage, { getStorage } from "../../Hooks/useLocalStorage";
import useRefetch from "../../Hooks/useRefetch";
import { instantModal } from "../../Prebuild/Modal";
import Loading from "../../Share/Loading/Loading";
import ServiceCardContainer from "../ServiceCardContainer";
import ServiceConfigModal from "../ServiceConfigModal";

function Lighting() {
  const [lighting, setLighting, clearLighting] = useLocalStorage("lighting", {});
  const { data: lightings, loading, refetch } = useRefetch(`https://create-eve-server.onrender.com/services/lighting`, []);

  return (
    <div className="route">
      <div className="bg-image h-[300px] banner-background" style={{
        backgroundImage: 'url(https://t3.ftcdn.net/jpg/02/99/02/34/360_F_299023448_5X1XWU14OqsC43cU6ddeim20nNwW4CG0.jpg)'
      }}>
        <div className="flex justify-center items-center content-center flex-wrap h-full bg-black/50">
          <div className="text-white text-center basis-full grow">
            <p className="tracking-[8px]">ALL YOU NEED TO KNOW</p>
            <p className="text-4xl text-center font-bold my-3">
              <span className="text-[#ffbe30] mr-2">SOUND AND LIGHTING</span>
              <span className="font-normal tracking-wide">SERVICES</span>
            </p>
          </div>

          <div className="flex justify-center items-center gap-x-3 text-white ">
            <Link to="/" className="text-lg">
              Home
            </Link>
            <span>|</span>
            <Link to="/contact-us" className="text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:py-20">
        <div className="flex justify-center lg:-mb-5">
          <p className="text-3xl font-bold">
            LET
            <span className="text-highlight tracking-widest mx-2">EVENTY</span>
            PLAN YOUR THEME
          </p>
        </div>

        {loading && <Loading />}

        {/* Lighting services */}
        <ServiceCardContainer services={lightings} setServiceStore={setLighting} refetch={refetch} />

      </div>

      <div className="lg:py-20 bg-gray-100 ">
        <div className="grid lg:flex justify-center gap-x-6">
          <div className="lg:w-4/12 flex justify-center items-center">
            <img
              src="https://i.ibb.co/p3c7zJf/Sound-Lighting-System-both.jpg"
              alt=""
              className="h-80"
            />
          </div>

          <div className="lg:w-4/12 px-3 lg:px-0 py-10 lg:py-0">
            <p
              className="uppercase text-3xl font-semibold"
            >
              {" "}
              <span className="text-highlight tracking-widest">
                create-eve
              </span>{" "}
              SOUND AND LIGHTING
            </p>
            <p className="py-8">
              We used many types of different lighting to deliver a top notch
              event. We incorporated the country flag throughout the theme. We
              also used stage lighting for the musical performances, dance floor
              and dining areas. For sound, we prepare for live music and speech
              delivery.
            </p>
            <h3 className="signature text-4xl tracking-wider text-right">Create-eve Event</h3>
          </div>
        </div>
      </div>

      {/* confession */}
      <div className="py-10 lg:pt-24">
        <div className="flex justify-center lg:-mb-5">
          <p className="text-3xl font-bold">
            <span className="text-highlight tracking-widest">SPECIALTY </span>
            <span className=""> LIGHTING</span>
          </p>
        </div>

        <div className="lg:flex justify-center items-center gap-x-7 lg:h-80">
          <div className="lg:w-4/12 px-3 lg:px-0">
            <p className="lg:tracking-[5px] font-semibold">
              SPECIAL EVENT LIGHTING SERVICES
            </p>
            <p className="mt-5">
              Not all lighting is the same. Our expert team is available to
              asses voltage requirements and when necessary, we staff a Master
              Electrician who can remain on-site throughout your event. Many
              museums and private venues in and around DC require an on-site
              electrician. For many large scale lighting, a permit may be
              required. No worries, we are well connected when it comes to
              getting the right permits at the last minute.
            </p>
          </div>
          <div className="grid gap-y-3 lg:w-4/12 mt-6 lg:mt-0 px-3 lg:px-0">
            <p className="bg-amber-400 p-2 text-gray-600">
              BACKGROUNDS & FAUX SCENERY
            </p>
            <p className="bg-amber-400 p-2 text-gray-600">
              LIVE TICKET EVENTS LIGHTING
            </p>
            <p className="bg-amber-400 p-2 text-gray-600">
              SKYTRACKER SERVICES AND PERMITS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lighting;

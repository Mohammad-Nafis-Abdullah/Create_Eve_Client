/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage, { getStorage } from "../../Hooks/useLocalStorage";
import useRefetch from "../../Hooks/useRefetch";
import { instantModal } from "../../Prebuild/Modal";
import Loading from "../../Share/Loading/Loading";
import ServiceCardContainer from "../ServiceCardContainer";
import ServiceConfigModal from "../ServiceConfigModal";
import { useQueryFetch } from "../../Hooks/useQueryFetch";

function Audiovisual() {
  const navigate = useNavigate();
  const [audio, setAudio, clearAudio] = useLocalStorage("audio", {});
  // const { data: audios, loading, refetch } = useRefetch(`http://localhost:5000/services/audiovisual`, []);
  const { data: audios, loading, refetch } = useQueryFetch('audios', `http://localhost:5000/services/audiovisual`);

  return (
    <div className="route">
      {loading && <Loading />}
      <div className="bg-image h-[300px] banner-background" style={{
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/58ab1e8abe6594a08431ecfb/1487712703490-BTG81NCCWEWH1LX9PNB7/promo_02.png)'
      }}>
        <div className="flex justify-center items-center flex-wrap content-center h-full bg-black/50">

          <div className="text-white text-center basis-full grow">
            <p className="tracking-[8px]">ALL YOU NEED TO KNOW</p>
            <p className="text-4xl text-center font-bold my-3">
              <span className="text-[#ffbe30] mr-2">AUDIOVISUAL</span>
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

      <div className="lg:py-20 bg-gray-100 ">
        <div className="grid lg:flex justify-center gap-x-6">
          <div className="lg:w-4/12 flex justify-center items-center">
            <img
              src="https://i.ibb.co/HBjW6BD/adv.jpg"
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
              AUDIOVISUAL
            </p>
            <p className="py-8">
              Through our Public Relations partner, we manage speeches,
              delivery, audiovisual, presentations for small and large meetings.
              We support: PowerPoint presentations, Webinars, Skype, Digital and
              Social Media. We have managed events from conceptualization to
              completion for several historical and highly publicized events.
              Our event planning logistics and registration services can meet
              the needs of any size conference, convention or meeting. We also
              handle logistics for social events, fundraisers and political
              events.
            </p>
            <h3 className="signature text-4xl tracking-wider text-right">Create-eve Event</h3>
          </div>
        </div>
      </div>

      <div className="lg:py-20">
        <div className="flex justify-center lg:-mb-5">
          <p className="text-3xl font-bold">
            <span className="text-highlight tracking-widest mr-2">EVENTY</span>
            AUDIOVISUAL SERVICES
          </p>
        </div>

        {/* Audio services */}
        <ServiceCardContainer services={audios} setServiceStore={setAudio} refetch={refetch} />

      </div>
    </div>
  );
}

export default Audiovisual;

/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useRefetch from "../../Hooks/useRefetch";
import Loading from "../../Share/Loading/Loading";
import useLocalStorage, { getStorage } from "../../Hooks/useLocalStorage";
import "../Services.css";
import { toast } from "react-toastify";
import { instantModal } from "../../Prebuild/Modal";
import ServiceConfigModal from "../ServiceConfigModal";
import ServiceCardContainer from "../ServiceCardContainer";
import { useQueryFetch } from "../../Hooks/useQueryFetch";


function Catering() {
  const navigate = useNavigate();
  const [catering, setCatering, clearCatering] = useLocalStorage("catering", {});
  // const { data: caterings, loading, refetch } = useRefetch(`/services/catering`, []);
  const { data: { data: caterings }, loading, refetch } = useQueryFetch('caterings', `/services/type/catering`);

  return (
    <div className="route">
      {/* catering banner */}
      <div className={`bg-image h-[300px] banner-background`} style={{
        backgroundImage: 'url(https://ravishmag.co.uk/wp-content/uploads/2022/07/Starting-a-Luxury-Catering-Business-.jpg)'
      }}>
        <div className="flex justify-center items-center content-center gap-y-3 flex-wrap h-full bg-black/50">

          <div className="text-white text-center basis-full">
            <p className="tracking-[8px] uppercase">All You Need to Know</p>
            <p className="text-4xl text-center font-bold inline-flex gap-5 tracking-wider">
              <span className="text-[#ffbe30] uppercase">Catering</span>
              <span className="font-normal tracking-wide uppercase">Services</span>
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

      {loading && <Loading />}


      {/* catering services */}
      <ServiceCardContainer services={caterings} setServiceStore={setCatering} refetch={refetch} />

      {/* catering speciality */}
      <div className="lg:py-20 bg-gray-100 ">
        <div className="grid lg:flex justify-center gap-x-6">
          <div className="lg:w-4/12 flex justify-center items-center">
            <img
              src="https://www.tonypackoscatering.com/clientuploads/directory/Slideshow/Catering3.jpg"
              alt=""
              className="h-80 object-cover"
            />
          </div>

          <div className="lg:w-4/12 px-3 lg:px-0 py-10 lg:py-0">
            <p
              className="uppercase text-3xl font-semibold"
            >
              <span className="text-highlight tracking-widest">
                Create-Eve {" "}
              </span>
              CATERING
            </p>
            <p className="py-8">
              We use Fine China, Specialty Linens, and other expertise to
              deliver a top notch event catering. Passed Hors D’oeuvres, plated
              dinners and buffets are one of many options we offer our clients.
              We incorporate client branding throughout the catered cuisine. Our
              caterers use only the freshest ingredients and offerings include
              Vegetarian Catering, Vegan Catering and other specialty catering
              services. CBD menus can also be customized to accommodate
              international, indigenous cuisine.
            </p>
            <h3 className="signature text-4xl tracking-wider text-right">Create-eve Event</h3>
          </div>
        </div>
      </div>

      {/* confession */}
      <div className="py-10 lg:pt-24">
        <div className="flex justify-center lg:-mb-5">
          <p
            className="lg:text-3xl font-bold px-2 text-center"
          >
            <span className="text-highlight tracking-widest mr-2">HEALTHY</span>
            EATING AND
            <span className="text-highlight tracking-widest mr-2">
              {" "}
              VEGETARIAN
            </span>
            OPTIONS
          </p>
        </div>

        <div className="lg:flex justify-center items-center gap-x-7 lg:h-80 pt-5 lg:pt-0">
          <div className="lg:w-4/12 px-3 lg:px-0">
            <p className="lg:tracking-[5px] font-semibold">
              VEGETARIAN AND VEGAN MEAL PREPARATION
            </p>
            <p className="mt-5">
              Sometimes it is difficult to be at a swanky event and the only
              meal available to vegetarians and vegans are steamed veggies. We
              can prepare flavorful vegetarian meals with 3 – 4 options. We can
              even provide certified organic ingredients for a nominal fee.
            </p>
          </div>
          <div className="grid gap-y-3 lg:w-4/12 mt-6 lg:mt-0 px-3 lg:px-0">
            <p className="bg-amber-400 p-2 text-gray-600">
              Vegan Menus (No Animal Flesh, Milk, Wheat or Eggs)
            </p>
            <p className="bg-amber-400 p-2 text-gray-600">
              Vegetarian (No Meat, Vegetables, Eggs, Milk, Wheat or Soy)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catering;

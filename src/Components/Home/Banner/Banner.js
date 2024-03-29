/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./Banner.css";
import { instantModal } from "../../Prebuild/Modal";
import { useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import ConfigBannerModal from "./ConfigBannerModal";
import Loading from "../../Share/Loading/Loading";
import { imgUrl } from "../../Hooks/useMyStorage";
import Slider from "react-slick";
import { useQueryFetch } from "../../Hooks/useQueryFetch";
import { StateContext } from "../../../App";
import staticImg from "../../../asset/Banner/slider-bg2.jpg"

const Banner = () => {
  const [state] = useContext(StateContext);
  const navigate = useNavigate();

  const { data: { data: bannerPhotos }, loading, refetch } = useQueryFetch('banner', "/home-banners");

  const configBanner = () => {
    instantModal(<ConfigBannerModal bannerPhotos={bannerPhotos} refetch={refetch} />);
  };

  // react slicker slides setting
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    swipeToSlide: false,
    pauseOnHover: false,
    speed: 1000,
    autoplaySpeed: 4000,
    arrows: false,
    className: 'mx-auto',
  };

  return (
    <div className="relative h-screen">
      {/* {loading && <Loading />} */}
      {(state.user?.role === 'owner' || state.user?.role === 'admin') && (
        <div
          onClick={configBanner}
          className="absolute left-0 top-[30vh] z-20 w-10 h-10 bg-highlight p-1 cursor-pointer select-none active:scale-95"
          title="Configure banner images"
        >
          <AiFillSetting className="h-full w-full text-black animate-slowSpin" />
        </div>
      )}

      {
        bannerPhotos?.length ?
          <Slider {...settings}>
            {
              bannerPhotos?.map(banner => {
                return (
                  <div key={banner._id} className="h-screen">
                    <img className='h-full object-cover w-full' key={banner._id} src={imgUrl(banner?.img)} alt='' />
                  </div>
                )
              })
            }
          </Slider> :
          <div className="h-screen">
            <img className='h-full object-cover w-full' src={staticImg} alt='' />
          </div>
      }


      <article className="absolute top-0 right-0 bottom-0 left-0 bg-black/60 pt-[108px] flex flex-col justify-center items-center gap-y-6 openSans">
        <h3 className="text-white font-bold text-3xl sm:text-5xl">Create Eve</h3>
        <h1 className="text-amber-400 font-bold text-5xl sm:text-7xl">Event Planner</h1>
        <h6 className="text-white font-bold operator italic tracking-widest">Event Should Be Perfect</h6>
        <button onClick={() => navigate('/about')} className="text-gray-900 font-bold text-xl roboto bg-amber-400 px-7 py-2 rounded-full active:scale-95 transition-transform">About</button>
      </article>

    </div>
  );
};

export default Banner;

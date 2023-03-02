/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
import { instantModal } from "../../Prebuild/Modal";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import ConfigBannerModal from "./ConfigBannerModal";
import useAdmin from "../../Hooks/useAdmin";
import Loading from "../../Share/Loading/Loading";
import useRefetch from "../../Hooks/useRefetch";

const Banner = () => {
  const [admin, adminLoading] = useAdmin();
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const {
    data: bannerPhotos,
    loading,
    refetch,
  } = useRefetch("http://localhost:5000/home-banner");

  const configBanner = () => {
    instantModal(<ConfigBannerModal refetch={refetch} />);
  };

  return (
    <div className="relative">
      {(adminLoading || loading) && <Loading />}
      {admin && (
        <div
          onClick={configBanner}
          className="absolute left-0 top-[30vh] z-20 w-10 h-10 bg-highlight p-1 cursor-pointer select-none active:scale-95"
          title="Configure banner images"
        >
          <AiFillSetting className="h-full w-full text-black animate-slowSpin" />
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // pagination={pagination}
        className="mySwiper"
      >
        {bannerPhotos.map((banner, index) => (
          <SwiperSlide key={index}>
            <div id="slider_content">
              <>
                <div className="relative">
                  <img
                    src={`http://localhost:5000/serviceImg/${banner?.img}`}
                    alt=""
                  />
                </div>
                <div id="slider_bg">
                  <div id="banner_content">
                    <div className="banner_text">
                      <h2 className="text-white text-xl md:text-5xl ">
                        Create Eve
                      </h2>
                      <h1 className="text-white text-3xl md:text-5xl lg:text-7xl py-8 font-semibold">
                        Event Planner
                      </h1>
                      <h4 className="text-white text-xs md:text-base md:tracking-[.4rem] tracking-[1px] ">
                        Event Sould Be Perfect
                      </h4>
                    </div>
                    <div className="banner_button pt-14">
                      <Link
                        to="/about"
                        className="text-white  text-xs md:text-base py-3 px-6 md:px-14 capitalize font-semibold rounded-full transition-all ease-in-out duration-500"
                        id="bannerAboutBtn"
                      >
                        about
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

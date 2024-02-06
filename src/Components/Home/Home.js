import React from "react";
import Blogs from "./Blog/Blogs";
import Staffs from "./Staffs/Staffs";
import AboutUs from "./AboutUs/AboutUs";
import Gallery from "./Gallery/Gallery";
import Offer from "./Offer/Offer";
import PartnerClient from "./Partner&Client/PartnerClient";
import Banner from "./Banner/Banner";
import OurServices from "./OurServices/OurServices";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Offer />
      <Gallery />
      <OurServices />
      <Staffs />
      <PartnerClient />
      <Blogs />
    </div>
  );
};

export default Home;

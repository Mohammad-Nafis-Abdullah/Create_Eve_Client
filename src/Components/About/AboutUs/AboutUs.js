import React from "react";
import { Link } from "react-router-dom";
import Staffs from "../../Home/Staffs/Staffs";
import Address from "./Address";
import Advantage from "./Advantage";
import Special from "./Special";
import TestimonialClient from "./TestimonialClient";

function AboutUs() {
  return (
    <div className="route">
      <div className="p-3 bg-image lg:h-[340px] h-[200px] banner-background">
        <div className="flex justify-center items-center h-full lg:-mt-8">
          <div className="text-white text-center " data-aos="zoom-in">
            <p className="tracking-[8px] uppercase">Create-Eve Gallery</p>
            <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
              <span className=" text-[#ffbe30]">about</span>
              <span className="font-normal tracking-wide">Create-Eve</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-3 lg:-mt-16 -mt-10 text-white ">
          <Link to="/" className="text-lg" data-aos="fade-right">
            Home
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 justify-around py-20 bg-gray-100 lg:pl-20 text-justify">
        <div className="lg:-mr-96 grid items-center lg:w-96 px-10 lg:px-0">
          <>
            <div
              className="border-t-2 w-[60px] -ml-4 border-[#fd1d1d] "
              data-aos="fade-left"
            />
            <h1 className="uppercase my-5 text-gray-400 text-[20px] tracking-[10px]">
              We Are Create-Eve
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
          </>
        </div>
        <div className="px-5 lg:px-0">
          <div className="lg:w-96 mt-10">
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">Our Initial Steps</p>
              <div
                className="border-b-4 w-12 ml-1 border-[#ffbe30]"
                data-aos="fade-left"
              />
            </div>
            <div>
              <p className="lg:my-10 my-4">
                We begin by listening to your goals and ideas. Then we give our
                imagination free reign to develop an innovative guiding concept.
                We illustrate the overall design with detailed sketches.
              </p>
              <p className="font-bold">
                We finalize all the details that create the space. We consider
                how the space will look by day and by night, how people will
                move through it, and how to minimize wear and tear.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 lg:px-0">
          <div className="lg:w-96 mt-10">
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">Our Final Steps</p>
              <div
                className="border-b-4 w-12 ml-1 border-[#ffbe30]"
                data-aos="fade-left"
              />
            </div>
            <div>
              <p className="lg:my-10 my-4">
                Onsite, we spend hours installing thousands of components that
                make each project unique. We handpick the expert leader of each
                team—lighting, guide these professionals every step of the way.
                The result is a space in which all the details come together to
                create a harmonious whole. After our team members have completed
                their work, we take a critical look at the entire project.
              </p>

              <p className="font-bold">
                During this final walk-through, we make subtle adjustments in
                keeping with our client’s expectations. By taking the time to
                fine-tune every aspect, we ensure a seamless project launch.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Advantage />
      <TestimonialClient />
      <Staffs />
      <Special />
      <Address />
    </div>
  );
}

export default AboutUs;

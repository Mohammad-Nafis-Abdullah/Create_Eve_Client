import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";
import { AiOutlineGooglePlus, AiOutlineInstagram } from "react-icons/ai";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import footerImg1 from "../../../asset/footerImg/img1.jpg";
import footerImg2 from "../../../asset/footerImg/img2.jpg";
import footerImg3 from "../../../asset/footerImg/img3.jpg";
import footerImg4 from "../../../asset/footerImg/img4.jpg";
import footerImg5 from "../../../asset/footerImg/img5.jpg";
import footerImg6 from "../../../asset/footerImg/img6.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-[#333333] text-white">
        <div>
          <div className="flex items-center">
            <img
              className="ml-[-1rem]"
              src="https://i.ibb.co/Qb1N5CN/Eventy-Logo.png"
              alt="logo"
            />
            <div className="uppercase">
              <h2 className="text-3xl text-white tracking-widest">
                Create-Eve
              </h2>
              <p className="text-[#FFBE30] text-lg">Event Planner</p>
            </div>
          </div>
          <div className="">
            <ul className="py-10">
              <li className="flex gap-4 items-center text-base py-1">
                <span className="text-[#FFBE30] text-2xl">
                  <MdLocationPin />
                </span>
                Chittagong,Bangladesh
              </li>
              <a href="mailto: create.eve@gmail.com">
                <li className="flex gap-4 items-center text-base py-1">
                  <span className="text-[#FFBE30] text-2xl">
                    <HiOutlineMail />
                  </span>
                  create.eve@gmail.com
                </li>
              </a>
              <a href="tel:+8801779895263">
                <li className="flex gap-4 items-center text-base py-1">
                  <span className="text-[#FFBE30] text-lg">
                    <FaPhoneAlt />
                  </span>
                  +8801779895263
                </li>
              </a>
            </ul>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold text-white">Network</h1>
            <ul className="flex gap-4 items-center text-base py-6">
              <li>
                <Link
                  to={"/facebook.com"}
                  className="text-2xl cursor-pointer hover:text-sky-500"
                >
                  <BsFacebook />
                </Link>
              </li>
              <li>
                <Link
                  to={"/google.com"}
                  className="text-4xl cursor-pointer hover:text-red-500"
                >
                  <AiOutlineGooglePlus />
                </Link>
              </li>
              <li>
                <Link
                  to={"/linkedin"}
                  className="text-2xl cursor-pointer hover:text-sky-500"
                >
                  <BsLinkedin />
                </Link>
              </li>
              <li>
                <Link
                  to={"/instagram.com/"}
                  className="text-3xl cursor-pointer hover:text-red-500"
                >
                  <AiOutlineInstagram />
                </Link>
              </li>
              <li>
                <Link
                  to={"/twitter.com"}
                  className="text-2xl cursor-pointer hover:text-sky-500"
                >
                  <BsTwitter />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="">
            <div className="">
              <h3 className="footer-item-title text-3xl capitalize text-white">
                useful <strong className="text-[#ff960d]">links</strong>
              </h3>
              <ul className="py-6">
                <li className="text-base flex items-center gap-2  border-b border-slate-500 py-2 ">
                  <a
                    href="/about"
                    id="usefulHover"
                    className="flex gap-2 items-center"
                  >
                    <BiRightArrowAlt className="bg-zinc-500 w-5 h-5 rounded-full text-[#333333] " />{" "}
                    About Create-Eve
                  </a>
                </li>
                <li className="text-base flex items-center gap-2  border-b border-slate-500 py-2 ">
                  <a
                    href="/contact-us"
                    id="usefulHover"
                    className="flex gap-2 items-center"
                  >
                    <BiRightArrowAlt className="bg-zinc-500 w-5 h-5 rounded-full text-[#333333] " />{" "}
                    Contact us
                  </a>
                </li>
                <li className="text-base flex items-center gap-2  border-b border-slate-500 py-2 ">
                  <a
                    href="/home#upcoming-event"
                    id="usefulHover"
                    className="flex gap-2 items-center"
                  >
                    <BiRightArrowAlt className="bg-zinc-500 w-5 h-5 rounded-full text-[#333333] " />
                    Upcoming Events
                  </a>
                </li>
                <li className="text-base flex items-center gap-2  border-b border-slate-500 py-2 ">
                  <a
                    href="/home#partner-client"
                    id="usefulHover"
                    className="flex gap-2 items-center"
                  >
                    <BiRightArrowAlt className="bg-zinc-500 w-5 h-5 rounded-full text-[#333333] " />{" "}
                    Partners & Clients
                  </a>
                </li>
                <li className="text-base flex items-center gap-2  border-b border-slate-500 py-2 ">
                  <a
                    href="/home#venues"
                    id="usefulHover"
                    className="flex gap-2 items-center"
                  >
                    <BiRightArrowAlt className="bg-zinc-500 w-5 h-5 rounded-full text-[#333333] " />{" "}
                    Venues
                  </a>
                </li>
                <li className="text-base flex items-center gap-2  border-b border-slate-500 py-2 ">
                  <a
                    href="/faq"
                    id="usefulHover"
                    className="flex gap-2 items-center"
                  >
                    <BiRightArrowAlt className="bg-zinc-500 w-5 h-5 rounded-full text-[#333333] " />{" "}
                    Ask & Questions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="">
            <div className="">
              <h3 className="footer-item-title capitalize text-3xl text-white space-x-2">
                <span>Create-Eve</span>
                <strong className="text-[#ff960d]">instagram</strong>
              </h3>
              <ul className="py-10 grid grid-cols-3 gap-4 items-center">
                <li id="image_wrapper">
                  <div>
                    <img src={footerImg1} alt="" />
                  </div>
                  <div id="footerInstagramIcon">
                    <Link to="#!">
                      <AiOutlineInstagram />
                    </Link>
                  </div>
                </li>
                <li id="image_wrapper">
                  <img src={footerImg2} alt="" />
                  <span>
                    <Link to="#!">
                      <AiOutlineInstagram />
                    </Link>
                  </span>
                </li>
                <li id="image_wrapper">
                  <img src={footerImg3} alt="" />
                  <span>
                    <Link to="#!">
                      <AiOutlineInstagram />
                    </Link>
                  </span>
                </li>
                <li id="image_wrapper">
                  <img src={footerImg4} alt="" />
                  <span>
                    <Link to="#!">
                      <AiOutlineInstagram />
                    </Link>
                  </span>
                </li>
                <li id="image_wrapper">
                  <img src={footerImg5} alt="" />
                  <span>
                    <Link to="#!">
                      <AiOutlineInstagram />
                    </Link>
                  </span>
                </li>
                <li id="image_wrapper">
                  <img src={footerImg6} alt="" />
                  <span>
                    <Link to="#!">
                      <AiOutlineInstagram />
                    </Link>
                  </span>
                </li>
              </ul>
              <h4 className="followus-link text-white">
                Follow Our Instagram <a href="#!"> CREATE-EVE</a>
              </h4>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer px-10 py-4  border-[#333333] bg-[#1d1d1d] text-white">
        <div className="items-center grid-flow-col">
          <p className="m-0 text-base">
            ©2022{" "}
            <a href="#!" className="site-link">
              CreateEve.com
            </a>{" "}
            all right reserved, made with <i className="fas fa-heart"></i> by{" "}
            <a href="#!" className="author-link">
              <strong className="capitalize"> Create-Eve</strong>
            </a>
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <ul className="flex gap-4">
              <li>
                <a href="contact.html">Contact us</a>
              </li>
              <li>
                <a href="about.html">About us</a>
              </li>
              <li>
                <a href="#!">Site map</a>
              </li>
              <li>
                <a href="#!">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

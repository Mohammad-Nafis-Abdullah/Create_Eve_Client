/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { BiUser } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import TopnavBar from "../TopBar/TopnavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import { reload, signOut } from "firebase/auth";
import useRefetch from "../../Hooks/useRefetch";
import useAdmin from "../../Hooks/useAdmin";
import { StateContext } from "../../../App";
import { imgUrl } from "../../Hooks/useMyStorage";
import { GoChevronDown } from 'react-icons/go';


const Navbar = ({ location }) => {
  const [state, dispatch] = useContext(StateContext);
  const { pathname } = location;
  const routeName = pathname.slice("1");
  const navigate = useNavigate();
  const [admin, loading] = useAdmin();

  const {
    data: pkgs,
    loading: pkgLoading,
    refetch: pkgRefetch,
  } = useRefetch(`https://create-eve-server.onrender.com/packages`, []);

  const [navbarBg, setNavbar] = useState(false);
  const changeBg = () => {
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBg);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  const [user] = useAuthState(auth);

  const [show, setShow] = useState("hidden");

  const homeRoute = navbarBg
    ? "active_nav fixed left-0 right-0 top-0 text-white p-2"
    : "bg-transparent fixed left-0 right-0 top-0 text-white flex items-center p-2";

  const anotherRoute = `sticky left-0 right-0 top-0 shadow-lg`;

  const navStyle = ({ isActive }) => {
    return isActive ? "btnActive" : "btnInactive";
  };

  // profile photos load
  const {
    data: currentUser,
    loading: currentUserLoading,
    refetch: currentUserRefetch,
  } = useRefetch(`https://create-eve-server.onrender.com/single-user/${user?.uid}`);

  return (
    <section
      className={`${routeName ? anotherRoute : homeRoute} bg-white z-50`}
    >
      {routeName && <TopnavBar />}
      <div
        className={` ${routeName ? "bg-white text-black" : "bg-black/50 text-white"} flex justify-between items-center max-w-8xl w-full mx-auto p-3`}
        id="navbar"
      >
        {/* navbar icons and logo */}
        <div className="inline-flex items-center gap-0">
          {/* for mobile */}
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu bg-white text-black menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52"
            >
              <li>
                <Link to="/" className="uppercase">
                  Home
                </Link>
              </li>
              <li tabIndex="0">
                <Link to={pathname} className="uppercase">
                  packages
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </Link>
                <ul className="p-2" id="megaMenu" style={{ zIndex: "11111" }}>
                  {[...pkgs].map((pkg) => (
                    <li key={pkg._id}>
                      <Link
                        className="uppercase"
                        to={`/packages/${pkg.category}`}
                      >
                        {pkg.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* HERE THE SERVICES  */}
              <li tabIndex="0">
                <Link to={pathname} className="uppercase">
                  Services
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </Link>
                <ul
                  className="p-2 -ml-24"
                  id="megaMenu"
                  style={{ zIndex: "11111" }}
                >
                  <li>
                    <Link className="" to="/catering">
                      Catering
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/audiovisual">
                      Audiovisual
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/sound-lighting">
                      Sound And Lighting
                    </Link>
                  </li>
                </ul>
              </li>

              {!admin && (
                <li>
                  <Link className="uppercase" to="/event-booking">
                    Event Booking
                  </Link>
                </li>
              )}
              <li>
                <Link className="uppercase" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className="uppercase" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="uppercase" to="/contact-us">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="uppercase" to="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* logo */}
          <div className="inline-flex items-center">
            <img
              src="https://i.ibb.co/Qb1N5CN/Eventy-Logo.png"
              alt=""
              className="w-10"
            />
            <Link to="/" className="sm:text-3xl tracking-widest">
              CREATE-EVE
            </Link>
          </div>

        </div>

        {/* children */}
        <div className=" hidden xl:flex font-bold">
          <ul className="menu menu-horizontal gap-x-3">
            <li>
              <NavLink to="/" className={navStyle}>
                Home
              </NavLink>
            </li>

            <li tabIndex="0">
              <Link to={pathname} className="uppercase inline-flex gap-1 items-center">
                <span>packages</span>
                <GoChevronDown className="w-4 h-4"/>
              </Link>
              <ul className="p-2" id="megaMenu" style={{ zIndex: "11111" }}>
                <li>
                  <Link className="uppercase" to="/packages/wedding">
                    Wedding
                  </Link>
                </li>
                <li>
                  <Link className="uppercase" to="/packages/birthday">
                    Birthday
                  </Link>
                </li>
                <li>
                  <Link className="uppercase" to="/packages/walima">
                    Walima
                  </Link>
                </li>
                <li>
                  <Link className="uppercase" to="/packages/iftar-party">
                    Iftar Party
                  </Link>
                </li>
              </ul>
            </li>
            {/* HERE THE SERVICES */}
            <li tabIndex="0">
              <Link to={pathname} className={`uppercase inline-flex gap-1 items-center`}>
                SERVICES
                <GoChevronDown className="w-4 h-4"/>
              </Link>
              <ul className="p-2" id="megaMenu" style={{ zIndex: "11111" }}>
                <li>
                  <Link className="" to="/catering">
                    Catering
                  </Link>
                </li>
                <li>
                  <Link className="" to="/audiovisual">
                    Audiovisual
                  </Link>
                </li>
                <li>
                  <Link className="" to="/sound-lighting">
                    Sound And Lighting
                  </Link>
                </li>
              </ul>
            </li>

            {!admin && (
              <li>
                <NavLink className={navStyle} to="/event-booking">
                  Event Booking
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/gallery" className={navStyle}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={navStyle}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className={navStyle}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className={navStyle} to="/about">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-12">
          <div className="flex items-end justify-center">
            {!user ? (
              <Link to={"/authentication"} className="text-3xl">
                <BiUser />
              </Link>
            ) : (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex="0"
                    className=""
                    onClick={() => {
                      show === "hidden"
                        ? setShow("block")
                        : setShow("hidden");
                    }}
                  >
                    {currentUser?.userImg && (
                      <img
                        src={imgUrl(state.userImg || currentUser?.userImg)}
                        className="w-12 h-12 object-cover rounded-full"
                        alt=""
                      />
                    )}

                    {!currentUser?.userImg && (
                      <span className="">
                        <AiOutlineUser className="border-2 border-black text-black bg-white bg-opacity-50 text-4xl rounded-full" />
                      </span>
                    )}
                  </div>

                  <ul
                    tabIndex="0"
                    className={`dropdown-content menu p-2 shadow border-2 bg-white rounded-sm ${show} text-black text-center mt-5`}
                  >
                    <div className="grid gap-y-3 pt-7 pb-3">
                      <div className="bg-gray-200 grid justify-center p-4 rounded-sm">
                        <div className="flex justify-center -mt-11">
                          {currentUser?.userImg && (
                            <img
                              src={imgUrl(state.userImg || currentUser?.userImg)}
                              className="w-16 h-16 ring-2 ring-green-600 ring-offset-2 object-cover rounded-full bg-slate-100"
                              alt=""
                            />
                          )}

                          {!currentUser?.userImg && (
                            <span className="">
                              <AiOutlineUser className="text-black border-2 border-black bg-white text-5xl rounded-full" />
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="pt-3 ">{user?.email}</p>
                        </div>
                      </div>

                      <Link
                        to={`/manage-profile`}
                        className="uppercase hover:text-gray-600"
                      >
                        Manage profile
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="uppercase hover:text-gray-600"
                      >
                        Sign out
                      </button>
                    </div>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import { HiMail,HiPhone } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const TopnavBar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className=" bg-gradient-to-r from-[#ff3e00] to-[#ffbe30]">
      <div className="px-5 py-2 hidden sm:flex flex-wrap justify-between items-center max-w-7xl mx-auto">
          <div className=" gap-3 flex left-topbar text-white">
            <a href="mailto: create.eve@gmail.com" className="inline-flex items-center gap-2">
              <HiMail className="w-5 h-5"/>
              <p className="text-sm font-bold">
              create.eve@gmail.com
              </p>
            </a>
            <p className="">|</p>
            <a href="tel:+8801779895263" className="inline-flex items-center gap-2">
              <HiPhone className="w-4 h-4"/>
              <p className="text-sm font-bold">
                +8801779895263
              </p>
            </a>
          </div>

        <div className="right-topbar">

          <button onClick={()=>navigate('/authentication')} className={`${user?'hidden':'inline-flex'} items-center gap-2 cursor-pointer underline underline-offset-8 decoration-2 decoration-white text-white font-bold text-sm`}>
            <AiFillLock className="w-5 h-5"/>
            <p>Register / Login</p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default TopnavBar;

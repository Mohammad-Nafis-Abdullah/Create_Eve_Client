/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import auth from "../../../../Firebase/firebase.init";
import Loading from "../../../Share/Loading/Loading";
import axios from "axios";

const UpdateUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const email = user?.email;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`https://create-eve-server.onrender.com/single-user/${email}`)
      .then(({ data }) => setUserData(data));
  }, [email]);

  const onSubmit = (userData) => {
    const userInfo = {
      uid: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      country: userData.country,
      city: userData.city,
      aboutMe: userData.aboutMe || "",
      address: userData.address,
    };

    axios
      .put(`https://create-eve-server.onrender.com/user-update/${user?.uid}`, userInfo)
      .then(({ data }) => {
        if (data) {
          toast.success("Information updated successfully");
          navigate("/manage-profile");
          reset();
        }
      });
  };

  // for user
  if (loading) {
    return <Loading></Loading>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <section className="route my-10 container mx-auto px-4">
      <div className="rounded bg-white shadow-2xl" id="profile_container">
        <div className="text-start">
          <h1 className="text-2xl pt-4 font-semibold py-6 text-slate-700 pl-9">
            Edit Profile
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            <div className="block sm:flex gap-3 mt-4">
              <div className="w-full">
                <div className="">
                  <label
                    htmlFor="displayName"
                    className="text-slate-500 block font-semibold w-1/2 "
                  >
                    User Name{" "}
                  </label>
                  <input
                    defaultValue={user?.displayName}
                    id="displayName"
                    name="displayName"
                    type="text"
                    readOnly
                    className=" mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="User Name"
                  />
                </div>
                <label className="text-left sm:text-start block">
                  {errors.displayName?.type === "required" && (
                    <span className="text-red-500 text-sm capitalize">
                      {errors.displayName.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="w-full">
                <div className="">
                  <label
                    htmlFor="email"
                    className="text-slate-500 font-semibold w-1/2 "
                  >
                    Email Address
                  </label>
                  <input
                    value={email}
                    readOnly
                    id="email"
                    name="email"
                    type="text"
                    className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
                <label className="text-left sm:text-start block">
                  {errors.email?.type === "required" && (
                    <span className="text-red-500 text-sm capitalize">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="block sm:flex gap-3 mt-4">
              <div className="w-full">
                <div className="">
                  <label
                    htmlFor="country"
                    className="text-slate-500 font-semibold w-1/2 "
                  >
                    Country
                  </label>
                  <input
                    defaultValue={userData?.country}
                    id="country"
                    name="country"
                    type="text"
                    className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Country Name"
                    {...register("country", {
                      required: {
                        value: true,
                        message: "Enter Your Country",
                      },
                    })}
                  />
                </div>
                <label className="text-left sm:text-start block">
                  {errors.country?.type === "required" && (
                    <span className="text-red-500 text-sm capitalize">
                      {errors.country.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="w-full">
                <div className="">
                  <label
                    htmlFor="city"
                    className="text-slate-500 font-semibold w-1/2 "
                  >
                    City
                  </label>
                  <input
                    defaultValue={userData?.city}
                    id="city"
                    name="city"
                    type="text"
                    className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="City Name"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "Enter City Name",
                      },
                    })}
                  />
                </div>
                <label className="text-left sm:text-start block">
                  {errors.city?.type === "required" && (
                    <span className="text-red-500 text-sm capitalize">
                      {errors.city.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div>
              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="text-slate-500 font-semibold "
                >
                  Address
                </label>
                <input
                  defaultValue={userData?.address}
                  id="address"
                  name="address"
                  type="text"
                  className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Address "
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Enter your address",
                    },
                  })}
                />
              </div>
              <label className="text-left sm:text-start block">
                {errors.address?.type === "required" && (
                  <span className="text-red-500 text-sm capitalize">
                    {errors.address.message}
                  </span>
                )}
              </label>
            </div>
            <div className="py-2">
              <div className="mt-4">
                <label
                  htmlFor="aboutMe"
                  className="text-slate-500 w-1/5 font-semibold"
                >
                  {" "}
                  About Me{" "}
                </label>
                <textarea
                  defaultValue={userData?.aboutMe}
                  id="aboutMe"
                  name="aboutMe"
                  type="text"
                  className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="About Me"
                  cols="5"
                  rows="5"
                  {...register("aboutMe", {
                    required: {
                      value: false,
                      message: "Enter Your About",
                    },
                  })}
                />
              </div>
              <label className="text-left sm:text-start block">
                {errors.aboutMe?.type === "required" && (
                  <span className="text-red-500 text-sm  capitalize">
                    {errors.aboutMe.message}
                  </span>
                )}
              </label>
            </div>
          </div>
          <input
            type="submit"
            value="Update"
            className="uppercase transition-all bg-green-500 w-full py-2 text-white hover:bg-green-600 rounded-b cursor-pointer"
          />
        </form>
      </div>
    </section>
  );
};

export default UpdateUser;

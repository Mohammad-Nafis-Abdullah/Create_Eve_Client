/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { ShowModalBtn } from "../Prebuild/Modal";
import "./OrderSummary.css";
import ServiceList from "./ServiceList";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import { useEffect } from "react";
import auth from "../../Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import VenueInfo from "./VenueInfo";

const OrderSummary = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [eventDetails, setStorage, clearStorage] = useLocalStorage("event");
  const [catering, setCatering, clearCatering] = useLocalStorage("catering");
  const [audio, setAudio, clearAudio] = useLocalStorage("audio");
  const [lighting, setLighting, clearLighting] = useLocalStorage("lighting");

  const [orderCount, setOrderCount] = useState(
    catering?.orderCount || catering?.min_order || 1
  );
  const [audioCount, setAudioCount] = useState(
    audio?.orderCount || audio?.min_order || 1
  );
  const [lightingCount, setLightingCount] = useState(
    lighting?.orderCount || lighting?.min_order || 1
  );

  useEffect(() => {
    if (!eventDetails) {
      clearCatering();
      clearAudio();
      clearLighting();
    } else {
      catering && setCatering({ ...catering, orderCount });
      audio && setAudio({ ...audio, orderCount: audioCount });
      lighting && setLighting({ ...lighting, orderCount: lightingCount });
    }
  }, [eventDetails, catering, setCatering, audio, lighting]);

  const total = () => {
    if (eventDetails) {
      return (
        parseInt(eventDetails?.price) +
        parseInt(catering?.price || 0) * orderCount +
        parseInt(audio?.price || 0) * audioCount +
        parseInt(lighting?.price || 0) * lightingCount
      );
    } else {
      return 0;
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const userName = user?.displayName;
    const userEmail = user?.email;
    const booking = {
      userId: user?.uid,
      userName: userName,
      userEmail: userEmail,
      phone: data.phone,
      address: data.address,
      bookingTime: new Date().toLocaleString(),
      package: eventDetails,
      catering: catering,
      audio: audio,
      lighting: lighting,
    };
    axios.post("https://create-eve-server.onrender.com/bookings", booking).then(({ data }) => {
      if (data.acknowledged) {
        reset();
        clearStorage();
        clearCatering();
        clearAudio();
        clearLighting();
        toast.success("Successfully booked");
      } else {
        toast.error("Booking unsucceeded");
      }
    });
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-3 2xl:max-w-7xl mx-auto px-3 py-10">
      <div className="col-span-12 xl:col-span-8">
        <h3 className="text-3xl">
          Order <span className="font-bold">Summary</span>
        </h3>

        <div className="overflow-x-auto p-3">
          <table className="table font-bold text-center uppercase w-full">
            <tr className="text-amber-400 text-lg">
              <td>Package Type</td>
              <td>Services</td>
              <td>Price</td>
            </tr>

            {eventDetails && (
              <tr className="">
                <td className="border-2">{eventDetails?.name}</td>
                <td className="border-2 text-left">
                  {[...eventDetails?.services].map((service, index) => (
                    <Fragment key={index}>
                      <small className="whitespace-pre">
                        {index + 1}. {service}
                      </small>
                      <br />
                    </Fragment>
                  ))}
                </td>
                <td className="border-2 relative">
                  <button
                    onClick={() => {
                      clearStorage();
                      clearCatering();
                      clearAudio();
                      clearLighting();
                    }}
                    className="btn btn-error btn-sm absolute bottom-1 right-4"
                  >
                    <BsTrashFill className="text-xl" />
                  </button>
                  {eventDetails?.price}/-
                </td>
              </tr>
            )}

            {catering && (
              <tr className="p-2">
                <td colSpan={3} className="border-2 bg-gray-300">
                  <div className="flex justify-between items-center">
                    <article className="text-left">
                      <h3>{catering?.name}</h3>
                      <p className="text-sm text-gray-500 pl-1">
                        price : {catering?.price}/-
                      </p>
                      <p className="text-sm text-gray-500 pl-1">
                        minimum order : {catering?.min_order}
                      </p>
                      <p className="text-sm text-gray-500 pl-1 inline-flex items-center gap-2">
                        Order :
                        <span className="inline-flex gap-1 p-1 items-center text-black select-none">
                          <FaMinus
                            onClick={() => {
                              setOrderCount((prev) =>
                                prev === catering?.min_order ? prev : prev - 10
                              );
                            }}
                            className="cursor-pointer bg-highlight w-5 h-5 p-1 rounded-full"
                          />
                          <p className="text-lg">{orderCount}</p>
                          <FaPlus
                            onClick={() => {
                              setOrderCount((prev) => prev + 10);
                            }}
                            className="cursor-pointer bg-highlight w-5 h-5 p-1 rounded-full"
                          />
                        </span>
                      </p>
                    </article>
                    <section>
                      <button
                        onClick={clearCatering}
                        className="btn btn-error btn-sm"
                      >
                        <BsTrashFill className="text-xl" />
                      </button>
                    </section>
                  </div>
                </td>
              </tr>
            )}

            {audio && (
              <tr className="p-2">
                <td colSpan={3} className="border-2 bg-gray-300">
                  <div className="flex justify-between items-center">
                    <article className="text-left">
                      <h3>{audio?.name}</h3>
                      <p className="text-sm text-gray-500 pl-1">
                        price : {audio?.price}/-
                      </p>
                      <p className="text-sm text-gray-500 pl-1 inline-flex items-center gap-2">
                        Order :
                        <span className="inline-flex gap-1 p-1 items-center text-black select-none">
                          <FaMinus
                            onClick={() => {
                              setAudioCount((prev) =>
                                prev === audio?.min_order ? prev : prev - 1
                              );
                            }}
                            className="cursor-pointer bg-highlight w-5 h-5 p-1 rounded-full"
                          />
                          <p className="text-lg">{audioCount}</p>
                          <FaPlus
                            onClick={() => {
                              setAudioCount((prev) => prev + 1);
                            }}
                            className="cursor-pointer bg-highlight w-5 h-5 p-1 rounded-full"
                          />
                        </span>
                      </p>
                    </article>
                    <section>
                      <button
                        onClick={clearAudio}
                        className="btn btn-error btn-sm"
                      >
                        <BsTrashFill className="text-xl" />
                      </button>
                    </section>
                  </div>
                </td>
              </tr>
            )}

            {lighting && (
              <tr className="p-2">
                <td colSpan={3} className="border-2 bg-gray-300">
                  <div className="flex justify-between items-center">
                    <article className="text-left">
                      <h3>{lighting?.name}</h3>
                      <p className="text-sm text-gray-500 pl-1">
                        price : {lighting?.price}/-
                      </p>
                      <p className="text-sm text-gray-500 pl-1 inline-flex items-center gap-2">
                        Order :
                        <span className="inline-flex gap-1 p-1 items-center text-black select-none">
                          <FaMinus
                            onClick={() => {
                              setLightingCount((prev) =>
                                prev === lighting?.min_order ? prev : prev - 1
                              );
                            }}
                            className="cursor-pointer bg-highlight w-5 h-5 p-1 rounded-full"
                          />
                          <p className="text-lg">{lightingCount}</p>
                          <FaPlus
                            onClick={() => {
                              setLightingCount((prev) => prev + 1);
                            }}
                            className="cursor-pointer bg-highlight w-5 h-5 p-1 rounded-full"
                          />
                        </span>
                      </p>
                    </article>
                    <section>
                      <button
                        onClick={clearLighting}
                        className="btn btn-error btn-sm"
                      >
                        <BsTrashFill className="text-xl" />
                      </button>
                    </section>
                  </div>
                </td>
              </tr>
            )}

            {eventDetails && (
              <tr className="">
                <td colSpan={3}>
                  <ShowModalBtn
                    showInModal={<ServiceList />}
                    className="btn btn-outline hover:bg-highlight hover:border-highlight hover:text-black w-full py-4 px-9 my-5 rounded-md uppercase font-semibold"
                  >
                    Add More Services
                  </ShowModalBtn>
                </td>
              </tr>
            )}
            <tr>
              <td
                style={{
                  letterSpacing: "1px",
                  borderBottomLeftRadius: "0px",
                }}
                className="pl-8 text-left bg-amber-500 uppercase"
                colSpan={2}
              >
                Order Total
              </td>
              <td
                style={{ borderBottomRightRadius: "0px" }}
                className="bg-amber-500"
              >
                {total()}/-
              </td>
            </tr>
          </table>
        </div>
      </div>

      <section className="col-span-full lg:col-span-8 xl:row-start-2">
        <h3 className="text-3xl mb-7">
          Billing <span className="font-bold text-highlight">Information</span>
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form space-y-2 bg-gray-200 rounded-xl p-5"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Name :</span>
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Email :</span>
            </label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="phone" className="label">
              <span className="label-text font-bold">Contact No.</span>
            </label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              id="phone"
              name="phone"
              required
              placeholder="Enter your contact number"
              className="input input-bordered w-full"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Please Enter Your Phone Number",
                },
                pattern: {
                  value: /^(?:\+?88|0088)?(01){1}[3-9]{1}\d{8}$/,
                  message: "Must be a Valid Phone Number containing 11 digits",
                },
                minLength: {
                  value: 11,
                  message: "Must be a Valid Phone Number containing 11 digits",
                },
                maxLength: {
                  value: 11,
                  message: "Must be a Valid Phone Number containing 11 digits",
                },
              })}
            />
          </div>
          <label className="text-left sm:text-start block">
            {errors.phone?.type === "required" && (
              <span className="text-red-600 font-semibold text-sm capitalize">
                {errors.phone.message}
              </span>
            )}
          </label>
          <label className="text-left sm:text-start block">
            {errors.phone?.type === "pattern" && (
              <span className="text-red-600 font-semibold text-sm capitalize">
                {errors.phone.message}
              </span>
            )}
          </label>
          <label className="text-left sm:text-start block">
            {errors.phone?.type === "minLength" && (
              <span className="text-red-600 font-semibold text-sm capitalize">
                {errors.phone.message}
              </span>
            )}
          </label>
          <label className="text-left sm:text-start block">
            {errors.phone?.type === "maxLength" && (
              <span className="text-red-600 font-semibold text-sm capitalize">
                {errors.phone.message}
              </span>
            )}
          </label>
          <div className="form-control w-full">
            <label htmlFor="address" className="label">
              <span className="label-text font-bold">Address :</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Enter your address"
              className="input input-bordered w-full"
              {...register("address", {
                required: {
                  value: true,
                  message: "Please Enter Your Address",
                },
                minLength: {
                  value: 20,
                  message: "Address should contain at least 20 letters",
                },
              })}
            />
          </div>
          <label className="text-left sm:text-start block">
            {errors.address?.type === "required" && (
              <span className="text-red-600 font-semibold text-sm capitalize">
                {errors.address.message}
              </span>
            )}
          </label>
          <label className="text-left sm:text-start block">
            {errors.address?.type === "minLength" && (
              <span className="text-red-600 font-semibold text-sm capitalize">
                {errors.address.message}
              </span>
            )}
          </label>
          <div className="flex place-content-center pt-10">
            <input
              type="submit"
              disabled={!eventDetails}
              className="btn btn-outline uppercase"
              value="Booking"
            />
          </div>
        </form>
      </section>

      <div className="col-span-full lg:col-span-4 xl:row-start-1 xl:col-start-9 xl:row-span-2">
        <h3 className="text-3xl">
          Venue <span className="font-bold">Info</span>
        </h3>
        <div>
          <VenueInfo />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

/* eslint-disable no-unused-vars */
import React from "react";
import { toast } from "react-toastify";
import { ShowModalBtn } from "../../Prebuild/Modal";
import ServiceModal from "../MyBooking/ServiceModal";

const SingleOrder = ({ booking, refetch, i, page, limit }) => {
  const {
    _id,
    userId,
    userName,
    userEmail,
    phone,
    address,
    bookingTime,
    package: pkg,
    catering,
    audio,
    lighting,
    paid,
  } = booking;

  const timeFormatter = (timeString) => {
    const [date, time] = timeString.split(",");
    const [month, day, year] = date.split("/");
    return {
      date: `${day}/${month}/${year}`,
      time: `${time}`,
    };
  };

  const total = () => {
    return (
      pkg?.price +
      (catering?.price * catering?.orderCount || 0) +
      (audio?.price || 0) +
      (lighting?.price || 0)
    );
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="p-2 text-left">
        <div className="flex items-center gap-x-2">
          <span className="mr-2 font-bold">
            {(page - 1) * limit + (i + 1)}.
          </span>
          <div className="flex gap-2 flex-col cursor-pointer">
            <span>{userName}</span>
            <span>{address};</span>
            <p>{phone}</p>
          </div>
        </div>
      </td>{" "}
      <td className="p-2 text-center">
        <div className="flex flex-col justify-center items-center">
          <small>{timeFormatter(bookingTime).date}</small>
          <small>{timeFormatter(bookingTime).time}</small>
        </div>
      </td>
      <td className="p-2 text-center font-bold space-y-2 text-purple-600 overflow-y-auto">
        <ShowModalBtn
          showInModal={<ServiceModal service={pkg} />}
          className={"underline underline-offset-2"}
        >
          {pkg.name}
        </ShowModalBtn>
        {catering && (
          <>
            <br />
            <ShowModalBtn
              showInModal={<ServiceModal service={catering} />}
              className={"underline underline-offset-2"}
            >
              {catering?.name}
            </ShowModalBtn>
          </>
        )}
        {audio && (
          <>
            <br />
            <ShowModalBtn
              showInModal={<ServiceModal service={audio} />}
              className={"underline underline-offset-2"}
            >
              {audio?.name}
            </ShowModalBtn>
          </>
        )}
        {lighting && (
          <>
            <br />
            <ShowModalBtn
              showInModal={<ServiceModal service={lighting} />}
              className={"underline underline-offset-2"}
            >
              {lighting?.name}
            </ShowModalBtn>
          </>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        <p className="text-lg">
          <b className="font-bold">৳</b> {total()}
        </p>
      </td>
      <td className="p-2 text-center">
        <div className="flex item-center justify-center">
          <div
            className={`w-6 h-6 rounded-full ${
              paid ? "bg-green-600" : "bg-red-600"
            }`}
          />
        </div>
      </td>
      <td>
        <div className="flex item-center justify-center gap-2">
          {/* <button
            onClick={() => window.alert("not implemented")}
            className="btn btn-xs bg-red-500 hover:bg-red-500 border-0"
          >
            Cancel
          </button> */}
        </div>
      </td>
    </tr>
  );
};

export default SingleOrder;

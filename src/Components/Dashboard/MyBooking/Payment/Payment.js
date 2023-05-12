/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Share/Loading/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import useRefetch from "../../../Hooks/useRefetch";
import { useQueryFetch } from "../../../Hooks/useQueryFetch";

// old
// pk_test_51L0ozSFQMC6ZB6bzt0dxa1LaoMEuD6gRJRf610DtiJ5HQ8OUPWSK5UBcaF13eDEGuncz7XIkz8ggSzRwL42z1HxR00AQ59TUxV

// new
// pk_test_51L3eYcIsG6t6EWnkOiJzzkmaaKd3tr3LcGjdbhkuKH1YYdZ1Qfvcf6IFMt1ChcJ7eJCXtpl7RZiPaj9HH3W3fk8M00rIbRpG9V

const stripePromise = loadStripe(
  "pk_test_51L3eYcIsG6t6EWnkOiJzzkmaaKd3tr3LcGjdbhkuKH1YYdZ1Qfvcf6IFMt1ChcJ7eJCXtpl7RZiPaj9HH3W3fk8M00rIbRpG9V"
);

const Payment = () => {
  const { Id } = useParams();

  // const {data: booking,loading,refetch} = useRefetch(`https://create-eve-server.onrender.com/payment/${Id}`, {});
  const {data: booking,loading,refetch} = useQueryFetch('single-booking',`https://create-eve-server.onrender.com/payment/${Id}`);

  let total = parseInt(booking.package?.price);

  if (booking?.catering) {
    total =
      total +
      parseInt(booking?.catering?.price * booking?.catering?.orderCount);
  }
  if (booking?.audio) {
    total =
      total + parseInt(booking?.audio?.price * booking?.audio?.orderCount);
  }
  if (booking?.lighting) {
    total =
      total +
      parseInt(booking?.lighting?.price * booking?.lighting?.orderCount);
  }

  return (
    <div className="w-full mt-20">
      {booking && (
        <div className="hero w-full">
          <div className="grid gap-y-5 mx-2">
            {/* <div className="card shadow-2xl bg-transparent">
              <div className="card-body ">
                <h2 className="card-title">
                  Package : {booking?.package?.name}
                </h2>
                <ul>
                  <li>
                    Catering : {booking?.catering && booking?.catering?.name} (
                    {booking?.catering?.orderCount} person)
                  </li>
                  <li>
                    Audio : {booking?.audio && booking?.audio?.name} (
                    {booking?.audio?.orderCount} Pcs)
                  </li>
                  <li>
                    Visuals : {booking?.lighting && booking?.lighting?.name} (
                    {booking?.lighting?.orderCount} Pcs)
                  </li>
                </ul>
                <p> Total Price : {total}</p>
                <p> Delivery Address : {booking.address}</p>
              </div>
            </div> */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {booking && (
                    <tr>
                      <td>{booking?.package?.name}</td>
                      <td className="uppercase">
                        {booking?.package?.category}
                      </td>
                      <td className="text-center">1</td>
                      <td className="text-right">{booking?.package?.price}৳</td>
                    </tr>
                  )}
                  {booking?.catering && (
                    <tr>
                      <td>{booking?.catering?.name}</td>
                      <td className="uppercase">{booking?.catering?.type}</td>
                      <td className="text-center">
                        {booking?.catering?.orderCount}
                      </td>
                      <td className="text-right">
                        {booking?.catering?.price *
                          booking?.catering?.orderCount}
                        ৳
                      </td>
                    </tr>
                  )}
                  {booking?.audio && (
                    <tr>
                      <td>{booking?.audio?.name}</td>
                      <td className="uppercase">{booking?.audio?.type}</td>
                      <td className="text-center">
                        {booking?.audio?.orderCount}
                      </td>
                      <td className="text-right">
                        {booking?.audio?.price * booking?.audio?.orderCount}৳
                      </td>
                    </tr>
                  )}
                  {booking?.lighting && (
                    <tr>
                      <td>{booking?.lighting?.name}</td>
                      <td className="uppercase">{booking?.lighting?.type}</td>
                      <td className="text-center">
                        {booking?.lighting?.orderCount}
                      </td>
                      <td className="text-right">
                        {booking?.lighting?.price *
                          booking?.lighting?.orderCount}
                        ৳
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="font-bold">Total</td>
                    <td></td>
                    <td></td>
                    <td className="font-bold text-right">{total}৳</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="lg:h-60 rounded-lg shadow-2xl bg-amber-400 "
              data-aos="zoom-in"
            >
              <div className="card-body">
                <Elements stripe={stripePromise}>
                  <CheckoutForm booking={booking} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

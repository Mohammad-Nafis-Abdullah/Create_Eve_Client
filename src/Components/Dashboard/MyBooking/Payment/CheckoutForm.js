/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loading from "../../../Share/Loading/Loading";
import { useId } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../Firebase/firebase.init";
import axios from "axios";

const CheckoutForm = ({ booking }) => {
  const [user] = useAuthState(auth);
  const { email, uid } = user;
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

  const total = () => {
    return (
      pkg?.price +
      (catering?.price * catering?.orderCount || 0) +
      (audio?.price * audio?.orderCount || 0) +
      (lighting?.price * lighting?.orderCount || 0)
    );
  };

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("/payments", {
        totalPrice: total() || 100,
      })
      .then(({ data }) => {
        // console.log(data);
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    setSuccess("");
    if (error) {
      setProcessing(false);
    }

    // card payment confirmation
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: email,
          },
        },
      });

    if (processing) {
      return <Loading />;
    }

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess(`Congratulations! ${total()}৳ Payment is done.`);

      // store payment info in database
      const payment = {
        userId: uid,
        bookingId: _id,
        transactionId: paymentIntent.id,
        userName,
        email,
        phone,
        address,
        bookingTime,
        package: pkg,
        catering,
        audio,
        lighting,
        paid: true,
      };
      await axios
        .put(`/bookings/${_id}`, payment)
        .then(({ data }) => {
          console.log(data);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col justify-between lg:h-48"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#322d27",
              "::placeholder": {
                color: "#52d27",
              },
            },
            invalid: {
              color: "#322d27",
            },
          },
        }}
      />
      <div>
        <div className="mb-8">
          <h2 className="card-title">
            {!success ? (
              <span>Please Pay {total()}৳</span>
            ) : (
              <p className="text-green-800">{success}</p>
            )}
          </h2>
          {cardError && <p className="text-red-500">{cardError}</p>}
          {success && (
            <p className="text-lg text-stone-800">
              Transaction Id :{" "}
              <span className="font-bold">{transactionId}</span>{" "}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          {processing && !transactionId ? (
            <button className="btn loading px-8 rounded-full hover:bg-transparent bg-black transition-all duration-700">
              Loading
            </button>
          ) : !transactionId ? (
            <button
              type="submit"
              disabled={!stripe || !clientSecret}
              className="btn btn-outline px-16 rounded-full hover:bg-transparent hover:bg-black hover:text-white transition-all duration-700"
            >
              PAY
            </button>
          ) : (
            <button
              type="submit"
              disabled
              className="btn btn-outline px-16 rounded-full hover:bg-transparent hover:bg-black hover:text-white transition-all duration-700"
            >
              Paid
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;

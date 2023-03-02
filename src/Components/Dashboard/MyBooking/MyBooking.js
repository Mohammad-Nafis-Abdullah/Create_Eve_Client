/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./MyBooking.css";
import useRefetch from "../../Hooks/useRefetch";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import usePayment from "./PaymentInfoHook/usePayment";
import BookingCard from "./BookingCard";

function MyBooking() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [user] = useAuthState(auth);
  const { email, uid } = user;
  const [myBookingServices, setMyBookingServices] = useState([]);

  const paymentInfo = usePayment(uid);

  const {
    data: bookings,
    loading,
    refetch,
  } = useRefetch(`http://localhost:5000/bookings/${user?.uid}`, []);

  return (
    <div className="p-3">
      <h3>My Bookings : {bookings?.length}</h3>

      <section className="py-5 flex flex-wrap gap-5">
        {bookings?.map((booking) => (
          <BookingCard key={booking?._id} booking={booking} refetch={refetch} />
        ))}
      </section>
    </div>
  );
}

export default MyBooking;

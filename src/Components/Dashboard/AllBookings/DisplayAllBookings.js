import usePayment from '../MyBooking/PaymentInfoHook/usePayment';

function DisplayAllBookings({ booking, handleBookingDelete, handlePaidBookingDelete }) {
    const { _id, userId, userName, userEmail, phone, address, bookingTime, packages, catering, audio, lighting } = booking

    const paymentInfo = usePayment(`${userId}:${_id}`)
    console.log(paymentInfo)


    return (
        <div>
            
        </div>
    )
}

export default DisplayAllBookings

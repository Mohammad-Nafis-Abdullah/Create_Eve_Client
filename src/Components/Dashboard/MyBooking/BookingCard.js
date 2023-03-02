/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ShowModalBtn } from '../../Prebuild/Modal';
import ServiceModal from './ServiceModal';
import { FaTrash } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Confirmation from '../../Prebuild/Confirmation';
import { useNavigate } from 'react-router-dom';


const BookingCard = ({ booking, refetch }) => {
    const [confirmState, setConfirmState] = useState(false);
    const navigate = useNavigate();

    const total = () => {
        return (booking?.package?.price + 
            ((booking?.catering?.price * booking?.catering?.orderCount) || 0) + 
            ((booking?.audio?.price * booking?.audio?.orderCount) || 0) + 
            ((booking?.lighting?.price * booking?.lighting?.orderCount) || 0));
    }

    useEffect(() => {
        if (confirmState) {
            axios.delete(`http://localhost:5000/bookings/${booking?._id}`)
                .then(({ data }) => {
                    if (data?.acknowledged) {
                        toast.success('Booking deleted successfully', { theme: 'dark' });
                        refetch();
                    }
                })
        }
    }, [confirmState])

    return (
        <div className="rounded-md overflow-hidden bg-cover basis-96 shrink-0"
            style={{
                backgroundImage: `url(http://localhost:5000/serviceImg/${booking?.package?.coverPhoto})`
            }}>

            <section className='bg-black/70 h-full w-full text-highlight font-bold p-5 pr-8 text-sm flex flex-col justify-between gap-y-10 relative'>
                <div className='w-8 h-10 bg-white rounded-b-full flex justify-center items-center absolute top-0 right-1'>
                    {
                        booking?.paid ?
                        <GiCheckMark className='w-6 h-6 text-green-600 cursor-pointer'/>:
                        <ShowModalBtn showInModal={<Confirmation setConfirmState={setConfirmState} />}>
                        <FaTrash className='w-6 h-6 text-red-500 hover:text-red-600 active:scale-95 transition-colors cursor-pointer' /></ShowModalBtn>
                    }
                </div>
                <div>
                    <p className='text-lg mb-5'>Name : {booking?.package?.name}</p>

                    <div className='border-b-2 border-highlight'>
                        <p className='flex justify-between'><span>Package Price :</span> <span>{booking?.package?.price}/-</span></p>
                        {
                            booking?.catering &&
                            <p className='flex justify-between'><span>Catering Price : x{booking?.catering?.orderCount}</span> <span>{booking?.catering?.price * booking?.catering?.orderCount}/-</span></p>
                        }
                        {
                            booking?.audio &&
                            <p className='flex justify-between'><span>Audio Price : x{booking?.audio?.orderCount}</span> <span>{booking?.audio?.price * booking?.audio?.orderCount}/-</span></p>
                        }
                        {
                            booking?.lighting &&
                            <p className='flex justify-between'><span>Lighting Price : x{booking?.lighting?.orderCount}</span> <span>{booking?.lighting?.price * booking?.lighting?.orderCount}/-</span></p>
                        }
                    </div>
                    <p className='flex justify-between text-base'><span>Price :</span> <span>{total()}/-</span></p>
                </div>

                <div className='flex gap-2 flex-wrap '>
                    <ShowModalBtn showInModal={<ServiceModal service={booking?.package} />} className={'underline'}>Package Details</ShowModalBtn>
                    {
                        booking?.catering &&
                        <ShowModalBtn showInModal={<ServiceModal service={booking?.catering} />} className={'underline'}>Catering Details</ShowModalBtn>
                    }
                    {
                        booking?.audio &&
                        <ShowModalBtn showInModal={<ServiceModal service={booking?.audio} />} className={'underline'}>Audio Details</ShowModalBtn>
                    }
                    {
                        booking?.lighting &&
                        <ShowModalBtn showInModal={<ServiceModal service={booking?.lighting} />} className={'underline'}>Lighting Details</ShowModalBtn>
                    }
                    {
                        booking?.paid ||
                        <div className='basis-full flex justify-end'>
                            <button onClick={()=> navigate(`/dashboard/payment/${booking?._id}`)} className='btn btn-sm bg-highlight text-black hover:bg-highlight hover:text-black hover:ring-2 hover:ring-highlight hover:underline'>Pay</button>
                        </div>
                    }
                </div>
            </section>

        </div>
    );
};

export default BookingCard;
import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { imgUrl } from '../../Hooks/useMyStorage';
import './OurServices.css'

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();


    return (
        <div className="relative hvr max-w-xs mx-auto w-full">

            <div className="cursor-pointer">

                <div className="relative">
                    <img src={imgUrl(service.coverPhoto)} alt="" className="w-full h-80 object-cover" />
                    <div className="absolute top-0 right-0 left-0 bottom-0 bg-transparent cld">
                        <BsPlusLg
                            onClick={() => navigate(`/packages/${service?.category}`)}
                            className="text-8xl text-white absolute top-[calc(50%-48px)] left-[calc(50%-48px)] pls "
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center absolute left-[15%] right-[15%] -bottom-3 py-5 bg-white rounded-xl border-highlight border-2">
                    <h5 className='uppercase'>{service?.title}</h5>
                </div>

            </div>

            <div className="mt-8">

                <p className="left-position uppercase text-gray-400 font-bold tracking-wider cld2 whitespace-pre">
                    Create-Eve  party  events
                </p>

            </div>

        </div>
    );
};

export default ServiceCard;
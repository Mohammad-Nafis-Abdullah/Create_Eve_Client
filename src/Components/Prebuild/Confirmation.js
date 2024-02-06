import React from 'react';
import { closeModal } from './Modal';

const Confirmation = ({setConfirmState}) => {
    return (
        <div className='h-[calc(100%-4rem)] flex justify-center items-center p-3'>
            <section className='max-w-sm w-full h-48 bg-gray-200 rounded flex flex-col justify-center gap-5'>
                <h3 className='text-lg text-center'>Are you sure to delete the booking ?</h3>
                <div className='flex justify-evenly'>
                    <button onClick={()=> {
                        setConfirmState(true);
                        closeModal();
                    }} className='btn btn-sm btn-success text-black'>yes</button>
                    <button onClick={()=> {
                        setConfirmState(false);
                        closeModal();
                    }} className='btn btn-sm btn-error text-black'>no</button>
                </div>
            </section>
        </div>
    );
};

export default Confirmation;
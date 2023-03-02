/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../Firebase/firebase.init';
import { closeModal } from '../../Prebuild/Modal';

const ConfigBannerModal = ({refetch}) => {
    const [user] = useAuthState(auth);

    const handleSubmit = (e)=> {
        e.preventDefault();
        const imgs = Object.values(e.target.img?.files);

        const formData = new FormData();
        imgs.forEach(img=>{
            formData.append("img",img);
        })

        if (imgs.length<=5) {
            axios.post('http://localhost:5000/home-banner',formData,{
                headers:{
                    uid: user?.uid
                }
            })
            .then(({data})=>{
                if (data.upload) {
                    toast.success('Image uploaded successfully',{theme:'dark'})
                    e.target.reset();
                    refetch();
                    closeModal();
                }
            })

        } else {
            toast.error('Please upload 1-5 images',{theme:'dark'});
            e.target.reset();
            refetch();
            closeModal();
        };
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='max-w-xs w-full bg-white rounded p-3 space-y-3'>
                <article>
                <h3 className='text-black text-lg'>Upload Banner Images :</h3>
                <p className='text-red-600 font-bold'>Maximum 5 File can be uploaded</p>
                </article>
                <input type='file' name='img' multiple className="file-input file-input-bordered file-input-warning w-full" accept='.jpg, .jpeg, .png' required/>
                <div className='flex justify-end'>
                    <input type="submit" className='btn btn-sm bg-highlight text-gray-900 hover:text-highlight' value="Upload" />
                </div>
            </form>
        </div>
    );
};

export default ConfigBannerModal;
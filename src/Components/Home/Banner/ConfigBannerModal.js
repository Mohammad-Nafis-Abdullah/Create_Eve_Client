/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../Firebase/firebase.init';
import useMyStorage from '../../Hooks/useMyStorage';
import { closeModal } from '../../Prebuild/Modal';
import Loading from '../../Share/Loading/Loading';

const ConfigBannerModal = ({ refetch, bannerPhotos }) => {
    const [user] = useAuthState(auth);
    const { uploadImage, deleteImage } = useMyStorage();
    const [loading, setLoading] = useState(false);

    // console.log(bannerPhotos);

    const promiseArray = (arr = [], callback = () => 0) => {
        return arr.map(e => {
            return callback(e);
        })
    };

    // console.log(promiseArray([...bannerPhotos],(banner)=> {
    //     return {img:banner._id};
    // }));



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const imgs = Object.values(e.target.img?.files);

        try {
            if (imgs.length <= 5) {
                await Promise.all(promiseArray([...bannerPhotos], (b) => deleteImage(b.img)));
                const imgInfo = await Promise.all(promiseArray([...imgs], (img) => uploadImage(img)));
                const names = imgInfo.map(img => { return { img: img.name } });

                // console.log(names);

                const { data } = await axios.post('http://localhost:5000/home-banner', names, {
                    headers: {
                        uid: user?.uid
                    }
                })
                if (data.upload) {
                    toast.success('Image uploaded successfully', { theme: 'dark' })
                    e.target.reset();
                    refetch();
                    closeModal();
                }

            } else {
                toast.error('Please upload 1-5 images', { theme: 'dark' });
                e.target.reset();
                refetch();
                closeModal();
            };

        } catch (err) {
            console.log(err);
        }

        closeModal();
        e.target.reset();
        setLoading(false);
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
            {loading && <Loading />}
            <form onSubmit={handleSubmit} className='max-w-xs w-full bg-white rounded p-3 space-y-3'>
                <article>
                    <h3 className='text-black text-lg'>Upload Banner Images :</h3>
                    <p className='text-red-600 font-bold'>Maximum 5 File can be uploaded</p>
                </article>
                <input type='file' name='img' multiple className="file-input file-input-bordered file-input-warning w-full" accept='.jpg, .jpeg, .png' required />
                <div className='flex justify-end'>
                    <input type="submit" className='btn btn-sm bg-highlight text-gray-900 hover:text-highlight' value="Upload" />
                </div>
            </form>
        </div>
    );
};

export default ConfigBannerModal;
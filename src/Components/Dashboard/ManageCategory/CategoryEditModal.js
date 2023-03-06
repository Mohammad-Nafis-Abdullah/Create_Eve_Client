/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../Firebase/firebase.init';
import useMyStorage, { imgUrl } from '../../Hooks/useMyStorage';
import { closeModal } from '../../Prebuild/Modal';
import Loading from '../../Share/Loading/Loading';

const CategoryEditModal = forwardRef(({ category, categoryRefetch }, ref) => {
    const [currentUser] = useAuthState(auth);
    const [title, setTitle] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [cover, setCover] = useState('');
    const { uploadImage, deleteImage } = useMyStorage();
    const [loading, setLoading] = useState(false);

    const topDiv = document.getElementById('view');

    useImperativeHandle(ref, () => ({
        blank: () => {
            setTitle('');
            setMin('');
            setMax('');
            setCover('');
        },
        topMove: () => {
            topDiv?.scrollIntoView();
        }
    }))

    useEffect(() => {
        topDiv?.scrollIntoView();
        if (category) {
            setTitle(category?.title);
            setMin(category?.priceRange[0]);
            setMax(category?.priceRange[1]);
            setCover(category?.coverPhoto);
        } else {
            setTitle('');
            setMin('');
            setMax('');
            setCover('');
        }
    }, [category]);

    const categoryNaming = (text = '') => {
        return text.toLowerCase().trim().split(' ').join('-');
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const img = e.target.coverPhoto.files[0];

        const formData = new FormData();
        formData.append('img', img);

        const categoryObj = {
            title: title,
            category: category?.category || categoryNaming(title),
            priceRange: [min, max]
        }

        try {

            if (img) {
                await deleteImage(cover);
                const { name } = await uploadImage(img);
                const { data } = await axios.put(`https://create-eve-server.onrender.com/packages/${categoryObj?.category}`, { ...categoryObj, coverPhoto: name }, {
                    headers: {
                        uid: currentUser?.uid
                    }
                });
                if (data.acknowledged && data.modifiedCount) {
                    categoryRefetch();
                    closeModal();
                    toast.success('Successfully Completed', { theme: 'dark' });
                } else {
                    toast.error('An error occurred', { theme: 'colored' });
                }

            } else {
                const { data } = await axios.put(`https://create-eve-server.onrender.com/packages/${categoryObj?.category}`, { ...categoryObj, coverPhoto: cover }, {
                    headers: {
                        uid: currentUser?.uid
                    }
                });
                if (data.acknowledged && data.modifiedCount) {
                    categoryRefetch();
                    closeModal();
                    toast.success('Successfully Completed', { theme: 'dark' })
                }
            }

        } catch (err) {
            console.log(err);
        }

        e.target.reset();
        setLoading(false);
    }

    return (
        <div className='h-full w-full p-3'>
            {loading && <Loading />}
            <section className='h-full max-w-sm bg-white mx-auto rounded-md p-5 overflow-y-auto relative'>
                <div id='view' className='absolute top-0 right-0 left-0' />
                <form onSubmit={handleSubmit}>
                    <label className="input-group input-group-md font-bold">
                        <span className='bg-gray-900 text-highlight'>Title</span>
                        {
                            category ?
                                <input type="text" placeholder="Category Title" className="input input-bordered input-md grow" readOnly value={title} /> :
                                <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Category Title" className="input input-bordered input-md grow" value={title} />
                        }
                    </label>

                    <div className="divider" />

                    <h3>Price range for filtering :</h3>

                    <section className='space-y-3'>

                        <label className="input-group input-group-md font-bold">
                            <span className='bg-gray-900 text-highlight'>Min:</span>
                            <input onChange={(e) => setMin(parseFloat(e.target.value))}
                                onWheel={e => e.target.blur()}
                                type="number" placeholder="Min Price Range" className="input input-bordered input-md grow" value={min} />
                        </label>

                        <label className="input-group input-group-md font-bold">
                            <span className='bg-gray-900 text-highlight'>Max:</span>
                            <input onChange={(e) => setMax(parseFloat(e.target.value))}
                                type="number"
                                onWheel={e => e.target.blur()}
                                placeholder="Max Price Range" className="input input-bordered input-md grow" value={max} />
                        </label>

                    </section>

                    <div className="divider" />

                    <input type="file" name='coverPhoto' className="file-input file-input-bordered file-input-warning w-full max-w-xs" accept='.jpg, .png, .jpeg' />

                    <h3 className='mt-3'>Present Cover Photo :</h3>
                    <img className='h-40 max-w-[80%] mx-auto object-scale-down rounded-md' src={imgUrl(cover)} alt="" />

                    <div className="divider" />

                    <div className='flex justify-between'>
                        <input className='btn btn-sm bg-gray-900 hover:bg-highlight hover:text-gray-900' type="submit" value={`Update`} />
                        <input className='btn btn-error btn-sm' type="submit" value={`Delete`} disabled />
                    </div>

                </form>
            </section>
        </div>
    );
});

export default CategoryEditModal;
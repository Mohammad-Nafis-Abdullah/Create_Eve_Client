/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdCancel } from 'react-icons/md';
import { TbSquarePlus, TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../Firebase/firebase.init';
import useLocalStorage, { getStorage } from '../Hooks/useLocalStorage';
import useMyStorage, { imgUrl } from '../Hooks/useMyStorage';
import { closeModal } from '../Prebuild/Modal';
import Loading from '../Share/Loading/Loading';

const ConfigureModal = ({ configItem, clearConfigItem, refetchAllPackage }) => {
    const [currentUser] = useAuthState(auth);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [coverPhoto, setCoverPhoto] = useState('');
    const [services, setServices] = useState([]);
    const [caterings, setCaterings] = useState([]);
    const { uploadImage, deleteImage } = useMyStorage();

    const [cateringState, setCateringState] = useState(false);
    const [servicesText, setServicesText] = useState('');
    const [cateringsText, setCateringsText] = useState('');
    const [loading, setLoading] = useState(false);

    const topDiv = document.getElementById('view');

    useEffect(() => {
        topDiv?.scrollIntoView();
        setName(configItem?.name);
        setPrice(configItem?.price);
        setCoverPhoto(configItem?.coverPhoto);
        setServices(configItem?.services);
        setCaterings(configItem?.catering);
        setCateringState(configItem?.catering ? true : false);
    }, [configItem])


    const swalObj = {
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }

    const handleUpdating = async (e) => {
        setLoading(true);
        e.preventDefault();
        const img = e.target.coverPhoto.files[0];

        const pkg = {
            name: name,
            price: price,
            services: services,
        }

        if (caterings?.length) {
            pkg.catering = caterings;
        }


        try {
            const { isConfirmed } = await Swal.fire({ ...swalObj, text: "to Update the package" });
            if (isConfirmed) {

                if (img) {
                    await deleteImage(coverPhoto);
                    const { name } = await uploadImage(img);
                    const { data } = await axios.put(`http://localhost:5000/package/${configItem?.category}/${configItem?._id}`, { ...pkg, coverPhoto: name }, {
                        headers: {
                            uid: currentUser?.uid
                        }
                    });
                    if (data.acknowledged && data.modifiedCount) {
                        Swal.fire(
                            'Successfull!',
                            'Package Updated Successfully.',
                            'success'
                        )
                        refetchAllPackage();
                        clearConfigItem();
                        closeModal();
                    }

                } else {
                    const { data } = await axios.put(`http://localhost:5000/package/${configItem?.category}/${configItem?._id}`, { ...pkg, coverPhoto: coverPhoto }, {
                        headers: {
                            uid: currentUser?.uid
                        }
                    });
                    if (data.acknowledged && data.modifiedCount) {
                        Swal.fire(
                            'Successfull!',
                            'Package Updated Successfully.',
                            'success'
                        )
                        refetchAllPackage();
                        clearConfigItem();
                        closeModal();
                    }
                }

            } else {
                closeModal();
            }

        } catch (err) {
            console.log(err);
        }

        e.target.reset();
        setLoading(false);
    }

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const { isConfirmed } = await Swal.fire({ ...swalObj, text: "to Delete the package" });

            if (isConfirmed) {
                await deleteImage(coverPhoto);
                const { data } = await axios.delete(`http://localhost:5000/package/${configItem?.category}/${id}`, {
                    headers: {
                        uid: currentUser?.uid
                    }
                });
                if (data.acknowledged && data.deletedCount) {
                    Swal.fire(
                        'Successfull!',
                        'Package Deleted Successfully.',
                        'success'
                    )
                    refetchAllPackage();
                    clearConfigItem();
                    closeModal();
                }

            } else {
                closeModal();
            }

        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    return (
        <section className='max-w-xl w-full h-full mx-auto p-2'>
            {loading && <Loading />}
            <form onSubmit={handleUpdating} className='bg-white w-full h-full py-5 px-3 space-y-3 overflow-y-auto relative'>
                <div id='view' className='absolute top-0 right-0 left-0' />

                <label className="input-group input-group-md font-bold">
                    <span className='bg-slate-800 text-highlight text-lg'>Title </span>
                    <input onChange={(e) => setName(e.target.value)} type="text" name='name' className="input input-bordered input-md grow text-lg" value={name} />
                </label>

                <label className="input-group input-group-md font-bold">
                    <span className='bg-slate-800 text-highlight text-lg'>Price </span>
                    <input onChange={(e) => setPrice(e.target.value)} type="number" onWheel={e => e.target.blur()} name='price' className="input input-bordered input-md grow text-lg" value={price} />
                </label>

                <hr className='' />

                <input type="file" name='coverPhoto' accept='.png, .jpg, .jpeg' className="file-input file-input-bordered file-input-warning w-full max-w-xs" />

                <div className='flex gap-2 flex-wrap'>
                    <p className='font-bold'>Cover Photo :</p>
                    <img className='w-[60%] rounded object-scale-down' src={imgUrl(coverPhoto)} alt="" />
                </div>

                <hr />

                {/* services */}
                <label htmlFor="services" className='space-y-2'>
                    <article className='flex items-center'>
                        <h3>Services : </h3>
                        {
                            services?.length ?
                                <TbTrash
                                    onClick={() => setServices([])}
                                    className='w-6 h-6 text-red-500 cursor-pointer' title='clear all service items' /> : ''
                        }
                    </article>
                    <article className=''>
                        {
                            services?.map((item, i) =>
                                <div key={i} className="text-black pr-5 relative space-y-2 py-1">
                                    <p className=''>{i + 1}. {item}</p>
                                    <MdCancel className='cursor-pointer text-red-500 absolute top-0 right-0 w-5 h-5'
                                        onClick={() => {
                                            const arr = [...services]
                                            arr.splice(i, 1);
                                            setServices([...arr]);
                                        }} />
                                    <hr className='basis-full' />
                                </div>)
                        }
                    </article>
                    <section className='flex items-center'>
                        <input type="text" id='services' name='services' placeholder="Services" className="input input-bordered inputDegine grow" value={servicesText}
                            onChange={(e) => {
                                setServicesText(e.target.value);
                            }} />
                        <TbSquarePlus className='h-10 w-10 cursor-pointer' onClick={() => {
                            if (servicesText) {
                                if (services) {
                                    setServices([...services, servicesText])
                                } else {
                                    setServices([servicesText])
                                }
                            }
                            setServicesText('');
                        }} />
                    </section>

                </label>

                <label htmlFor="cateringSelect" className='inline-flex items-center gap-2 select-none cursor-pointer underline'>
                    <small>Caterings </small>
                    <input onChange={e => setCateringState(e.target.checked)} type="checkbox" id='cateringSelect' className="" checked={cateringState} />
                </label>

                {/* caterings */}
                {
                    cateringState &&
                    <label htmlFor="caterings" className='space-y-2'>
                        <article className='flex items-center'>
                            <h3>Caterings : </h3>
                            {
                                caterings?.length ?
                                    <TbTrash
                                        onClick={() => setCaterings([])}
                                        className='w-6 h-6 text-red-500 cursor-pointer' title='clear all service items' /> : ''
                            }
                        </article>
                        <article className=''>
                            {
                                caterings?.map((catering, i) =>
                                    <div key={i} className="text-black pr-5 relative space-y-2 py-1">
                                        <p className=''>{i + 1}. {catering}</p>
                                        <MdCancel className='cursor-pointer text-red-500 absolute top-0 right-0 w-5 h-5'
                                            onClick={() => {
                                                const arr = [...caterings]
                                                arr.splice(i, 1);
                                                setCaterings([...arr]);
                                            }} />
                                        <hr className='basis-full' />
                                    </div>)
                            }
                        </article>
                        <section className='flex items-center'>
                            <input type="text" id='caterings' name='caterings' placeholder="Caterings" className="input input-bordered inputDegine grow" value={cateringsText}
                                onChange={(e) => {
                                    setCateringsText(e.target.value);
                                }} />
                            <TbSquarePlus className='h-10 w-10 cursor-pointer' onClick={() => {
                                if (cateringsText) {
                                    if (caterings) {
                                        setCaterings([...caterings, cateringsText])
                                    } else {
                                        setCaterings([cateringsText])
                                    }
                                }
                                setCateringsText('');
                            }} />
                        </section>

                    </label>
                }

                <div className='flex justify-between'>
                    <input className='btn btn-sm bg-highlight text-black hover:text-highlight max-w-[10rem] w-full' type='submit' value='Update' />
                    <input type='button' onClick={() => handleDelete(configItem?._id)} className='btn btn-sm btn-error max-w-[10rem] w-full' value="Delete" />
                </div>

            </form>
        </section>
    );
};

export default ConfigureModal;
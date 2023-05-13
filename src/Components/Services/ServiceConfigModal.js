/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { forwardRef, useState } from 'react';
import { useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdCancel } from 'react-icons/md';
import { TbSquarePlus, TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../Firebase/firebase.init';
import useMyStorage, { imgUrl } from '../Hooks/useMyStorage';
import { closeModal } from '../Prebuild/Modal';
import Loading from '../Share/Loading/Loading';


const ServiceConfigModal = forwardRef(({ service, refetch }, ref) => {
    const [currentUser] = useAuthState(auth);
    const topRef = useRef();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [min_order, setMin_order] = useState(0);
    const [description, setDescription] = useState('');
    const [services, setServices] = useState([]);
    const [servicesText, setServicesText] = useState('');
    const { uploadImage, deleteImage } = useMyStorage();
    const [loading, setLoading] = useState(false);


    useImperativeHandle(ref, () => ({
        moveTop: () => {
            topRef.current?.scrollIntoView();
        },
        reset: () => {
            setName(service?.name);
            setPrice(service?.price);
            setMin_order(service?.min_order);
            service?.items && setServices([...service?.items]);
            service?.features && setServices([...service?.features]);
            service?.description && setDescription(service?.description);
        }
    }))

    useEffect(() => {
        setName(service?.name);
        setPrice(service?.price);
        setMin_order(service?.min_order);
        service?.items && setServices([...service?.items]);
        service?.features && setServices([...service?.features]);
        service?.description ? setDescription(service?.description) : setDescription('');
    }, [service]);


    const swalObj = {
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const img = e.target.image.files[0];

        const serviceObj = {
            name: name,
            type: service?.type,
            price: price,
            min_order: min_order,
        }

        if (description) {
            serviceObj.description = description;
        }
        if (service?.items) {
            serviceObj.items = services;
        }
        if (service?.features) {
            serviceObj.features = services;
        }


        try {
            const { isConfirmed } = await Swal.fire({ ...swalObj, text: "to Update the service" });
            if (isConfirmed) {

                if (img) {
                    await deleteImage(service?.img);
                    const { name } = await uploadImage(img);
                    const { data } = await axios.put(`http://localhost:5000/service/${service?.type}/${service?._id}`, { ...serviceObj, img: name }, {
                        headers: {
                            uid: currentUser?.uid
                        }
                    });
                    if (data.acknowledged && data.modifiedCount) {
                        Swal.fire(
                            'Successfull!',
                            'Service Updated Successfully.',
                            'success'
                        )
                        refetch();
                        closeModal();
                    }

                } else {
                    const { data } = await axios.put(`http://localhost:5000/service/${service?.type}/${service?._id}`, { ...serviceObj, img: service?.img }, {
                        headers: {
                            uid: currentUser?.uid
                        }
                    });
                    if (data.acknowledged && data.modifiedCount) {
                        Swal.fire(
                            'Successfull!',
                            'Service Updated Successfully.',
                            'success'
                        )
                        refetch();
                        closeModal();
                    } else {
                        toast.error('Service not updated', { theme: 'colored' });
                        closeModal();
                        return 0;
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

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { isConfirmed } = await Swal.fire({ ...swalObj, text: "to Delete the service" });
            if (isConfirmed) {
                await deleteImage(service?.img);
                const { data } = await axios.delete(`http://localhost:5000/service/${service?.type}/${service?._id}`, {
                    headers: {
                        uid: currentUser?.uid
                    }
                })
                if (data.acknowledged && data.deletedCount) {
                    Swal.fire(
                        'Successfull!',
                        'Service Deleted Successfully.',
                        'success'
                    )
                    refetch();
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
            <form onSubmit={handleSubmit} className='bg-white w-full h-full py-5 px-3 space-y-3 overflow-y-auto relative'>
                <div ref={topRef} className='absolute top-0 right-0 left-0' />

                <label className="input-group input-group-md font-bold">
                    <span className='bg-slate-800 text-highlight text-lg'>Name </span>
                    <input type="text" onChange={e => setName(e.target.value)} name='name' className="input input-bordered input-md text-lg grow" value={name} />
                </label>

                <label className="input-group input-group-md font-bold">
                    <span className='bg-slate-800 text-highlight text-lg'>Price </span>
                    <input type="number" onChange={e => setPrice(parseFloat(e.target.value))} onWheel={e => e.target.blur()} name='price' value={price} className="input input-bordered input-md text-lg grow" />
                </label>

                <label className="input-group input-group-md font-bold">
                    <span className='bg-slate-800 text-highlight text-lg'>Minimum Order </span>
                    <input type="number" onChange={e => setMin_order(parseFloat(e.target.value))} onWheel={e => e.target.blur()} name='min_order' value={min_order} className="input input-bordered input-md text-lg grow" />
                </label>

                <div className="divider h-10" />

                <div className='flex gap-2 flex-wrap'>
                    <p className='font-bold basis-full'>Service Photo :</p>
                    <input type="file" name='image' accept='.png, .jpg, .jpeg' className="file-input file-input-bordered file-input-warning w-full max-w-xs mx-auto" />
                    <img className='w-[60%] rounded object-scale-down mx-auto' src={imgUrl(service?.img)} alt="" />
                </div>

                <div className="divider h-10" />

                <label htmlFor="description" className='space-y-2'>
                    <h3>Description : </h3>
                    <textarea id='description' onChange={e => setDescription(e.target.value)} className="textarea textarea-warning w-full resize-none h-40 overflow-y-auto" placeholder="Description..." value={description}></textarea>
                </label>

                <div className="divider h-10" />

                {/* services list */}
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
                        <input type="text" id='services' name='services' placeholder="Services" className="input input-bordered input-warning rounded-md grow" value={servicesText}
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

                <div className='flex justify-between'>
                    <input className='btn btn-sm bg-highlight text-black hover:text-highlight max-w-[10rem] w-full' type='submit' value='Update' />
                    <input type='button' onClick={handleDelete} className='btn btn-sm btn-error max-w-[10rem] w-full' value="Delete" />
                </div>

            </form>
        </section>
    );
});

export default ServiceConfigModal;
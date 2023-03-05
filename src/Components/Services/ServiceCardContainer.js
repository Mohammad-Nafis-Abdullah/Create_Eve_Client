import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAdmin from '../Hooks/useAdmin';
import { getStorage } from '../Hooks/useLocalStorage';
import { imgUrl } from '../Hooks/useMyStorage';
import { instantModal } from '../Prebuild/Modal';
import Loading from '../Share/Loading/Loading';
import ServiceConfigModal from './ServiceConfigModal';

const ServiceCardContainer = ({services, setServiceStore, refetch}) => {
    const childRef = useRef();
    const navigate = useNavigate();
    const [admin, adminLoading] = useAdmin();

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto py-10 px-3">
            {adminLoading && <Loading/>}
            {[...services]?.map((s) => (
                <div title={s.name} key={s._id} className="slided-card max-w-7xl mx-auto rounded-lg">
                    <img className="h-full w-full object-cover" src={imgUrl(s.img)} alt="" />

                    <div className="btn-div bg-black/50">
                        {
                            admin ?
                                <button onClick={() => {
                                    childRef.current?.reset();
                                    childRef.current?.moveTop();
                                    instantModal(<ServiceConfigModal ref={childRef} service={s} refetch={refetch}/>);
                                    return;
                                }} className="btn btn-error">
                                    Configure
                                </button> :
                                <button
                                    onClick={() => {
                                        if (getStorage('event')) {
                                            setServiceStore(s);
                                            navigate("/event-booking");
                                        } else {
                                            toast.error('Please add a package first', { theme: 'colored' });
                                        }
                                    }}
                                    className="btn btn-wide font-bold border border-highlight bg-[#161b1d] text-highlight hover:bg-highlight hover:text-[#161b1d]"
                                >
                                    Add
                                </button>}
                    </div>

                    <div className="card-child bg-black/50">
                        <div className="title px-2">
                            <h2 className="text-xl text-highlight text-center whitespace-nowrap text-ellipsis overflow-hidden">{s.name}</h2>
                            <p className="font-bold text-white text-center">{s.price}/-</p>
                        </div>
                        <div className="body p-3 space-y-2">
                            {
                                s?.features &&
                                <article>
                                    <h2 className="font-bold text-lg text-highlight">Features :</h2>
                                    <ul className="text-gray-200 list-decimal list-inside">
                                        {s?.features?.map((item, i) => (
                                            <li key={i} className="whitespace-pre-wrap">{item}, </li>
                                        ))}
                                    </ul>
                                </article>
                            }
                            
                            {
                                s?.items &&
                                <article>
                                    <h2 className="font-bold text-lg text-highlight">Service:</h2>
                                    <ul className="text-gray-200 list-decimal list-inside">
                                        {s?.items?.map((item, i) => (
                                            <li key={i} className="whitespace-pre-wrap">{item}, </li>
                                        ))}
                                    </ul>
                                </article>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceCardContainer;
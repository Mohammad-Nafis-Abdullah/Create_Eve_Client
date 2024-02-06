import React from 'react';

const ServiceModal = ({service}) => {

    console.log(service);
    return (
        <div className='flex justify-center items-center'>
            
            <section className='max-w-md w-full h-96 bg-white rounded overflow-y-auto p-5 space-y-3'>
                <h2 className='text-lg font-bold'>{service?.name}</h2>
                <hr />
                {
                    service?.orderCount ?
                    <div className='text-sm font-bold text-gray-500'>
                        <p>Order Quantity : {service?.orderCount}</p>
                        <p>Cost per unit : {service?.price}/-</p>
                        <hr />
                        <p className='text-gray-900'>Total : {service?.orderCount*service?.price}/-</p>
                    </div>:
                    <small className='font-bold text-gray-900'>Price : {service?.price}/-</small>
                }
                {service?.services?.length? <hr />:<div/>}
                {
                    service?.services?.length>0 &&
                    <div>
                        <h3>Services :</h3>
                        <ul className='text-sm'>
                            {
                                service?.services?.map((s, i) =>
                                    <span key={i} className='whitespace-pre-wrap'>
                                        {s},  {''}
                                    </span>)
                            }
                        </ul>
                    </div>
                }
                {service?.catering?.length? <hr />:<div/>}
                {
                    service?.catering?.length>0 &&
                    <div>
                        <h3>Catering :</h3>
                        <ul className='text-sm'>
                            {
                                service?.catering?.map((s, i) =>
                                    <li key={i} className='whitespace-pre-wrap'>
                                        {i + 1}.  {s}
                                    </li>)
                            }
                        </ul>
                    </div>
                }
                {service?.items?.length? <hr />:<div/>}
                {
                    service?.items?.length>0 &&
                    <div>
                        <h3>Items :</h3>
                        <ul className='text-sm'>
                            {
                                service?.items?.map((s, i) =>
                                    <li key={i} className='whitespace-pre-wrap'>
                                        {i + 1}.  {s}
                                    </li>)
                            }
                        </ul>
                    </div>
                }
                {service?.features?.length? <hr />:<div/>}
                {
                    service?.features?.length>0 &&
                    <div>
                        <h3>Features :</h3>
                        <ul className='text-sm'>
                            {
                                service?.features?.map((s, i) =>
                                    <li key={i} className='whitespace-pre-wrap'>
                                        {i + 1}.  {s}
                                    </li>)
                            }
                        </ul>
                    </div>
                }
            </section>

        </div>
    );
};

export default ServiceModal;
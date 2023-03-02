/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import useRefetch from '../../Hooks/useRefetch';
import { instantModal } from '../../Prebuild/Modal';
import Loading from '../../Share/Loading/Loading';
import CategoryCard from './CategoryCard';
import CategoryEditModal from './CategoryEditModal';

const ManageCategory = () => {
    const { data:categories, loading:categoryLoading, refetch:categoryRefetch } = useRefetch('http://localhost:5000/packages',[]);
    const childRef = useRef();

    return (
        <div>
            { categoryLoading && <Loading/>}
            <h2 className='pt-5 pb-3 text-2xl font-bold text-center'>Manage Package Category</h2>
            <div className='ml-8 sm:ml-5 my-3 mr-10 bg-white p-5 rounded-none sm:rounded-2xl'>
                <section className='flex flex-wrap gap-2 justify-center pt-10 relative'>
                    <button onClick={()=> {
                        childRef?.current?.blank();
                        childRef?.current?.topMove();
                        instantModal(<CategoryEditModal ref={childRef} category={null} categoryRefetch={categoryRefetch}/>);
                    }} className='btn btn-sm absolute top-0 right-0'>Create new category</button>
                {
                    [...categories].map(category=> <CategoryCard key={category._id} category={category} categoryRefetch={categoryRefetch}/>)
                }
                </section>
            </div>
        </div>
    );
};

export default ManageCategory;
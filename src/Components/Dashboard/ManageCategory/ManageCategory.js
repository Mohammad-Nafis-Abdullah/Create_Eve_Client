/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import useRefetch from '../../Hooks/useRefetch';
import { instantModal } from '../../Prebuild/Modal';
import Loading from '../../Share/Loading/Loading';
import CategoryCard from './CategoryCard';
import CategoryEditModal from './CategoryEditModal';
import { useQueryFetch } from '../../Hooks/useQueryFetch';

const ManageCategory = () => {
    // const { data: categories, loading: categoryLoading, refetch: categoryRefetch } = useRefetch('https://create-eve-server.onrender.com/packages', []);
    const { data: categories, loading: categoryLoading, refetch: categoryRefetch } = useQueryFetch('categories','https://create-eve-server.onrender.com/packages');
    const childRef = useRef();

    return (
        <div>
            {categoryLoading && <Loading />}
            <h2 className='pt-5 pb-3 sm:text-xl font-bold text-center'>Manage Package Category</h2>
            <div className='bg-white p-5 rounded-none sm:rounded-2xl'>
                <section className='flex flex-wrap gap-2 justify-center pt-10 relative'>
                    <button onClick={() => {
                        childRef?.current?.blank();
                        childRef?.current?.topMove();
                        instantModal(<CategoryEditModal ref={childRef} category={null} categoryRefetch={categoryRefetch} />);
                    }} className='btn btn-sm px-0 w-full sm:w-auto sm:px-2 absolute top-0 right-0'>Create new category</button>
                    {
                        [...categories].map(category => <CategoryCard key={category._id} category={category} categoryRefetch={categoryRefetch} />)
                    }
                </section>
            </div>
        </div>
    );
};

export default ManageCategory;
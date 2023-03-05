import React, { useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { imgUrl } from '../../Hooks/useMyStorage';
import { instantModal } from '../../Prebuild/Modal';
import CategoryEditModal from './CategoryEditModal';

const CategoryCard = ({category, categoryRefetch}) => {
    const childRef = useRef();

    const handleEdit = ()=> {
        childRef?.current?.topMove();
        instantModal(<CategoryEditModal ref={childRef} category={category} categoryRefetch={categoryRefetch}/>)
    }

    return (
        <div className='border-2 max-w-[15rem] w-full rounded-lg p-2 relative'>
            <FaEdit onClick={handleEdit} className='absolute top-0 right-0 cursor-pointer w-5 h-5 active:scale-95' title='Edit Category'/>
            <h3 className='text-center'>{category?.title}</h3>
            <img className='h-36 w-full object-cover rounded-md' src={imgUrl(category?.coverPhoto)} alt="" />
            <section className='bg-gray-900 rounded p-2 text-highlight'>
                <small className='font-bold block'>Price Range for filtering :</small>
                <small className='font-bold block'>Min range : <span className='bg-highlight text-black'>{category.priceRange[0]}/=</span></small>
                <small className='font-bold block'>Max range : <span className='bg-highlight text-black'>{category.priceRange[1]}/=</span></small>
            </section>
        </div>
    );
};

export default CategoryCard;
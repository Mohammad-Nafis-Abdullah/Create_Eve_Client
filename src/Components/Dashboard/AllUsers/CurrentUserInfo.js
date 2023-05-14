/* eslint-disable no-unused-vars */
import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import { imgUrl } from '../../Hooks/useMyStorage';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/firebase.init';

const CurrentUserInfo = ({ user, handleRemoveAdmin, handleMakeAdmin, ownerState }) => {
    const [currentUser] = useAuthState(auth);
    const { _id, uid, email, displayName, userImg, role } = user;

    return (
        <tr className={`border-4 border-black rounded-2xl bg-white text-black ${role === 'admin' && 'bg-highlight'} ${role === 'owner' && 'bg-green-500'} relative`}>
            <div className='w-5 h-5 bg-gray-800 rounded-full absolute top-[calc(50%-0.625rem)] left-5'/>
            <td className="px-16 py-2 flex flex-col items-center">
                {userImg ? (
                    <img
                        className="h-8 w-8 rounded-full object-cover "
                        src={imgUrl(userImg)}
                        alt=""
                    />
                ) : (
                    <BiUserCircle className="text-4xl"></BiUserCircle>
                )}
                <small className="font-bold">{role}</small>
            </td>
            <td>
                <span className="text-start block ml-2 font-medium capitalize">
                    {displayName}
                </span>
            </td>

            <td className="px-16 py-2 font-medium">{email}</td>

            <td className="px-16 py-2 ">
                <span className="inline-flex items-center gap-3">
                    {/* <FaEdit className="w-6 h-6 cursor-pointer" title="Edit user" onClick={()=> window.alert('edit function not implemented')}/> */}
                    {/*           
                role!=='admin' && role!=='owner' &&
                <FaTrashAlt className="text-red-600 w-5 h-5 cursor-pointer" title="Remvoe user" onClick={() => handleDeleteUser(_id)}/>
          */}
                    {
                        role !== 'admin' && role !== 'owner' &&
                        <GrUserAdmin
                            onClick={() => handleMakeAdmin(uid)}
                            className="w-8 h-8 cursor-pointer text-black bg-highlight p-1.5 rounded-lg active:scale-95"
                            title="Make admin" />
                    }
                    {
                        role === 'admin' && uid !== currentUser.uid && ownerState &&
                        <TiCancel onClick={() => handleRemoveAdmin(uid)} title="Remove from admin" className={`w-6 h-6 cursor-pointer`} />
                    }
                </span>
            </td>
        </tr>
    );
};

export default CurrentUserInfo;
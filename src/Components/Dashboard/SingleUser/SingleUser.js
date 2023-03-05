/* eslint-disable no-unused-vars */
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiUserCircle } from 'react-icons/bi';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import auth from "../../../Firebase/firebase.init";
import { imgUrl } from "../../Hooks/useMyStorage";

const SingleUser = ({ user, handleRemoveAdmin, handleMakeAdmin, ownerState }) => {
  const [currentUser] = useAuthState(auth);
  const { _id, uid, email, displayName, userImg, role } = user;

  return (
    <tr className={`border-b-2 border-gray-200 bg-white ${role==='admin' && 'bg-highlight text-black'} ${role==='owner' && 'bg-purple-500 text-white'}`}>
      <td className="px-16 py-2 flex flex-row items-center">
        {userImg ? (
          <img
            className="h-8 w-8 rounded-full object-cover "
            src={imgUrl(userImg)}
            alt=""
          />
        ) : (
          <BiUserCircle className="text-4xl"></BiUserCircle>
        )}
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
            role!=='admin' && role!=='owner' &&
              <GrUserAdmin
              onClick={()=>handleMakeAdmin(uid)}
              className="w-8 h-8 cursor-pointer text-black bg-highlight p-1.5 rounded-lg active:scale-95"
              title="Make admin"/>
          }
          {
            role==='admin' && uid!==currentUser.uid && ownerState &&
              <TiCancel onClick={()=>handleRemoveAdmin(uid)} title="Remove from admin" className={`w-6 h-6 cursor-pointer`}/>
          }
        </span>
      </td>
    </tr>
  );
};

export default SingleUser;

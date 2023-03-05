/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import auth from "../../../Firebase/firebase.init";
import useRefetch from "../../Hooks/useRefetch";
import Loading from "../../Share/Loading/Loading";
import SingleUser from "../SingleUser/SingleUser";

const AllUsers = () => {
  const [currentUser] = useAuthState(auth);
  const { data: allUsers, loading, refetch } = useRefetch("https://create-eve-server.onrender.com/allusers")
  const { data: user, loading: userLoading, refetch: userRefetch } = useRefetch(`https://create-eve-server.onrender.com/user/${currentUser?.uid}`, {})

  const makeAdmin = {
    title: 'Are you sure?',
    text: "to make the user as admin",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }

  const removeAdmin = {
    title: 'Are you sure?',
    text: "to remove the user from admin",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }

  const handleMakeAdmin = (uid) => {

    Swal.fire(makeAdmin).then(({ isConfirmed }) => {
      if (isConfirmed) {
        axios.put(`https://create-eve-server.onrender.com/make-admin/${uid}`, {}, {
          headers: {
            uid: currentUser?.uid
          }
        })
          .then(({ data }) => {
            if (data.acknowledged && data.matchedCount === 1 && data.modifiedCount === 1) {
              refetch();
              Swal.fire(
                'Successfull!',
                'Admin Successfully made.',
                'success'
              )
            } else {
              Swal.fire(
                'Unsuccessfull!',
                'Admin unsuccessfully made.',
                'error'
              )
            }
          })
      }
    });
  }

  const handleRemoveAdmin = (uid) => {

    Swal.fire(removeAdmin).then(({ isConfirmed }) => {
      if (isConfirmed) {
        axios.put(`https://create-eve-server.onrender.com/remove-admin/${uid}`, {}, {
          headers: {
            uid: currentUser?.uid
          }
        })
          .then(({ data }) => {
            if (data.acknowledged && data.matchedCount === 1 && data.modifiedCount === 1) {
              refetch();
              Swal.fire(
                'Successfull!',
                'User removed from admin Successfully.',
                'success'
              )
            } else {
              Swal.fire(
                'Unsuccessfull!',
                'User is not removed from admin.',
                'error'
              )
            }
          })
      }
    });
  }


  return (
    <div className="my-12 overflow-x-auto">
      {(loading || userLoading) && <Loading />}

      <section className="w-[56rem] mx-auto">
        <table className="">
          <thead className="">
            <tr className="bg-gray-800 text-highlight h-16">
              <th className="text-center py-2">
                <span className="font-semibold">Avatar</span>
              </th>
              <th className="text-center py-2">
                <span className="font-semibold">Name</span>
              </th>

              <th className="text-center py-2">
                <span className="font-semibold">Email</span>
              </th>

              <th className="text-center py-2">
                <span className="font-semibold">Options</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {allUsers.map((u) => (
              <SingleUser
                user={u}
                ownerState={user?.role === 'owner'}
                handleRemoveAdmin={handleRemoveAdmin}
                handleMakeAdmin={handleMakeAdmin}
                key={u._id}
              ></SingleUser>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AllUsers;

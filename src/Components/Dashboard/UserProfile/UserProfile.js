/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { BsFillCameraFill } from "react-icons/bs";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/firebase.init";
import Loading from "../../Share/Loading/Loading";
import "./UserProfile.css";
import useRefetch from "../../Hooks/useRefetch";
import axios from "axios";
import { StateContext } from "../../../App";
import useMyStorage, { imgUrl } from "../../Hooks/useMyStorage";

const fileTypes = ["JPG", "PNG", "GIF"];



const UserProfile = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(StateContext);
  const [user, loading, error] = useAuthState(auth);
  const { uploadImage, deleteImage } = useMyStorage();
  const [ldng, setLdng] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);



  const {user:currentUser,userRefetch:refetch} = state;
  
  /* const {
    data: currentUser,
    loading: userLoading,
    refetch,
  } = useRefetch(`https://create-eve-server.onrender.com/single-user/${user?.uid}`, {}); */
  

  // upload photo drag in drop

  const handleChange = (file) => {
    setFile(file);
  };

  // console.log(state);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
  }
  const openPopup = () => {
    setOpen(true);
  };

  const savingImage = async () => {
    setLdng(true);
    try {
      await deleteImage(currentUser?.userImg);
      const { name } = await uploadImage(file);
      await axios.put(`https://create-eve-server.onrender.com/user-update/${user?.uid}`, {
        userImg: name,
      })
      state.userRefetch();
      refetch();
      toast.success("Profile Picture Updated Successfully");
      navigate("/manage-profile");
      setFile(null);
      setOpen(false);

    } catch (err) {
      console.log(err);
    }
    setLdng(false);
  };

  return (
    <section className="mt-14 sm:mt-28 mb-20 container mx-auto px-4">
      {ldng && <Loading />}
      <div
        className="relative flex flex-col min-w-0 break-words border-2 bg-white w-full shadow-xl rounded-lg"
        id="profileSection"
      >
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center absolute -top-10 sm:-top-[5.5rem]">
              <div id="user_profile" className="relative">
                {!currentUser?.userImg ? (
                  <BiUserCircle className="w-20 h-20 sm:w-44 sm:h-44 border-2 text-slate-700 bg-slate-200 bg-opacity-100 text-4xl rounded-full" />
                ) : (
                  <img
                    src={imgUrl(state.user.userImg)}
                    className="w-20 h-20 sm:w-44 sm:h-44 object-cover rounded-full"
                    alt=""
                  />
                )}
                <label
                  className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 sm:w-10 sm:h-10 flex justify-center items-center"
                  id="profile_picture_change_btn"
                  onClick={() => setOpen(true)}
                >
                  <BsFillCameraFill className="sm:w-8 sm:h-8" />
                </label>

                <input
                  type="checkbox"
                  checked={open}
                  className="modal-toggle bdr w-10 h-10"
                  onChange={(e)=> {
                      setOpen(e.target.checked);
                  }}
                />
                {open && (
                  <div className="modal">
                    <div className="modal-box rounded">
                      <form>
                        <label
                          onClick={() => setOpen(false)}
                          htmlFor="profile_picture"
                          className="btn btn-sm btn-circle bg-red-500 hover:bg-red-600 border-none absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <div className="mt-10">
                          <FileUploader
                            handleChange={handleChange}
                            multiple={false}
                            name="file"
                            types={fileTypes}
                          />
                          {file && (
                            <p
                              className={`text-sm font-medium text-slate-700 mt-8`}
                            >{`Image Name: ${file?.name}`}</p>
                          )}
                          {!file && (
                            <p
                              className={`pt-4 text-sm text-red-600 font-medium`}
                            >
                              {!file && "No File Uploaded Yet !"}
                            </p>
                          )}
                        </div>
                        <div className="modal-action">
                          {file ? (
                            <input
                              onClick={savingImage}
                              type="button"
                              className="block w-full bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded cursor-pointer font-bold active:scale-[0.97] transition-transform"
                              value="SAVE"
                            />
                          ) : (
                            <input
                              type="button"
                              className="block w-full bg-blue-200 hover:bg-blue-200 text-gray-400 text-center py-2 rounded cursor-not-allowed font-bold"
                              value="SAVE"
                            />
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <section className="mt-28 mb-10 text-center">
              <h3 className="text-lg  text-slate-700">{user?.displayName}</h3>
              <p className="text-base text-slate-700">{user?.email}</p>
            </section>

            <div className="flex justify-between items-center flex-wrap gap-5 w-full">
              <section className="inline-flex gap-3 font-bold tracking-wide text-center">
                <div>
                  <p>10</p>
                  <small>Booking</small>
                </div>
                <div>
                  <p>20</p>
                  <small>Review</small>
                </div>
                <div>
                  <p>89</p>
                  <small>Comments</small>
                </div>
              </section>

              <Link
                to={`/update/user-profile`}
                className="inline-flex items-center gap-2 font-bold"
              >
                <FiEdit className="w-5 h-5" />
                <span>Edit Profile</span>
              </Link>
            </div>
            {/* for logout button */}
            {/* className="sm:absolute sm:top-32 sm:right-20 md:top-28 md:right-40 lg:top-28 lg:right-32 xl:top-20 xl:right-48 " */}

            {/* className="sm:absolute flex w-full justify-center md:justify-end md:top-28 lg:top-20 xl:top-16"  */}
          </div>
          <div className="font-semibold mt-14">
            <div className="flex flex-col text-sm sm:text-base">
              {currentUser?.city && (
                <p className="text-slate-700">City : {currentUser?.city}</p>
              )}
              {currentUser?.country && (
                <p className="text-slate-700">
                  Country : {currentUser?.country}
                </p>
              )}
              {currentUser?.address && (
                <p className="text-slate-700">
                  Address : {currentUser?.address}
                </p>
              )}
            </div>
            <div className="mt-10 py-10 border-t border-gray-200 text-start">
              <div>
                <div className="w-full lg:w-9/12 px-4">
                  <p className="text-xl pb-5">About Me</p>
                  <p className="text-base text-slate-600 font-normal">
                    {currentUser?.aboutMe
                      ? currentUser?.aboutMe
                      : "Set Your About "}
                  </p>
                  {currentUser?.aboutMe?.length > 200 && (
                    <a
                      href="#!"
                      className="font-normal text-lightBlue-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      {" "}
                      Show more
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Loading from "../../Share/Loading/Loading";
import "./AddService.css";
import { TbSquarePlus, TbTrash } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import useLocalStorage from "../../Hooks/useLocalStorage";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import useMyStorage from "../../Hooks/useMyStorage";

const AddService = () => {
  const [user] = useAuthState(auth);
  const { uploadImage,deleteImage } = useMyStorage();

  // State initilize
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);
  const [text, setText] = useState("");
  const [items, setStorage, clearStorage] = useLocalStorage("items", []);

  useEffect(() => {
    clearStorage();
  }, [type]);

  const types = ["catering", "lighting", "audiovisual"];

  const typeSelection = (e) => {
    if (e.target?.tagName === "INPUT") {
      setType(e.target.id);
    } else {
      return;
    }
  };

  // handle service adding
  const handleServiceAdding = async (e) => {
    e.preventDefault();
    const serviceImg = e.target.image.files[0];

    const service = {
      name: e.target.name.value,
      type: type,
      price: parseFloat(e.target.price.value),
      min_order: parseFloat(e.target.min_order.value),
    };

    const service_diff = {};

    if (type === "catering") {
      service_diff.items = items;
    } else {
      service_diff.description = e.target.description.value;
      service_diff.features = items;
    }

    try {
      const {name} = await uploadImage(serviceImg);
      const {data} = await axios.post(`http://localhost:5000/service/${type}`, {...service,...service_diff,img:name,});
      data.acknowledged?
        toast.success("Service added successfully", {theme: "colored",})
        :
        toast.error("Service not added", { theme: "colored" });
    } catch (err) {
      
    }

    clearStorage();
    e.target.reset();
  };

  return (
    <div style={{ background: "#f4f7fc" }}>
      {loading && <Loading></Loading>}
      <div className="2xl:max-w-7xl mx-auto">
        <h2 className="pt-5 pb-3 text-2xl font-bold text-center">
          Add a Service
        </h2>
        <div className="max-h-fit py-2 pb-12">
          <div className="ml-8 sm:ml-5 mr-10 bg-white p-5 rounded-none sm:rounded-2xl">
            <h2 className="text-2xl underline underline-offset-2">
              Service Information
            </h2>

            <form onSubmit={handleServiceAdding}>
              <div className="mt-5">
                <div className="space-y-5">
                  {/* service name */}
                  <div className="form-control">
                    <label htmlFor="name">
                      <h3>Service Name :</h3>
                      <input
                        type="text"
                        id="name"
                        name="title"
                        placeholder="Service Name"
                        className="input input-bordered inputDegine"
                        required
                      />
                    </label>
                  </div>

                  {/* service type */}
                  <div className="form-control flex-row flex-wrap gap-y-1 gap-x-3 items-center">
                    <h3 className="basis-full">Type :</h3>
                    {types?.map((type, i) => (
                      <label
                        onClick={typeSelection}
                        key={i}
                        htmlFor={type}
                        className="inline-flex items-center gap-1 cursor-pointer"
                      >
                        {type}
                        <input
                          name="type"
                          id={type}
                          type="radio"
                          className="cursor-pointer"
                          required
                        />
                      </label>
                    ))}
                  </div>

                  {/* service image */}
                  <div className="form-control">
                    <label htmlFor="" className="space-y-2">
                      <h3>Upload service image :</h3>
                      <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                        required
                      />
                    </label>
                  </div>

                  {/* service price */}
                  <div className="form-control">
                    <label htmlFor="price">
                      <h3>Service Price :</h3>
                      <input
                        type="number"
                        id="price"
                        onWheel={(e) => e.target.blur()}
                        name="price"
                        placeholder="Service Price"
                        className="input input-bordered inputDegine"
                        required
                      />
                    </label>
                  </div>

                  {/* service min order */}
                  <div className="form-control">
                    <label htmlFor="min_order">
                      <h3>Service Minimum Order :</h3>
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        id="min_order"
                        name="min_order"
                        placeholder="Service Minimum Order"
                        className="input input-bordered inputDegine"
                        required
                      />
                    </label>
                  </div>

                  {type && type === "catering" && (
                    <>
                      <div className="form-control">
                        {/* service min order */}
                        <label htmlFor="items" className="space-y-2">
                          <article className="flex items-center">
                            <h3>Service Items : </h3>
                            {items?.length ? (
                              <TbTrash
                                onClick={clearStorage}
                                className="w-6 h-6 text-red-500 cursor-pointer"
                                title="clear all service items"
                              />
                            ) : (
                              ""
                            )}
                          </article>
                          <article className="">
                            {items?.map((item, i) => (
                              <div
                                key={i}
                                className="text-black pr-5 relative space-y-2 py-1"
                              >
                                <p className="">
                                  {i + 1}. {item}
                                </p>
                                <MdCancel
                                  className="cursor-pointer text-red-500 absolute top-0 right-0 w-5 h-5"
                                  onClick={() => {
                                    const arr = [...items];
                                    arr.splice(i, 1);
                                    setStorage([...arr]);
                                  }}
                                />
                                <hr className="basis-full" />
                              </div>
                            ))}
                          </article>
                          <section className="flex items-center">
                            <input
                              type="text"
                              id="items"
                              name="items"
                              placeholder="Service Items"
                              className="input input-bordered inputDegine"
                              value={text}
                              onChange={(e) => {
                                setText(e.target.value);
                              }}
                            />
                            <TbSquarePlus
                              className="h-10 w-10 cursor-pointer"
                              onClick={() => {
                                if (items) {
                                  setStorage([...items, text]);
                                } else {
                                  setStorage([text]);
                                }
                                setText("");
                              }}
                            />
                          </section>
                        </label>
                      </div>
                    </>
                  )}

                  {type && type !== "catering" && (
                    <>
                      <div className="form-control">
                        {/* service min order */}

                        <label htmlFor="description">
                          <h3>Service Description :</h3>
                          <textarea
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Service description"
                            className="input input-bordered inputDegine min-h-[10rem] max-h-40 resize-none p-3 overflow-y-auto"
                            required
                          ></textarea>
                        </label>
                      </div>
                      <div className="form-control">
                        {/* service min order */}
                        <label htmlFor="features" className="space-y-2">
                          <article className="flex items-center">
                            <h3>Service Features : </h3>
                            {items?.length ? (
                              <TbTrash
                                onClick={clearStorage}
                                className="w-6 h-6 text-red-500 cursor-pointer"
                                title="clear all service items"
                              />
                            ) : (
                              ""
                            )}
                          </article>
                          <article className="">
                            {items?.map((item, i) => (
                              <div
                                key={i}
                                className="text-black pr-5 relative space-y-2 py-1"
                              >
                                <p className="">
                                  {i + 1}. {item}
                                </p>
                                <MdCancel
                                  className="cursor-pointer text-red-500 absolute top-0 right-0 w-5 h-5"
                                  onClick={() => {
                                    const arr = [...items];
                                    arr.splice(i, 1);
                                    setStorage([...arr]);
                                  }}
                                />
                                <hr className="basis-full" />
                              </div>
                            ))}
                          </article>
                          <section className="flex items-center">
                            <input
                              type="text"
                              id="features"
                              name="features"
                              placeholder="Service Features"
                              className="input input-bordered inputDegine"
                              value={text}
                              onChange={(e) => {
                                setText(e.target.value);
                              }}
                            />
                            <TbSquarePlus
                              className="h-10 w-10 cursor-pointer"
                              onClick={() => {
                                if (text) {
                                  if (items) {
                                    setStorage([...items, text]);
                                  } else {
                                    setStorage([text]);
                                  }
                                }
                                setText("");
                              }}
                            />
                          </section>
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="text-center py-8">
                <input
                  className="btn max-w-[16rem] w-full btn-sm"
                  disabled={!items?.length}
                  type="submit"
                  value="Add Service"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;

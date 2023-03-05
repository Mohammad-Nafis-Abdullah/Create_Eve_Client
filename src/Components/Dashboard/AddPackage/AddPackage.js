/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new-wrappers */
import React, { useEffect } from "react";
import { useState } from "react";
import { TbSquarePlus, TbTrash } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import useLocalStorage from "../../Hooks/useLocalStorage";
import useRefetch from "../../Hooks/useRefetch";
import Loading from "../../Share/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import { toast } from "react-toastify";
import axios from "axios";
import useMyStorage from "../../Hooks/useMyStorage";

const AddPackage = () => {
  const [user] = useAuthState(auth);
  const { uploadImage, deleteImage } = useMyStorage();
  const [pkg, setPkg] = useState(null);
  const [cateringState, setCateringState] = useState(false);
  const [text, setText] = useState("");
  const [cateringsText, setCateringsText] = useState("");
  const [items, setStorage, clearStorage] = useLocalStorage("package", []);
  const [caterings, setCateringsStorage, clearCateringsStorage] =
    useLocalStorage("pkgCatering", []);
  const {
    data: pkgs,
    loading: pkgLoading,
    refetch: pkgRefetch,
  } = useRefetch(`http://localhost:5000/packages`, []);

  useEffect(() => {
    clearStorage();
    clearCateringsStorage();
    setCateringState(false);
  }, [pkg]);

  useEffect(() => {
    clearCateringsStorage();
  }, [cateringState]);

  const categoryNaming = (text = "") => {
    return text.toLowerCase().trim().split(" ").join("-");
  };


  // add package function 
  const handleAddPackage = async (e) => {
    e.preventDefault();
    const pkgImg = e.target.image.files[0];

    const createdPackage = {
      name: e.target.title.value,
      price: e.target.price.value,
      services: items,
    };

    if (caterings?.length) {
      createdPackage.catering = caterings;
    } else {
      delete createdPackage.catering;
    }

    const category = pkg
      ? e.target.pkg.value
      : categoryNaming(e.target.category.value);

    if (!pkg) {
      const categoryObj = {
        title: e.target.category.value,
        category: categoryNaming(e.target.category.value),
      };

      try {
        const coverImg = e.target.cover.files[0];
        const {name:coverImgName} = await uploadImage(coverImg);
        const categoryData = await axios.put(`http://localhost:5000/packages/${category}`,{ ...categoryObj, coverPhoto: coverImgName });

      } catch (err) {
        // console.log(err);
      }
    }

    try {
      const {name} = await uploadImage(pkgImg);
      console.log(name);
      const {data} = await axios.post(`http://localhost:5000/package/${category}`, {...createdPackage,coverPhoto:name,});
      console.log(data);
      data.acknowledged?
        toast.success("Package added successfully", {theme: "colored",})
        :
        toast.error("Package not added", { theme: "colored" });
      
    } catch (err) {
      toast.error("There was an error", { theme: "colored" });
      // console.dir(err);
    }

    pkgRefetch();
    clearStorage();
    clearCateringsStorage();
    setCateringState(false);
    e.target.reset();
  };

  return (
    <div>
      <div className="2xl:max-w-7xl mx-auto">
        {pkgLoading && <Loading />}
        <h2 className="pt-5 pb-3 text-2xl font-bold text-center">
          Add a Package
        </h2>
        <div className="max-h-fit py-2 pb-12">
          <div className="ml-8 sm:ml-5 mr-10 bg-white p-5 rounded-none sm:rounded-2xl">
            <h2 className="text-2xl underline underline-offset-2">
              Package Information
            </h2>

            <form onSubmit={handleAddPackage}>
              <div className="mt-5">
                <div className="space-y-5">
                  {/* package category */}
                  <div className="form-control">
                    <label htmlFor="pkg">
                      <h3>Package Category :</h3>
                      <select
                        onChange={(e) => {
                          setPkg(new Boolean(e.target.value).valueOf());
                        }}
                        name="pkg"
                        id="pkg"
                        className="p-1 border-2 border-highlight rounded uppercase"
                      >
                        <option value={""}>others</option>
                        {[...pkgs].map((pkg) => (
                          <option
                            key={pkg._id}
                            className="text-orange-600 font-bold"
                            value={pkg.category}
                          >
                            {pkg.title}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* package image */}
                  {!pkg && (
                    <div className="form-control">
                      <label htmlFor="" className="space-y-2">
                        <h3>Upload package cover :</h3>
                        <input
                          type="file"
                          name="cover"
                          accept="image/png, image/jpeg, image/jpg"
                          required
                        />
                      </label>
                    </div>
                  )}

                  {/* package category name */}
                  {!pkg && (
                    <div className="form-control">
                      <label htmlFor="categoryName">
                        <h3>Category Name :</h3>
                        <input
                          type="text"
                          id="categoryName"
                          name="category"
                          placeholder="Category Name"
                          className="input input-bordered inputDegine"
                          required={!pkg}
                        />
                      </label>
                    </div>
                  )}

                  {/* package name */}
                  <div className="form-control">
                    <label htmlFor="title">
                      <h3>Package Title :</h3>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Package Title"
                        className="input input-bordered inputDegine"
                        required
                      />
                    </label>
                  </div>

                  {/* package image */}
                  <div className="form-control">
                    <label htmlFor="" className="space-y-2">
                      <h3>Upload package image :</h3>
                      <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                        required
                      />
                    </label>
                  </div>

                  {/* Package price */}
                  <div className="form-control">
                    <label htmlFor="price">
                      <h3>Package Price :</h3>
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        id="price"
                        name="price"
                        placeholder="Package Price"
                        className="input input-bordered inputDegine"
                        required
                      />
                    </label>
                  </div>

                  {/* services */}
                  <div className="form-control">
                    <label htmlFor="services" className="space-y-2">
                      <article className="flex items-center">
                        <h3>Services : </h3>
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
                          id="services"
                          name="services"
                          placeholder="Services"
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

                  <div className="form-control">
                    <label
                      htmlFor="cateringSelect"
                      className="inline-flex items-center gap-2 select-none cursor-pointer underline"
                    >
                      <small>Caterings </small>
                      <input
                        onChange={(e) =>
                          setCateringState(JSON.parse(e.target.checked))
                        }
                        type="checkbox"
                        id="cateringSelect"
                        className=""
                        checked={cateringState}
                      />
                    </label>
                  </div>

                  {/* caterings */}
                  {cateringState && (
                    <div className="form-control">
                      <label htmlFor="caterings" className="space-y-2">
                        <article className="flex items-center">
                          <h3>Caterings : </h3>
                          {caterings?.length ? (
                            <TbTrash
                              onClick={clearCateringsStorage}
                              className="w-6 h-6 text-red-500 cursor-pointer"
                              title="clear all service items"
                            />
                          ) : (
                            ""
                          )}
                        </article>
                        <article className="">
                          {caterings?.map((catering, i) => (
                            <div
                              key={i}
                              className="text-black pr-5 relative space-y-2 py-1"
                            >
                              <p className="">
                                {i + 1}. {catering}
                              </p>
                              <MdCancel
                                className="cursor-pointer text-red-500 absolute top-0 right-0 w-5 h-5"
                                onClick={() => {
                                  const arr = [...caterings];
                                  arr.splice(i, 1);
                                  setCateringsStorage([...arr]);
                                }}
                              />
                              <hr className="basis-full" />
                            </div>
                          ))}
                        </article>
                        <section className="flex items-center">
                          <input
                            type="text"
                            id="caterings"
                            name="caterings"
                            placeholder="Caterings"
                            className="input input-bordered inputDegine"
                            value={cateringsText}
                            onChange={(e) => {
                              setCateringsText(e.target.value);
                            }}
                          />
                          <TbSquarePlus
                            className="h-10 w-10 cursor-pointer"
                            onClick={() => {
                              if (cateringsText) {
                                if (caterings) {
                                  setCateringsStorage([
                                    ...caterings,
                                    cateringsText,
                                  ]);
                                } else {
                                  setCateringsStorage([cateringsText]);
                                }
                              }
                              setCateringsText("");
                            }}
                          />
                        </section>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center py-8">
                <input
                  className="btn max-w-[16rem] w-full btn-sm"
                  type="submit"
                  value="Add Package"
                  disabled={
                    cateringState
                      ? !(caterings?.length && items?.length)
                      : !items?.length
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;

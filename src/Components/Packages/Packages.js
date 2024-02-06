/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useRefetch from "../Hooks/useRefetch";
import PackageCard from "./PackageCard";
import style from "./packages.module.css";
import '../Home/Blog/BlogDetails/BlogDetails.css'
import { BsSearch } from "react-icons/bs";
import { TbArrowsDownUp, TbArrowsUpDown } from "react-icons/tb";
import { useEffect } from "react";
import { imgUrl } from "../Hooks/useMyStorage";
import { useQueryFetch } from "../Hooks/useQueryFetch";
import Loading from "../Share/Loading/Loading";

const Packages = () => {
  const { category } = useParams();
  const [range, setRange] = useState(0);
  const [sort, setSort] = useState(true);
  const { pathname } = useLocation();

  // const { data: selectedCategory, refetch } = useRefetch(`/packages/${category}`,{});
  const { data: { data: selectedCategory }, loading, refetch } = useQueryFetch('selected-category', `/packages/category/${category}`);


  // const { data: allPackages, loading:ldng, refetch: packageRefetch } = useRefetch(`/packages/${category}/collection?range=${range}&sort=${sort ? 1 : 0}`,[]);
  const { data: { data: allPackages }, loading: ldng, refetch: packageRefetch } = useQueryFetch('all-package', `/packages/${category}/collection?range=${range}&sort=${sort ? 1 : 0}`);


  useEffect(() => {
    packageRefetch();
  }, [range]);

  useEffect(() => {
    packageRefetch();
  }, [sort]);

  useEffect(() => {
    setRange(0);
  }, [pathname])

  return (
    <div className="min-h-screen">
      {(loading || ldng) && <Loading />}
      <section
        data-testid='packages'
        className={`${style.bg} h-80`}
        style={{
          backgroundImage: `url(${imgUrl(selectedCategory?.coverPhoto)})`,
        }}
      >
        <div className="h-full bg-black/80 flex flex-col justify-center items-center openSans text-center p-5">
          <h4 className="breadcrumb-section font-bold">
            {selectedCategory?.title} packages
          </h4>
          <h2 className="big-title" data-aos="zoom-in">
            create-eve <br />
            <strong className="text-highlight whitespace-pre-wrap">
              {selectedCategory?.category}  packages
            </strong>
          </h2>
        </div>
      </section>

      {/* filter options */}
      <section className="mt-10 mx-auto max-w-7xl px-5 flex justify-between items-center flex-wrap gap-y-10 gap-x-5">
        <div className="max-w-sm grow px-12">
          <h3 className="text-lg">Price :</h3>
          <input
            onChange={(e) => setRange(e.target.value)}
            value={range}
            type="range"
            min={selectedCategory?.priceRange?.[0]}
            max={selectedCategory?.priceRange?.[1]}
            className="range range-xs"
            step={
              ((selectedCategory?.priceRange?.[1] -
                selectedCategory?.priceRange?.[0]) /
                4) + ''
            }
          />
          <div className="w-full flex justify-between text-xs">
            <span className="relative font-bold">
              <small>|</small>
              <small className="absolute -bottom-3">
                {selectedCategory?.priceRange?.[0]}/-
              </small>
            </span>

            <span className="relative font-bold">
              <small>|</small>
              <small className="absolute -bottom-3">
                {parseInt(
                  selectedCategory?.priceRange?.[0] +
                  (selectedCategory?.priceRange?.[1] -
                    selectedCategory?.priceRange?.[0]) /
                  4
                )}
                /-
              </small>
            </span>
            <span className="relative font-bold">
              <small>|</small>
              <small className="absolute -bottom-3">
                {parseInt(
                  selectedCategory?.priceRange?.[0] +
                  ((selectedCategory?.priceRange?.[1] -
                    selectedCategory?.priceRange?.[0]) /
                    4) *
                  2
                )}
                /-
              </small>
            </span>

            <span className="relative font-bold">
              <small>|</small>
              <small className="absolute -bottom-3">
                {parseInt(
                  selectedCategory?.priceRange?.[0] +
                  ((selectedCategory?.priceRange?.[1] -
                    selectedCategory?.priceRange?.[0]) /
                    4) *
                  3
                )}
                /-
              </small>
            </span>

            <span className="relative font-bold">
              <small>|</small>
              <small className="absolute -bottom-3">
                {selectedCategory?.priceRange?.[1]}/-
              </small>
            </span>
          </div>
        </div>

        {/* sort state */}
        <div onClick={() => setSort(prev => !prev)} className="p-2 rounded-md inline-flex gap-2 items-center bg-highlight text-gray-900 cursor-pointer select-none border-2">
          {
            sort ?
              <TbArrowsDownUp className="h-5 w-5" /> :
              <TbArrowsUpDown className="h-5 w-5" />
          }
          {
            sort ?
              <span className="font-bold">Price Low to High</span> :
              <span className="font-bold">Price High to Low</span>
          }
        </div>
      </section>


      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto py-10 px-3">
        {allPackages?.map((eventPackage) => (
          <PackageCard
            key={eventPackage?._id}
            eventPackage={eventPackage}
            category={category}
            refetchAllPackage={packageRefetch}
          />
        ))}
      </section>
    </div>
  );
};

export default Packages;

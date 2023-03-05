/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useLocalStorage from "../Hooks/useLocalStorage";
import { imgUrl } from "../Hooks/useMyStorage";
import { instantModal, closeModal } from "../Prebuild/Modal";
import Loading from "../Share/Loading/Loading";
import ConfigureModal from "./ConfigureModal";

const PackageCard = ({ eventPackage, category, refetchAllPackage }) => {
  const [admin,adminLoading] = useAdmin();
  const { coverPhoto, name, price, services, catering } = eventPackage;
  const [storage, setStorage] = useLocalStorage("event", {});
  const navigate = useNavigate();
  const [configItem, setConfigItem, clearConfigItem] = useLocalStorage('configItem',null);
  const {pathname} = useLocation();

  useEffect(()=> {
      clearConfigItem();
      closeModal();
    },[pathname])
    
  useEffect(() => {
    if (!!configItem) {
      instantModal(<ConfigureModal configItem={configItem} clearConfigItem={clearConfigItem} refetchAllPackage={refetchAllPackage} />);
      return;
    };
    closeModal();
  }, [configItem])

  return (
    <div className="slided-card max-w-7xl mx-auto rounded-lg">
      {adminLoading && <Loading/>}
      <img className="h-full w-full object-cover" src={imgUrl(coverPhoto)} alt="" />
      <div className="btn-div bg-black/50">
        {
          admin ?
            <button className={'btn btn-error flex justify-center items-center'} onClick={()=> {
                setConfigItem({...eventPackage,category})
              }}>
              Configure
            </button>:
            <button
              onClick={() => {
                setStorage({ ...eventPackage, category });
                navigate("/event-booking");
              }}
              className="btn btn-wide font-bold border border-highlight bg-[#161b1d] text-highlight hover:bg-highlight hover:text-[#161b1d]"
            >
              Book Now
            </button>
        }
      </div>

      <div className="card-child bg-black/50">
        <div className="title flex flex-col justify-center items-center">
          <h2 className="text-xl text-highlight">{name}</h2>
          <p className="font-bold text-white">{price}/=</p>
        </div>
        <div className="body p-3 space-y-2">
          <article>
            <h2 className="font-bold text-lg text-highlight">Service:</h2>
            <div className="text-gray-200">
              {services?.map((service, index) => (
                <span key={index} className="whitespace-pre-wrap">
                  {service},{" "}
                </span>
              ))}
            </div>
          </article>

          {catering?.length && (
            <article>
              <h2 className="font-bold text-lg text-highlight">Catering:</h2>
              <div className="text-gray-200">
                {catering?.map((catering, index) => (
                  <span key={index} className="whitespace-pre-wrap">
                    {catering},{" "}
                  </span>
                ))}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

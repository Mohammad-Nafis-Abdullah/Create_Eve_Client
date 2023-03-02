import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

const Map = () => {
  const position = [22.359197, 91.821603];
  return (
    <div className="mt-36  px-5 bg-gray-100 ">
      <div className="pb-10 pt-5">
        <p className="font-bold ml-3 mb-5">GEC Cirle,Chattogram,Bangladesh</p>
        <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>GEC Cirle,Chattogram,Bangladesh</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

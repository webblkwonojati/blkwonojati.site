"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet + Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LeafletMap() {
  const position: [number, number] = [-7.9054311, 112.6575037]; // UPT BLK Wonojati

  return (
    <div className="w-full h-full min-h-[200px] bg-slate-800">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="font-sans">
              <p className="font-black text-slate-900 m-0">UPT BLK Wonojati</p>
              <p className="text-[10px] text-slate-500 m-0">Singosari, Malang</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const POSITION: [number, number] = [112.6575037, -7.9054311];

export default function MapLibreMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: POSITION,
      zoom: 15,
      interactive: false,
      attributionControl: false,
    });

    const popup = new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(
      `<div style="font-family:system-ui,sans-serif">
        <p style="font-weight:900;color:#0f172a;margin:0;font-size:14px">UPT BLK Wonojati</p>
        <p style="color:#64748b;margin:4px 0 0;font-size:11px">Singosari, Malang</p>
      </div>`
    );

    new maplibregl.Marker({ color: "#16a34a" })
      .setLngLat(POSITION)
      .setPopup(popup)
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="w-full h-full bg-slate-100 animate-pulse" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  );
}

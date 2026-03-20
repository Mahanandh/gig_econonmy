"use client";

import React, { useEffect, useRef } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from "framer-motion";

interface MapboxWrapperProps {
  pulseLocation: { lng: number; lat: number; color?: string } | null;
  isAutoPilot: boolean;
}

export default function MapboxWrapper({ pulseLocation, isAutoPilot }: MapboxWrapperProps) {
  const mapRef = useRef<MapRef>(null);

  const [hasError, setHasError] = React.useState(false);

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const isPlaceholder = token === "your_token_here" || !token;

  useEffect(() => {
    if (isPlaceholder) {
      setHasError(true);
    }
  }, [isPlaceholder]);

  if (hasError || isPlaceholder) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black/90 rounded-3xl border border-white/10 backdrop-blur-md p-6 text-center">
        <div className="text-gray-400 font-bold font-heading text-xl">System Configuration Required</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 80.27,
          latitude: 13.08,
          zoom: 11
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        interactive={false}
        pitch={45}
      >
        {pulseLocation && (
          <Marker longitude={pulseLocation.lng} latitude={pulseLocation.lat}>
            <motion.div 
              className="w-12 h-12 rounded-full flex items-center justify-center relative"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div 
                className="absolute inset-0 rounded-full border-2 shadow-[0_0_30px_currentColor] scale-150 animate-ping" 
                style={{ 
                  backgroundColor: pulseLocation.color ? `${pulseLocation.color}66` : 'rgba(59,130,246,0.4)',
                  borderColor: pulseLocation.color || 'var(--color-primary)',
                  color: pulseLocation.color || 'var(--color-primary)'
                }}
              />
              <div className="w-3 h-3 rounded-full bg-white z-10 shadow-[0_0_10px_white]" />
            </motion.div>
          </Marker>
        )}
      </Map>
      
      {/* Wave scanning background for monitoring pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] mix-blend-screen pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-background/30 mix-blend-multiply transition-colors pointer-events-none" />
      
      {/* Scanning Animation */}
      {isAutoPilot && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 border border-primary/30 px-5 py-2 rounded-full backdrop-blur-md flex items-center gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.5)] z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
          <span className="text-xs font-mono text-primary font-bold tracking-widest">SCANNING NODES</span>
        </div>
      )}
    </motion.div>
  );
}

import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "../App.css";
function GMap({ location }) {
  const position = useMemo(() => {
    if (location?.lat) {
      return [parseFloat(location.lat), parseFloat(location.lng)];
    }
    return [0, 0];
  }, [location]);
  console.log(location);
  return (
    <div>
      <MapContainer
        center={position}
        zoom={2}
        style={{
          height: "450px",
          width: "100%",
          zIndex: 1,
          borderRadius: "2.5rem",
          marginTop: "1rem",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Lat: {position[0]}
            <br /> Lng: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
      <div className="location__details">
        <p>
          Lat: <b>{position[0]}</b>
        </p>
        <p>
          Long: <b>{position[1]}</b>
        </p>
      </div>
    </div>
  );
}

export default GMap;

import React, { Component } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lng: 126.936397871513,
  lat: 35.16772269756856,
};
class Map extends Component {
  render() {
    return (
      <LoadScript googleMapsApiKey="">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          <MarkerF position={center} icon={{ url: "/Marker.png", scale: 5 }} />
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;

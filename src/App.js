import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, {Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import pinMarker from './img/pin.png'

const App = () => {
  const MAPBOX_TOKEN=process.env.REACT_APP_MAPBOX_TOKEN
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="70%"
        height="70%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        
      >
        <button onClick={() => (console.log('clicked'))} >
         <Marker longitude={-122} latitude={37} anchor="bottom" >
          <img src= {pinMarker} width='20' height='20'/>
        </Marker>
        </button>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          reverseGeocode={true}
        />
      </MapGL>
    </div>
  );
};

export default App
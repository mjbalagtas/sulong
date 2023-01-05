import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, {Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import pinMarker from './img/pin.png'
import Car from './components/Car'
import carServices from './services/cars'
import CarForm from './components/CarForm'
import { carFeatures } from './utils/carFeatures'

const App = () => {
  const MAPBOX_TOKEN=process.env.REACT_APP_MAPBOX_TOKEN
  const [viewportSearch, setViewportSearch] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const mapRefSearch = useRef();
  const [cars, setCars] = useState({features: [], images: []})
  const [carPhotosValue, setCarPhotosValue] = useState(null)
  const [carModelValue, setCarModelValue] = useState('')
  const [carDescriptionValue, setCarDescriptionValue] = useState('')
  const [checkedCarFeatures, setCheckedCarFeatures] = useState(new Array(carFeatures.length).fill(false))
  //let addedCarCheckedFeatures = new Array(carFeatures.length).fill(false)
  
  const handleCarForm = async (event) => {
    event.preventDefault()
    try{
      let addedCarFeatures = []

      checkedCarFeatures.forEach((item, index) => {
        if(item)
          addedCarFeatures = addedCarFeatures.concat(carFeatures[index])
      })

      console.log('Added features', addedCarFeatures)
      console.log('photo',carPhotosValue)
      let formData = new FormData()
      formData.append(
        'images',
        carPhotosValue
      )
      console.log('form', formData)
      await carServices.uploadPhoto(carPhotosValue)
      const addedCar = await carServices.create({
        model: carModelValue,
        description: carDescriptionValue,
        features: addedCarFeatures,
        photos: ''
      })
      //console.log('added car', addedCar)
      setCarModelValue('')

    }catch(exception){
      console.log(exception)
    }

  }

  const handleCarPhotosChange = (event) => {
    setCarPhotosValue(event.target.files[0])
    console.log( 'photo', carPhotosValue)
  }

  const handleCarModelChange = (event) => {

    setCarModelValue(event.target.value)
  }

  const handleCarDescriptionChange = (event) => {
    setCarDescriptionValue(event.target.value)
  }

  const handleCarFeaturesChange = async (position) => {

    const updatedCheckedState = await checkedCarFeatures.map((item, index) => {
      if(index === position)
        return !item
      else
        return item
    })
    console.log(updatedCheckedState)
    setCheckedCarFeatures(updatedCheckedState)
  }


  useEffect(() => {
    carServices
      .getOne(1)
      .then(response => setCars(response))
  }, [])

  const handleViewportSearchChange = useCallback(
    (newViewport) => setViewportSearch(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportSearchChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewporSearchtChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportSearchChange]
  );

  return (
    <>
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRefSearch}
        {...viewportSearch}
        width="70%"
        height="70%"
        onViewportChange={handleViewportSearchChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        
      >
        <button onClick={() => (console.log('clicked'))} >
         <Marker longitude={-122} latitude={37} anchor="bottom" >
          <img src= {pinMarker} width='20' height='20'/>
        </Marker>
        </button>
        <Geocoder
          mapRef={mapRefSearch}
          onViewportChange={handleGeocoderViewportSearchChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          reverseGeocode={true}
        />
      </MapGL>

    </div>
    <Car car={cars} />
    <CarForm 
      handleCarForm={handleCarForm} 
      carModelValue={carModelValue} 
      handleCarModelChange={handleCarModelChange} 
      carDescriptionValue={carDescriptionValue}
      handleCarDescriptionChange={handleCarDescriptionChange}
      carFeatures={carFeatures}
      checkedCarFeatures={checkedCarFeatures}
      handleCarFeaturesChange={handleCarFeaturesChange}
      // carPhotosValue={carPhotosValue}
      handleCarPhotosChange={handleCarPhotosChange}
    />
    </>
  );
};

export default App
import React, {useState} from 'react'

import Geocoder from '@mapbox/react-geocoder'

const App = () => {
  const [searchMap, setSearchMap] = useState('')
  const mapbox_token = process.env.REACT_APP_MAPBOX_TOKEN
  const handleSearchMap = (event) => {
    setSearchMap(event.target.value)
    console.log(searchMap)
  }
  return(
    <>
    <h1>Hello</h1>
    <input onChange={handleSearchMap} />
    <Geocoder
  accessToken={mapbox_token}
  onSelect={() => console.log('nothing')}
  // onSuggest=optional function
  // source=optional string, default 'mapbox.places'
  // endpoint=optional string, default 'http://api.tiles.mapbox.com'
  // inputClass=optional string, default ''
  // inputPlaceholder=optional string, default 'Search'
  // resultClass=optional string, default ''
  // resultsClass=optional string, default ''
  // showLoader=optional string, default ''
  // inputPosition=optional string, default 'top', can be 'bottom'
  // resultFocusClass=optional string, default 'strong'
  // proximity=optional string, default '',
  // bbox=optional string, default '',
  // types=optional string, default '',
  // focusOnMount=optional bool, default true
  />
    </>
    
  )
}

export default App
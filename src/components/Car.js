import React from 'react'

const Car = ({car}) => {

  return(
      <>
        <h1>
          {car.model}
        </h1>
        <div>
          {car.images.map( image =>
                <img key={image} src={image} />
          )}
        </div>
        <h1>
            Owner: {car.owner}
        </h1>
        <p>
            {car.description}
        </p>
        <ul>
          {car.features.map(feature => <li key={feature} >{feature}</li> )}   
        </ul>
      </>
  )
}

export default Car
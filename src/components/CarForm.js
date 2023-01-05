import React from 'react'

const CarForm = ({
  handleCarForm, 
  carModelValue,
  handleCarModelChange,
  carDescriptionValue,
  handleCarDescriptionChange,
  carFeatures,
  checkedCarFeatures,
  handleCarFeaturesChange,
  handleCarPhotosChange
}) => {
  return(
    <>
    <form onSubmit = {handleCarForm} >
      <h2>Add new Car</h2>
      <div>
        <label>
          Upload photo
        </label>
        <input type="file" onChange={handleCarPhotosChange} />
      </div>
      <div>
        <label>
          Car Model
        </label>
        <input type="text" value={carModelValue} onChange={handleCarModelChange} required />
      </div>
      <div>
        <label>
          Description
        </label>
        <textarea value={carDescriptionValue} onChange={handleCarDescriptionChange} required />
      </div>
      <div>
        <ul>
          {carFeatures.map((feature, index) => {
            return(
              <li key={index}>
                <input type="checkbox" value={carFeatures} checked={checkedCarFeatures[index]} onChange={() => handleCarFeaturesChange(index)} />
                <label>{feature}</label>
              </li>
            )
          })}
        </ul>
      </div>
      <button type="submit">Submit</button>
    </form>
  </>
  )
}

export default CarForm
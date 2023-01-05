import axios from 'axios'

const baseUrl = 'http://localhost:3001/cars'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const uploadPhoto = async newObject => {
  const config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const services = { getAll, getOne, create, uploadPhoto }
export default services
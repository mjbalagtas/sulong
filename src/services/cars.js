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

const services = { getAll, getOne }
export default services
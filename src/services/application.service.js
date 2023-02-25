import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_TEST_URL

const getApplications = () => {
  return axios.get(API_URL + 'applications', { headers: authHeader() })
}

const createApplication = (data) => {
  return axios.post(API_URL + 'applications', data, { headers: authHeader() })
}

const updateApplication = (id, data) => {
  return axios.put(API_URL + 'applications/' + id, data, {
    headers: authHeader(),
  })
}

const deleteApplication = (id) => {
  return axios.delete(API_URL + 'applications/' + id, { headers: authHeader() })
}

const updateStatus = (id, data) => {
  return axios.put(
    API_URL + 'applications/status/' + id,
    { status: data },
    {
      headers: authHeader(),
    }
  )
}

const ApplicationService = {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
  updateStatus,
}

export default ApplicationService

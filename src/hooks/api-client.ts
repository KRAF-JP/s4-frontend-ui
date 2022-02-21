import axios from 'axios'
import qs from 'qs'

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROOT}/api`,
  responseType: 'json',
  headers: {
    'content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
})

export const apiClientVamsdb = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROOT}/api`,
  responseType: 'json',
  headers: {
    'content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
})

export const fetcher = (url) => apiClient.get(url).then((res) => res.data)

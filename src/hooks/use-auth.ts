import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { apiClient } from './api-client'

export default () => {
  const router = useRouter()
  const redirectProcess = async () => {
    if (router.pathname !== '/login') {
      apiClient
        .get('/user')
        .then((res) => {})
        .catch((error) => {
          Router.push('/login')
        })
    }
  }

  useEffect(() => {
    redirectProcess()
  }, [])
}

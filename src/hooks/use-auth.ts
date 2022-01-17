import { useEffect } from 'react'
import Router from 'next/router'
import { apiClient } from './api-client'

export default () => {
  const redirectProcess = async () => {
    apiClient
      .get('/user')
      .then((res) => {})
      .catch((error) => {
        Router.push('/login')
      })
  }

  useEffect(() => {
    redirectProcess()
  }, [])
}

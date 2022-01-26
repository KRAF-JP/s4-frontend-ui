import { apiClient } from './api-client'
import { useEffect, useState } from 'react'
import Router from 'next/router'

export const useUserLogout = () => {
  const [postUserLogoutTrigger, setPostUserLogoutTrigger] =
    useState<boolean>(false)

  const PostUserLogOutRequest = async () => {
    apiClient
      .post('/logout')
      .then((res) => {
        Router.push('/login')
      })
      .catch((err) => {
        // #TODO sentry
      })
  }

  useEffect(() => {
    if (!postUserLogoutTrigger) return
    PostUserLogOutRequest()
  }, [postUserLogoutTrigger])

  return {
    setPostUserLogoutTrigger,
  }
}

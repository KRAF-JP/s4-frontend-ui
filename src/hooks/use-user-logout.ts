import { apiClient } from './api-client'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useErrorHandle } from './use-error-handle'

export const useUserLogout = () => {
  const [postUserLogoutTrigger, setPostUserLogoutTrigger] =
    useState<boolean>(false)
  const errorHandle = useErrorHandle()

  const PostUserLogOutRequest = async () => {
    apiClient
      .post('/logout')
      .then((res) => {
        Router.push('/login')
      })
      .catch((error) => {
        errorHandle(error)
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

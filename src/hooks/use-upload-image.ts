import { apiClient } from './api-client'
import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../store/context'
import { useErrorHandle } from './use-error-handle'

export const useUploadImage = () => {
  const { dispatch } = useContext(GlobalContext)
  const [target, setData] = useState<any>()
  const [userPostTrigger, setUserPostTrigger] = useState<boolean>(false)
  const [userDeleteTrigger, setUserDeleteTrigger] = useState<boolean>(false)
  const [orgPostTrigger, setOrgPostTrigger] = useState<boolean>(false)
  const [orgDeleteTrigger, setOrgDeleteTrigger] = useState<boolean>(false)
  const errorHandle = useErrorHandle()

  const postUserRequest = async () => {
    const data = new FormData()
    data.append('profile_image', target)
    apiClient
      .post('/user/profile_image', data, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        dispatch({
          type: 'update_user_profile_image',
          payload: res.data,
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const deleteUserRequest = async () => {
    apiClient
      .delete('/user/profile_image')
      .then((res) => {
        dispatch({
          type: 'update_user_profile_image',
          payload: res.data,
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const postOrgRequest = async () => {
    const data = new FormData()
    data.append('organization_image', target)
    apiClient
      .post('/org/image', data, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        dispatch({
          type: 'update_organization_image',
          payload: res.data,
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const deleteOrgRequest = async () => {
    apiClient
      .delete('/org/image')
      .then(() => {
        dispatch({
          type: 'update_organization_image',
          payload: '',
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    if (!userPostTrigger) return
    postUserRequest()
  }, [target, userPostTrigger])

  useEffect(() => {
    if (!userDeleteTrigger) return
    deleteUserRequest()
  }, [userDeleteTrigger])

  useEffect(() => {
    if (!orgPostTrigger) return
    postOrgRequest()
  }, [target, orgPostTrigger])

  useEffect(() => {
    if (!orgDeleteTrigger) return
    deleteOrgRequest()
  }, [orgDeleteTrigger])

  return {
    setData,
    setUserPostTrigger,
    setUserDeleteTrigger,
    setOrgPostTrigger,
    setOrgDeleteTrigger,
  }
}

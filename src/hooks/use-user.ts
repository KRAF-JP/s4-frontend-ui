import { useContext, useEffect, useState } from 'react'
import { apiClient } from './api-client'
import GlobalContext from '../store/context'
import { useErrorHandle } from './use-error-handle'

export const useUser = () => {
  const [user, setUser] = useState<any>([])
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    apiClient
      .get('/user')
      .then((res) => {
        setUser(res.data)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const putRequest = async () => {
    apiClient
      .put(`/user`, target)
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: '更新しました',
            type: 'success',
          },
        })
        dispatch({ type: 'update_user', payload: res.data })
        if (res.data.name) {
          dispatch({
            type: 'update_user_name',
            payload: res.data.name,
          })
        }
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    fetchRequest
  }, [])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
    setPutTrigger(false)
  }, [target, putTrigger])

  return {
    user,
    setUser,
    setTarget,
    setPutTrigger,
  }
}

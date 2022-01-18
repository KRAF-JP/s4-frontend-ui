import { useContext, useEffect, useState } from 'react'
import { apiClient } from './api-client'
import GlobalContext from '../store/context'

export const useUser = () => {
  const [user, setUser] = useState<any>([])
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    apiClient
      .get('/user')
      .then((res) => {
        setUser(res.data)
      })
      .catch((error) => {
        setUser(error)
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
      })
      .catch((error) => {
        // #TODO sentry
      })
  }

  useEffect(() => {
    fetchRequest
  }, [])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
  }, [target, putTrigger])

  return {
    user,
    setUser,
    setTarget,
    setPutTrigger,
  }
}

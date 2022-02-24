import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../../api-client'
import GlobalContext from '../../../../store/context'
import { useRouter } from 'next/router'
import { useErrorHandle } from '../../../use-error-handle'

export const useUsers = () => {
  const router = useRouter()
  const { dispatch } = useContext(GlobalContext)
  const [users, setUsers] = useState<any>([])
  const [defaultData, setDefaultData] = useState<any>([])
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false)
  const [restoreTrigger, setRestoreTrigger] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const errorHandle = useErrorHandle()

  const fetchRequest = async (query) => {
    setIsLoading(false)
    apiClient
      .get('/users', { params: query })
      .then((res) => {
        setDefaultData(res.data)
        setUsers(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const putRequest = async () => {
    apiClient
      .put(`/users/${target.id}`, target.data)
      .then((res) => {
        const resData = users.map((data) => {
          if (res.data.id === data.id) {
            return res.data
          } else {
            return data
          }
        })

        setUsers(resData)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `「${res.data.name}」を更新しました`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error, '更新できませんでした')
      })
  }

  const deleteRequest = async () => {
    apiClient
      .delete(`/users/${target.id}`)
      .then((res) => {
        const resData = users.map((data) => {
          if (Number(target.id) === data.id) {
            return {
              ...data,
              deleted_at: 'delete',
            }
          } else {
            return data
          }
        })

        setUsers(resData)

        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `「${target.dataset.name}」を無効にしました`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const restoreRequest = async () => {
    apiClient
      .put(`/users/${target.id}/restore`)
      .then((res) => {
        const resData = users.map((data) => {
          if (Number(target.id) === data.id) {
            return {
              ...data,
              deleted_at: null,
            }
          } else {
            return data
          }
        })

        setUsers(resData)

        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `「${target.dataset.name}」を有効にしました`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchRequest(router.query)
  }, [router.query, router.isReady])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
    setPutTrigger(false)
  }, [target, putTrigger])

  useEffect(() => {
    if (!deleteTrigger) return
    deleteRequest()
    setDeleteTrigger(false)
  }, [target, deleteTrigger])

  useEffect(() => {
    if (!restoreTrigger) return
    restoreRequest()
    setRestoreTrigger(false)
  }, [target, restoreTrigger])

  return {
    defaultData,
    setTarget,
    setPutTrigger,
    setDeleteTrigger,
    setRestoreTrigger,
    users,
    setUsers,
    isLoading,
    setIsLoading,
  }
}

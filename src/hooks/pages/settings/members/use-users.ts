import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../../api-client'
import GlobalContext from '../../../../store/context'
import { useRouter } from 'next/router'

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

  const fetchRequest = async (query) => {
    setIsLoading(false)
    apiClient
      .get('/users', { params: query })
      .then((res) => {
        console.log(query)
        console.log(res.data)
        setDefaultData(res.data)
        setUsers(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(query)
        console.log(error)
      })
  }

  const putRequest = async () => {
    console.log('Target Value::::')
    console.log(target)
    apiClient
      .put(`/users/${target.id}`, target.data)
      .then((res) => {
        console.log(res.data)
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
        // #TODO sentry
        console.log(error)
        // dispatch({
        //   type: 'update_toaster',
        //   payload: {
        //     isShow: true,
        //     text: `保存できませんでした。`,
        //     type: 'error',
        //   },
        // })
      })
  }

  const deleteRequest = async () => {
    apiClient
      .delete(`/users/${target.id}`)
      .then((res) => {
        console.log(res.data)
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
        // #TODO sentry
        console.log(error)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `「${target.dataset.name}」を無効にできませんでした。`,
            type: 'error',
          },
        })
      })
  }

  const restoreRequest = async () => {
    apiClient
      .put(`/users/${target.id}/restore`)
      .then((res) => {
        console.log(res.data)
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
        // #TODO sentry
        console.log(error)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `「${target.dataset.name}」を有効にできませんでした。`,
            type: 'error',
          },
        })
      })
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchRequest(router.query)
  }, [router.query, router.isReady])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
  }, [target, putTrigger])

  useEffect(() => {
    if (!deleteTrigger) return
    deleteRequest()
  }, [target, deleteTrigger])

  useEffect(() => {
    if (!restoreTrigger) return
    restoreRequest()
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

export const useUserDetail = () => {
  const [id, setId] = useState<number>()
  const [user, setUser] = useState<any>({})

  const fetchRequest = async (id: number) => {
    console.log(id)
    apiClient
      .get(`/users/${id}`)
      .then((res) => {
        console.log(res)
        setUser(res.data)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    if (id) {
      fetchRequest(id)
    }
  }, [id])

  return {
    user,
    setUser,
    setId,
  }
}

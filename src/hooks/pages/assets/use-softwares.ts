import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'
import { useErrorHandle } from '../../use-error-handle'

export const useSoftwares = () => {
  const router = useRouter()
  const { server } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [target, setTarget] = useState<any>()
  const [response, setResponse] = useState<any>()
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const postRequest = async () => {
    setIsLoading(false)
    const data = {
      vendor_name: target.vendor,
      product_name: target.product,
      version: target.version,
    }

    apiClient
      .post(`/servers/${Number(server)}/softwares`, data)
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `ソフトウェアを登録しました。`,
            type: 'success',
          },
        })

        const data = {
          product: res.data.product_name,
          vendor: res.data.vendor_name,
          version: res.data.version,
          disabled: true,
        }
        setResponse(data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    if (!postTrigger) return
    postRequest()
    setPostTrigger(false)
  }, [target, postTrigger])

  return {
    target,
    setTarget,
    response,
    isLoading,
    setIsLoading,
    setPostTrigger,
  }
}

export const useSoftwaresList = () => {
  const router = useRouter()
  const { server } = router.query
  const [softwares, setSoftwares] = useState<any>()
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    apiClient
      .get(`/servers/${Number(server)}/softwares`)
      .then((res) => {
        const data = res.data.map((data) => {
          return {
            product: data.product_name,
            vendor: data.vendor_name,
            version: data.version,
          }
        })
        setSoftwares(data)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchRequest()
  }, [router.isReady])

  return {
    softwares,
  }
}

export const useSoftwareDelete = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false)
  const [target, setTarget] = useState({
    id: undefined,
    name: undefined,
  })
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const deleteRequest = async () => {
    setIsLoading(false)

    apiClient
      .delete(`/softwares/${Number(target.id)}`, {})
      .then((res) => {
        setIsLoading(true)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `ソフトウェアを削除しました。`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    if (!deleteTrigger) return
    deleteRequest()
  }, [deleteTrigger, target])

  return {
    target,
    setTarget,
    setDeleteTrigger,
    isLoading,
    setIsLoading,
  }
}

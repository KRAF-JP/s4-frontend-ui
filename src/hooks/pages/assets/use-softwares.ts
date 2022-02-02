import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'

export const useSoftwares = () => {
  const router = useRouter()
  const { server } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [target, setTarget] = useState<any>()
  const [response, setResponse] = useState<any>()
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)

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
        console.log(res.data)
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
        console.log(data)
        setResponse(data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
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

  const fetchRequest = async () => {
    apiClient
      .get(`/servers/${Number(server)}/softwares`)
      .then((res) => {
        console.log(res.data)
        const data = res.data.map((data) => {
          return {
            product: data.product_name,
            vendor: data.vendor_name,
            version: data.version,
          }
        })
        console.log('-----software-----')
        console.log(data)
        setSoftwares(data)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
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

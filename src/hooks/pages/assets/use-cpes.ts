import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'
import { useSoftwaresList } from './use-softwares'
import { useErrorHandle } from '../../use-error-handle'

export const useCpesSearch = () => {
  const router = useRouter()
  const { server, keyword } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [cpes, setCpes] = useState<any>()
  const [serverDetail, setServerDetail] = useState<any>()
  const [projectDetail, setProjectDetail] = useState<any>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const { softwares } = useSoftwaresList()
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(server)}`, {})
      .then((res) => {
        setServerDetail(res.data)

        apiClient
          .get(`/projects/${Number(res.data.project_id)}`, {})
          .then((res) => {
            setProjectDetail(res.data)
          })
          .catch((error) => {
            errorHandle(error)
          })
      })
      .catch((error) => {
        errorHandle(error)
      })

    apiClient
      .get(`/cpes/search?part[]=h&part[]=a&limit=100`, {
        params: {
          keyword: keyword,
        },
      })
      .then((res) => {
        const data = res.data.data.map((data) => {
          let disabled = false
          softwares.map((software) => {
            if (
              software.product == data['product'] &&
              software.vendor == data['vendor'] &&
              software.version == data['version']
            ) {
              disabled = true
            }
          })
          return {
            ...data,
            disabled: disabled,
          }
        })

        setCpes(data)
        setTotalCount(res.data.count)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchRequest()
  }, [router.query, router.isReady, softwares])

  return {
    serverDetail,
    projectDetail,
    cpes,
    setCpes,
    isLoading,
    setIsLoading,
    totalCount,
  }
}

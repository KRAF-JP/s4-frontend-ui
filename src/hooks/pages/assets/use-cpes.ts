import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'
import { useSoftwaresList } from './use-softwares'

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

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(server)}`, {})
      .then((res) => {
        console.log(res.data)
        setServerDetail(res.data)

        apiClient
          .get(`/projects/${Number(res.data.project_id)}`, {})
          .then((res) => {
            console.log(res.data)
            setProjectDetail(res.data)
          })
          .catch((error) => {
            // #TODO sentry
            console.log(error)
          })
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })

    apiClient
      .get(`/cpes/search?part[]=h&part[]=a&limit=100`, {
        params: {
          keyword: keyword,
        },
      })
      .then((res) => {
        console.log(res.data)

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

        console.log(data)
        setCpes(data)
        setTotalCount(res.data.count)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
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

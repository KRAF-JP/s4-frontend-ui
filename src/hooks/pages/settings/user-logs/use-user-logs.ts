import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../../api-client'
import GlobalContext from '../../../../store/context'
import { useRouter } from 'next/router'

export const useUserLogs = () => {
  const router = useRouter()
  const [userLogs, setUserLogs] = useState<any>([])
  const [defaultData, setDefaultData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async (query) => {
    setIsLoading(false)

    apiClient
      .get('/user_logs', {
        params: query,
      })
      .then((res) => {
        setDefaultData(res.data)
        setUserLogs(res.data)
        setIsLoading(true)
        setTotalCount(Number(res.headers['x-total-count']))
      })
      .catch((error) => {
        // #TODO sentry
      })
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchRequest(router.query)
  }, [router.query, router.isReady])

  return {
    defaultData,
    userLogs,
    setUserLogs,
    isLoading,
    totalCount,
    setIsLoading,
  }
}

export const useUserLogsSearchItem = () => {
  const [userList, setUserList] = useState<any>([])

  const fetchUserList = async () => {
    apiClient
      .get('/users')
      .then((res) => {
        const users = res.data.map((data) => {
          return {
            label: data.name,
            value: data.id,
            image: data.profile_image,
          }
        })

        users.unshift({
          label: 'すべて',
          value: '',
        })

        setUserList(users)
      })
      .catch((error) => {
        // #TODO sentry
      })
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  return {
    userList,
  }
}

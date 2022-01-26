import { useEffect, useState } from 'react'
import { apiClient } from '../../api-client'

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [projects, setProjects] = useState<any>([])
  const [defaultData, setDefaultData] = useState<any>([])

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get('/projects', {})
      .then((res) => {
        console.log(res.data)
        setDefaultData(res.data)
        setProjects(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  return {
    projects,
    setProjects,
    defaultData,
    isLoading,
    setIsLoading,
  }
}

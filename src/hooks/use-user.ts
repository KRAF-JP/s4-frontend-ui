import { useEffect, useState } from 'react'
import { apiClient } from './api-client'

export const useUser = () => {
  const [user, setUser] = useState<any>([])

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

  useEffect(() => {
    fetchRequest
  }, [])

  return {
    user,
    setUser,
  }
}

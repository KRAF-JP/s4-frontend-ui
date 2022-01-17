import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../api-client'
import GlobalContext from '../../store/context'

export const useNotification = () => {
  const [notifications, setNotifications] = useState<any>([])
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    apiClient
      .get('/user/notifications')
      .then((res) => {
        setNotifications(res.data)
        const newNum = res.data.filter((data) => {
          return data.is_newly
        })

        dispatch({ type: 'update_notification_newly', payload: newNum.length })
      })
      .catch((error) => {
        setNotifications(error)
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  return {
    notifications,
    setNotifications,
  }
}

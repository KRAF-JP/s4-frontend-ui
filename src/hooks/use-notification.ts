import { useContext, useEffect, useState } from 'react'
import { apiClient } from './api-client'
import GlobalContext from '../store/context'

export const useNotification = () => {
  const [putHistoryTrigger, setPutHistoryTrigger] = useState<boolean>(false)
  const { dispatch, state } = useContext(GlobalContext)

  const fetchRequest = async () => {
    apiClient
      .get('/user/notifications')
      .then((res) => {
        const data = res.data.filter((data) => {
          return data.is_newly
        })
        dispatch({
          type: 'update_notification_load',
          payload: false,
        })
        dispatch({
          type: 'update_notification_items',
          payload: data,
        })
        fetchNewlyCount()
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const fetchNewlyCount = () => {
    apiClient
      .get('/user/notifications/newly_count')
      .then((res) => {
        dispatch({
          type: 'update_notification_newly',
          payload: res.data.count,
        })
      })
      .catch((error) => {
        // #TODO sentry
      })
  }

  const putRequest = () => {
    apiClient
      .put('/user/notifications/update_newly')
      .then((res) => {
        const data = state.notification.items.map((data) => {
          return {
            ...data,
            is_newly: false,
          }
        })

        dispatch({
          type: 'update_notification_items',
          payload: data,
        })

        dispatch({
          type: 'update_notification_newly',
          payload: 0,
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  useEffect(() => {
    if (!state.notification.is_load) return
    fetchRequest()
  }, [])

  useEffect(() => {
    if (!putHistoryTrigger) return
    putRequest()
    setPutHistoryTrigger(false)
  }, [putHistoryTrigger])

  return {
    setPutHistoryTrigger,
  }
}

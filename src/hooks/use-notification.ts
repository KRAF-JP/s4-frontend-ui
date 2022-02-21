import { useContext, useEffect, useState } from 'react'
import { apiClient } from './api-client'
import GlobalContext from '../store/context'
import { useErrorHandle } from './use-error-handle'

export const useNotification = () => {
  const [putHistoryTrigger, setPutHistoryTrigger] = useState<boolean>(false)
  const { dispatch, state } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

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
        errorHandle(error)
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
        errorHandle(error)
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
        errorHandle(error)
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

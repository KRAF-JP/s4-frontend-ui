import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import GlobalContext from '../../../store/context'
import { useErrorHandle } from '../../use-error-handle'

export const useServers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [servers, setServers] = useState<any>([])
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
      .delete(`/servers/${Number(target.id)}`, {})
      .then((res) => {
        setIsLoading(true)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `サーバーを削除しました。`,
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
    servers,
    setServers,
    target,
    setTarget,
    setDeleteTrigger,
    isLoading,
    setIsLoading,
  }
}

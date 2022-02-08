import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import GlobalContext from '../../../store/context'

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [projects, setProjects] = useState<any>([])
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false)
  const [target, setTarget] = useState({
    id: undefined,
    name: undefined,
  })
  const { dispatch } = useContext(GlobalContext)

  const deleteRequest = async () => {
    setIsLoading(false)

    apiClient
      .delete(`/projects/${Number(target.id)}`, {})
      .then((res) => {
        console.log(res.data)
        // setServers(res.data)
        setIsLoading(true)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `プロジェクトを削除しました。`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    if (!deleteTrigger) return
    deleteRequest()
  }, [deleteTrigger, target])

  return {
    projects,
    setProjects,
    target,
    setTarget,
    setDeleteTrigger,
    isLoading,
    setIsLoading,
  }
}

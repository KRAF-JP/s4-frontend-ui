import { useEffect, useState, useContext } from 'react'
import { apiClient } from '@hooks/api-client'
import GlobalContext from '@store/context'

export const useAccessFilter = () => {
  const { dispatch } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [allowDomain, setAllowDomain] = useState<any>([])
  const [allowEmail, setAllowEmail] = useState<any>([])
  const [allowIp, setAllowIp] = useState<any>([])
  const [denyEmail, setDenyEmail] = useState<any>([])

  const fetchRequest = async () => {
    setIsLoading(false)
    apiClient
      .get('/org/access_filters')
      .then((res) => {
        const allowDomains = res.data.filter((data) => {
          return data.filter_type === 'allow_domain'
        })
        const allowEmails = res.data.filter((data) => {
          return data.filter_type === 'allow_email'
        })
        const allowIps = res.data.filter((data) => {
          return data.filter_type === 'allow_ip'
        })
        const denyEmails = res.data.filter((data) => {
          return data.filter_type === 'deny_email'
        })
        setAllowDomain(allowDomains)
        setAllowEmail(allowEmails)
        setAllowIp(allowIps)
        setDenyEmail(denyEmails)
        setIsLoading(true)
      })
      .catch((error) => {
        setErrorMessage(error)
      })
  }

  const putRequest = async () => {
    apiClient
      .put(`/org/access_filters/${target.id}`, target)
      .then((res) => {})
      .catch((error) => {
        // #TODO sentry
      })
  }

  const postRequest = async () => {
    apiClient
      .post('/org/access_filters', target)
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `登録が完了しました`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        // #TODO sentry
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `正常に登録できませんでした`,
            type: 'error',
          },
        })
      })
  }

  const deleteRequest = async () => {
    apiClient
      .delete(`/org/access_filters/${target.id}`)
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `「${target.filter_value}」が削除されました`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `正常に削除できませんでした。`,
            type: 'error',
          },
        })
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
  }, [target, putTrigger])

  useEffect(() => {
    if (!postTrigger) return
    postRequest()
    setPostTrigger(false)
  }, [target, postTrigger])

  useEffect(() => {
    if (!deleteTrigger) return
    deleteRequest()
  }, [target, deleteTrigger])

  return {
    isLoading,
    errorMessage,
    setTarget,
    setPutTrigger,
    setPostTrigger,
    setDeleteTrigger,
    allowDomain,
    allowEmail,
    allowIp,
    denyEmail,
    setAllowEmail,
    setDenyEmail,
    setAllowIp,
  }
}

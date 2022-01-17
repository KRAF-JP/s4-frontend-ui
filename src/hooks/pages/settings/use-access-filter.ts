import { useEffect, useState, useContext } from 'react'
import { apiClient } from '../../api-client'
import GlobalContext from '../../../store/context'
import { Simulate } from 'react-dom/test-utils'

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
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const postRequest = async () => {
    apiClient
      .post('/org/access_filters', target)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteRequest = async () => {
    apiClient
      .delete(`/org/access_filters/${target.id}`)
      .then((res) => {
        console.log(res.data)
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
        console.log(error)
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

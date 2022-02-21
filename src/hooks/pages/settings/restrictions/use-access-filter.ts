import { useEffect, useState, useContext } from 'react'
import { apiClient } from '../../../api-client'
import GlobalContext from '../../../../store/context'
import { useErrorHandle } from '../../../use-error-handle'

export const useAccessFilter = () => {
  const { dispatch } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false)
  const [allowDomain, setAllowDomain] = useState<any>([])
  const [allowEmail, setAllowEmail] = useState<any>([])
  const [allowIp, setAllowIp] = useState<any>([])
  const [denyEmail, setDenyEmail] = useState<any>([])
  const errorHandle = useErrorHandle()

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
        errorHandle(error)
      })
  }

  const putRequest = async () => {
    apiClient
      .put(`/org/access_filters/${target.id}`, target)
      .then((res) => {
        if (res.data.filter_type === 'allow_email') {
          const data = allowEmail.map((data) => {
            if (data.id === res.data.id) {
              return {
                ...data,
                filter_value: res.data.filter_value,
              }
            } else {
              return {
                ...data,
              }
            }
          })
          setAllowEmail(data)
        } else if (res.data.filter_type === 'deny_email') {
          const data = denyEmail.map((data) => {
            if (data.id === res.data.id) {
              return {
                ...data,
                filter_value: res.data.filter_value,
              }
            } else {
              return {
                ...data,
              }
            }
          })
          setDenyEmail(data)
        } else if (res.data.filter_type === 'allow_ip') {
          const data = allowIp.map((data) => {
            if (data.id === res.data.id) {
              return {
                ...data,
                filter_value: res.data.filter_value,
              }
            } else {
              return {
                ...data,
              }
            }
          })
          setAllowIp(data)
        }

        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `変更が完了しました`,
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const postRequest = async () => {
    apiClient
      .post('/org/access_filters', target)
      .then((res) => {
        if (res.data[0].filter_type === 'allow_email') {
          setAllowEmail([...allowEmail, ...res.data])
        } else if (res.data[0].filter_type === 'deny_email') {
          setDenyEmail([...denyEmail, ...res.data])
        } else if (res.data[0].filter_type === 'allow_ip') {
          setAllowIp([...allowIp, ...res.data])
        }

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
        errorHandle(error)
      })
  }

  const deleteRequest = async () => {
    apiClient
      .delete(`/org/access_filters/${target.id}`)
      .then((res) => {
        if (target.type === 'allow_email') {
          const data = allowEmail.filter((data) => {
            return data.id !== target.id
          })
          setAllowEmail(data)
        } else if (target.type === 'deny_email') {
          const data = denyEmail.filter((data) => {
            return data.id !== target.id
          })
          setDenyEmail(data)
        } else if (target.type === 'allow_ip') {
          const data = allowIp.filter((data) => {
            return data.id !== target.id
          })
          setAllowIp(data)
        }

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
        errorHandle(error)
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
    setPutTrigger(false)
  }, [putTrigger])

  useEffect(() => {
    if (!postTrigger) return
    postRequest()
    setPostTrigger(false)
  }, [postTrigger])

  useEffect(() => {
    if (!deleteTrigger) return
    deleteRequest()
    setDeleteTrigger(false)
  }, [deleteTrigger])

  return {
    isLoading,
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

import { useEffect, useState, useReducer, useContext } from 'react'
import { apiClient } from './api-client'
import GlobalContext from '../store/context'
import { useErrorHandle } from './use-error-handle'

export const useOrganization = () => {
  const [organization, setOrganization] = useState<any>([])
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const [slackSendTrigger, setSlackSendTrigger] = useState<boolean>(false)
  const [emailSendTrigger, setEmailSendTrigger] = useState<boolean>(false)
  const [emailVerificationSendTrigger, setEmailVerificationSendTrigger] =
    useState<boolean>()
  const [emailVerificationTrigger, setEmailVerificationTrigger] =
    useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    apiClient
      .get('/org')
      .then((res) => {
        setOrganization(res.data)
        dispatch({ type: 'update_organization', payload: res.data })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const putRequest = async () => {
    apiClient
      .put('/org', target)
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: '正常に更新されました。',
            type: 'success',
          },
        })
        dispatch({ type: 'update_organization', payload: res.data })
        if (res.data.name) {
          dispatch({
            type: 'update_user_org_name',
            payload: res.data.name,
          })
        }
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const slackSendTest = async () => {
    apiClient
      .post('/org/slack/test', target)
      .then((res) => {})
      .catch((error) => {
        errorHandle(error)
      })
  }

  const emailSendTest = async () => {
    apiClient
      .post('/org/notification_email/test')
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: 'テスト送信が完了しました',
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const emailVerificationSend = async () => {
    apiClient
      .post('/org/notification_email/resend')
      .then((res) => {})
      .catch((error) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: '認証メールが送信できませんでした',
            type: 'error',
          },
        })
      })
  }

  const emailVerification = async () => {
    apiClient
      .put('/org/notification_email/verify', target)
      .then((res) => {
        fetchRequest()
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: '認証が完了しました',
            type: 'success',
          },
        })
      })
      .catch((error) => {
        errorHandle(error, '認証ができませんでした')
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  useEffect(() => {
    if (!putTrigger) return
    putRequest()
    setPutTrigger(false)
  }, [target, putTrigger])

  useEffect(() => {
    if (!slackSendTrigger) return
    slackSendTest()
    setSlackSendTrigger(false)
  }, [target, slackSendTrigger])

  useEffect(() => {
    if (!emailSendTrigger) return
    emailSendTest()
    setEmailSendTrigger(false)
  }, [emailSendTrigger])

  useEffect(() => {
    if (!emailVerificationSendTrigger) return
    emailVerificationSend()
    setEmailVerificationSendTrigger(false)
  }, [emailVerificationSendTrigger])

  useEffect(() => {
    if (!emailVerificationTrigger) return
    emailVerification()
    setEmailVerificationSendTrigger(false)
  }, [emailVerificationTrigger])

  return {
    organization,
    setTarget,
    setPutTrigger,
    setSlackSendTrigger,
    setEmailSendTrigger,
    setEmailVerificationSendTrigger,
    setEmailVerificationTrigger,
  }
}

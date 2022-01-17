import { useEffect, useState, useReducer, useContext } from 'react'
import { apiClient } from './api-client'
import GlobalContext from '../store/context'

export const useOrganization = () => {
  const [organization, setOrganization] = useState<any>([])
  const [target, setTarget] = useState<any>()
  const [putTrigger, setPutTrigger] = useState<boolean>(false)
  const [slackSendTrigger, setSlackSendTrigger] = useState<boolean>(false)
  const [emailSendTrigger, setEmailSendTrigger] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    apiClient
      .get('/org')
      .then((res) => {
        setOrganization(res.data)
        dispatch({ type: 'update_organization', payload: res.data })
      })
      .catch((error) => {
        setErrorMessage(error)
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
        console.log(error.response)
      })
  }

  const slackSendTest = async () => {
    apiClient
      .post('/org/slack/test', target)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const emailSendTest = async () => {
    apiClient
      .post('/org/slack/test', target)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
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
    if (!slackSendTrigger) return
    slackSendTest()
  }, [target, setSlackSendTrigger])

  useEffect(() => {
    if (!emailSendTrigger) return
    emailSendTest()
  }, [target, setEmailSendTrigger])

  return {
    organization,
    errorMessage,
    setTarget,
    setPutTrigger,
    setSlackSendTrigger,
    setEmailSendTrigger,
  }
}

import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'

export const useAutoPackageRegister = () => {
  const router = useRouter()
  const { server } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [command, setCommand] = useState<any>()
  const [serverDetail, setServerDetail] = useState<any>()
  const [projectDetail, setProjectDetail] = useState<any>()
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(server)}`, {})
      .then((res) => {
        console.log(res.data)
        setServerDetail(res.data)

        apiClient
          .get(`/projects/${Number(res.data.project_id)}`, {})
          .then((res) => {
            console.log(res.data)
            setProjectDetail(res.data)
          })
          .catch((error) => {
            // #TODO sentry
            console.log(error)
          })
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })

    apiClient
      .post(`/servers/${Number(server)}/package_curls`, {})
      .then((res) => {
        console.log(res.data)
        setCommand(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  return {
    serverDetail,
    projectDetail,
    command,
    setCommand,
    isLoading,
    setIsLoading,
  }
}

export const useAutoPackageRegisterResult = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [result, setResult] = useState<any>()
  const [resultTrigger, setResultTrigger] = useState<boolean>(false)
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const [target, setTarget] = useState<any>()
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/package_curls/${Number(target)}`, {})
      .then((res) => {
        console.log(res.data)
        setResult(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  const postRequest = async () => {
    setIsLoading(false)

    apiClient
      .post(`/package_curls/${Number(target)}/register_packages`, {})
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `パッケージを登録しました。`,
            type: 'success',
          },
        })
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `パッケージを登録できませんでした。`,
            type: 'error',
          },
        })
      })
  }

  useEffect(() => {
    if (!resultTrigger) return
    fetchRequest()
    setResultTrigger(false)
  }, [target, resultTrigger])

  useEffect(() => {
    if (!postTrigger) return
    postRequest()
    setPostTrigger(false)
  }, [target, postTrigger])

  return {
    setTarget,
    result,
    isLoading,
    setIsLoading,
    setResultTrigger,
    setPostTrigger,
  }
}

export const useManualPackageRegister = () => {
  const router = useRouter()
  const { server } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [command, setCommand] = useState<any>()
  const [serverDetail, setServerDetail] = useState<any>()
  const [projectDetail, setProjectDetail] = useState<any>()
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(server)}`, {})
      .then((res) => {
        console.log(res.data)
        setServerDetail(res.data)

        apiClient
          .get(`/projects/${Number(res.data.project_id)}`, {})
          .then((res) => {
            console.log(res.data)
            setProjectDetail(res.data)
          })
          .catch((error) => {
            // #TODO sentry
            console.log(error)
          })
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })

    apiClient
      .get(`/servers/${Number(server)}/packages/get_manual_command`, {})
      .then((res) => {
        console.log(res.data)
        setCommand(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  return {
    serverDetail,
    projectDetail,
    command,
    setCommand,
    isLoading,
    setIsLoading,
  }
}

export const useManualPackageRegisterJson = () => {
  const router = useRouter()
  const { server } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [json, setJson] = useState<any>()
  const [target, setTarget] = useState<any>()
  const [jsonTrigger, setJsonTrigger] = useState<boolean>(false)
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)

  const jsonRequest = async () => {
    setIsLoading(false)

    apiClient
      .post(`/servers/${Number(server)}/packages/format_packages`, {
        os_family: target.os_family,
        packages: target.packages,
      })
      .then((res) => {
        console.log(res.data)
        setJson(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  const postRequest = async () => {
    setIsLoading(false)

    apiClient
      .post(`/servers/${Number(server)}/packages/bulk_store`, {
        packages: target.packages,
      })
      .then((res) => {
        console.log(res.data)
        setJson(res.data)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `パッケージを手動登録しました。`,
            type: 'success',
          },
        })
        setIsLoading(true)
      })
      .catch((error) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `パッケージを手動登録できませんでした。`,
            type: 'danger',
          },
        })
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    if (!jsonTrigger) return
    jsonRequest()
    setJsonTrigger(false)
  }, [target, jsonTrigger])

  useEffect(() => {
    if (!postTrigger) return
    postRequest()
    setPostTrigger(false)
  }, [target, postTrigger])

  return {
    json,
    setJson,
    setTarget,
    setJsonTrigger,
    setPostTrigger,
    isLoading,
    setIsLoading,
  }
}

export const usePackagesList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [packages, setPackages] = useState<any>()
  const [target, setTarget] = useState<any>()
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(target)}/packages`, {})
      .then((res) => {
        console.log(res.data)
        setPackages(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  useEffect(() => {
    if (!fetchTrigger) return
    fetchRequest()
    setFetchTrigger(false)
  }, [fetchTrigger])

  return {
    packages,
    setPackages,
    fetchTrigger,
    setFetchTrigger,
    setTarget,
    isLoading,
    setIsLoading,
  }
}

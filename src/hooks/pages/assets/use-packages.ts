import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'
import { useErrorHandle } from '../../../hooks/use-error-handle'

export const useAutoPackageRegister = () => {
  const router = useRouter()
  const { server } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [command, setCommand] = useState<any>()
  const [serverDetail, setServerDetail] = useState<any>()
  const [projectDetail, setProjectDetail] = useState<any>()
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(server)}`, {})
      .then((res) => {
        setServerDetail(res.data)

        apiClient
          .get(`/projects/${Number(res.data.project_id)}`, {})
          .then((res) => {
            setProjectDetail(res.data)
          })
          .catch((error) => {
            errorHandle(error)
          })
      })
      .catch((error) => {
        errorHandle(error)
      })

    apiClient
      .post(`/servers/${Number(server)}/package_curls`, {})
      .then((res) => {
        setCommand(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
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
  const [waitFetch, setWaitFetch] = useState<boolean>(false)
  const [target, setTarget] = useState<any>()
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/package_curls/${Number(target)}`, {})
      .then((res) => {
        setResult(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const postRequest = async () => {
    setIsLoading(false)

    apiClient
      .post(`/package_curls/${Number(target)}/register_packages`, {})
      .then((res) => {
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
        errorHandle(error, 'パッケージを登録できませんでした。')
      })
  }

  useEffect(() => {
    if (!resultTrigger || !waitFetch) return
    fetchRequest()
    setResultTrigger(false)
  }, [target, resultTrigger, waitFetch])

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
    setWaitFetch,
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
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(server)}`, {})
      .then((res) => {
        setServerDetail(res.data)

        apiClient
          .get(`/projects/${Number(res.data.project_id)}`, {})
          .then((res) => {
            setProjectDetail(res.data)
          })
          .catch((error) => {
            errorHandle(error)
          })
      })
      .catch((error) => {
        errorHandle(error)
      })

    apiClient
      .get(`/servers/${Number(server)}/packages/get_manual_command`, {})
      .then((res) => {
        setCommand(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
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
  const errorHandle = useErrorHandle()

  const jsonRequest = async () => {
    setIsLoading(false)

    apiClient
      .post(`/servers/${Number(server)}/packages/format_packages`, {
        os_family: target.os_family,
        packages: target.packages,
      })
      .then((res) => {
        setJson(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const postRequest = async () => {
    setIsLoading(false)

    apiClient
      .post(`/servers/${Number(server)}/packages/bulk_store`, {
        packages: target.packages,
      })
      .then((res) => {
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
        errorHandle(error, 'パッケージを手動登録できませんでした。')
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
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get(`/servers/${Number(target)}/packages`, {})
      .then((res) => {
        setPackages(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        errorHandle(error)
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

import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'
import GlobalContext from '../../../store/context'

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [projects, setProjects] = useState<any>([])
  const [defaultData, setDefaultData] = useState<any>([])
  const [fetchRequestTrigger, setFetchRequestTrigger] = useState<boolean>(false)

  const [serverId, setServerId] = useState<number>()
  const [osFamily, setOsFamily] = useState<any>({ os_family: 'amazon' })
  const [windowsOsList, setWindowsOsList] = useState<any>([{}])
  const [otherOsList, setOtherOsList] = useState<{
    count: number
    data: any
  }>({
    count: 0,
    data: [],
  })
  const [otherOsSearchKeyword, setOtherOsSearchKeyword] = useState<string>()
  const [selectedWindowsOs, setSelectedWindowsOs] =
    useState<string>('windows_10')
  const [versionListData, setVersionListData] = useState<any>([{}])
  const [serverData, setServerData] = useState<any>({
    name: null,
    os_family: 'amazon',
    os_release: '1',
    last_modified_date: null,
  })
  const [putServerTrigger, setPutServerTrigger] = useState<boolean>(false)
  const [fetchServerTrigger, setFetchServerTrigger] = useState<boolean>(false)
  const [fetchOtherOsTrigger, setFetchOtherOsTrigger] = useState<boolean>(false)

  const { dispatch } = useContext(GlobalContext)

  const fetchRequest = async () => {
    setIsLoading(false)

    apiClient
      .get('/projects', {})
      .then((res) => {
        console.log(res.data)
        setDefaultData(res.data)
        setProjects(res.data)
        setIsLoading(true)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  const fetchManualRequest = async () => {
    apiClient
      .get('/projects', {})
      .then((res) => {
        console.log(res.data)
        setProjects(res.data)
      })
      .catch((error) => {
        // #TODO sentry
        console.log(error)
      })
  }

  const fetchVersionRequest = async () => {
    setVersionListData([{}])

    if (osFamily.os_family === 'windows') {
      apiClient
        .get('/cpes/get_versions', {
          params: { vendor: 'microsoft', product: selectedWindowsOs },
        })
        .then((res) => {
          console.log(res.data)
          const data = res.data.map((data) => {
            return {
              label: data,
              value: data,
            }
          })
          setVersionListData(data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      return
    } else {
      apiClient
        .get('/servers/get_version_list', { params: osFamily })
        .then((res) => {
          const data = res.data.map((data) => {
            return {
              label: data,
              value: data,
            }
          })
          setVersionListData(data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  const fetchServerRequest = async () => {
    apiClient
      .get(`/servers/${serverId}`)
      .then((res) => {
        console.log(res.data)
        setServerData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchWindowsOsRequest = async () => {
    apiClient
      .get('/servers/get_os_list_windows')
      .then((res) => {
        setWindowsOsList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchOtherOsRequest = async () => {
    setIsLoading(false)
    apiClient
      .get('/cpes/search?part[]=o', {
        params: { limit: 100, keyword: otherOsSearchKeyword },
      })
      .then((res) => {
        console.log(res.data)
        setIsLoading(true)
        setOtherOsList(res.data)
      })
      .catch((error) => {
        setIsLoading(true)
        console.log(error.response)
      })
  }

  const fetchWindowsVersionRequest = async () => {
    apiClient
      .get('/cpes/get_versions', {
        params: { vendor: 'microsoft', product: selectedWindowsOs },
      })
      .then((res) => {
        const data = res.data.map((data) => {
          return {
            label: data,
            value: data,
          }
        })
        setVersionListData(data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const putServerRequest = async () => {
    if (osFamily.os_family === 'windows') {
      let data = {
        name: serverData.name,
        os_name: serverData.os_name,
        os_version: serverData.os_version,
        auto_update_enabled: serverData.auto_update_enabled,
        last_modified_date: serverData.last_modified_date,
      }
      apiClient
        .put(`/servers/${serverId}/windows`, data)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'update_toaster',
            payload: {
              isShow: true,
              text: `サーバーを編集しました。`,
              type: 'success',
            },
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      let data = {
        name: serverData.name,
        os_vendor: serverData.os_vendor,
        os_name: serverData.os_name,
        os_version: serverData.os_version,
        last_modified_date: serverData.last_modified_date,
      }
      apiClient
        .put(`/servers/${serverId}/other`, data)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'update_toaster',
            payload: {
              isShow: true,
              text: `サーバーを編集しました。`,
              type: 'success',
            },
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else {
      let data = {
        name: serverData.name,
        os_family: serverData.os_family,
        os_release: serverData.os_release,
        last_modified_date: serverData.last_modified_date,
      }
      apiClient
        .put(`/servers/${serverId}`, data)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'update_toaster',
            payload: {
              isShow: true,
              text: `サーバーを編集しました。`,
              type: 'success',
            },
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  useEffect(() => {
    if (!fetchRequestTrigger) return
    fetchManualRequest()
    setFetchRequestTrigger(false)
  }, [fetchRequestTrigger])

  useEffect(() => {
    fetchVersionRequest()
  }, [osFamily])
  //
  // useEffect(() => {
  //   fetchWindowsOsRequest()
  // }, [])

  useEffect(() => {
    if (osFamily.os_family !== 'windows') return
    fetchWindowsVersionRequest()
  }, [selectedWindowsOs])

  useEffect(() => {
    if (!putServerTrigger) return
    putServerRequest()
    setPutServerTrigger(false)
  }, [putServerTrigger])

  useEffect(() => {
    if (!fetchServerTrigger) return
    fetchVersionRequest()
    fetchWindowsOsRequest()
    fetchServerRequest()
    setFetchServerTrigger(false)
  }, [fetchServerTrigger, osFamily])

  useEffect(() => {
    if (!fetchOtherOsTrigger) return
    fetchOtherOsRequest()
    setFetchOtherOsTrigger(false)
  }, [fetchOtherOsTrigger])

  return {
    projects,
    setProjects,
    defaultData,
    isLoading,
    setIsLoading,
    setFetchRequestTrigger,
    versionListData,
    windowsOsList,
    otherOsList,
    osFamily,
    setOsFamily,
    setSelectedWindowsOs,
    setOtherOsSearchKeyword,
    setFetchOtherOsTrigger,
    setPutServerTrigger,
    serverId,
    setServerId,
    setFetchServerTrigger,
    serverData,
    setServerData,
  }
}

export const useProjectRegister = () => {
  const router = useRouter()
  const [projectId, setProjectId] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [osFamily, setOsFamily] = useState<any>({ os_family: 'amazon' })
  const [windowsOsList, setWindowsOsList] = useState<any>([{}])
  const [otherOsList, setOtherOsList] = useState<{
    count: number
    data: any
  }>({
    count: 0,
    data: [],
  })
  const [otherOsSearchKeyword, setOtherOsSearchKeyword] = useState<string>()
  const [selectedWindowsOs, setSelectedWindowsOs] =
    useState<string>('windows_10')
  const [versionListData, setVersionListData] = useState<any>([{}])
  const [targetRegisterProject, setTargetRegisterProject] = useState<{
    name: string
    platform: string
  }>()
  const [targetRegisterServer, setTargetRegisterServer] = useState<any>()
  const [registerProjectTrigger, setRegisterProjectTrigger] =
    useState<boolean>(false)
  const [registerServerTrigger, setRegisterServerTrigger] =
    useState<boolean>(false)
  const [addServerTrigger, setAddServerTrigger] = useState<boolean>(false)
  const [fetchOtherOsTrigger, setFetchOtherOsTrigger] = useState<boolean>(false)

  const fetchVersionRequest = async () => {
    setVersionListData([{}])

    if (osFamily.os_family === 'windows') {
      apiClient
        .get('/cpes/get_versions', {
          params: { vendor: 'microsoft', product: selectedWindowsOs },
        })
        .then((res) => {
          const data = res.data.map((data) => {
            return {
              label: data,
              value: data,
            }
          })
          setVersionListData(data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      return
    } else {
      apiClient
        .get('/servers/get_version_list', { params: osFamily })
        .then((res) => {
          const data = res.data.map((data) => {
            return {
              label: data,
              value: data,
            }
          })
          setVersionListData(data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  const fetchWindowsOsRequest = async () => {
    apiClient
      .get('/servers/get_os_list_windows')
      .then((res) => {
        setWindowsOsList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchOtherOsRequest = async () => {
    setIsLoading(false)
    apiClient
      .get('/cpes/search?part[]=o', {
        params: { limit: 100, keyword: otherOsSearchKeyword },
      })
      .then((res) => {
        console.log(res.data)
        setIsLoading(true)
        setOtherOsList(res.data)
      })
      .catch((error) => {
        setIsLoading(true)
        console.log(error.response)
      })
  }

  const fetchWindowsVersionRequest = async () => {
    apiClient
      .get('/cpes/get_versions', {
        params: { vendor: 'microsoft', product: selectedWindowsOs },
      })
      .then((res) => {
        const data = res.data.map((data) => {
          return {
            label: data,
            value: data,
          }
        })
        setVersionListData(data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const registerProjectRequest = async () => {
    apiClient
      .post('/projects', targetRegisterProject)
      .then((res) => {
        setProjectId(res.data.id)
        setRegisterServerTrigger(true)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const registerServerRequest = async (id: number) => {
    if (osFamily.os_family === 'windows') {
      apiClient
        .post(`/projects/${id}/servers/windows`, targetRegisterServer)
        .then((res) => {
          router.push('/assets')
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      apiClient
        .post(`/projects/${id}/servers/other`, targetRegisterServer)
        .then((res) => {
          router.push('/assets')
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else {
      apiClient
        .post(`/projects/${id}/servers`, targetRegisterServer)
        .then((res) => {
          router.push('/assets')
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  useEffect(() => {
    fetchVersionRequest()
  }, [osFamily])

  useEffect(() => {
    fetchWindowsOsRequest()
  }, [])

  useEffect(() => {
    if (osFamily.os_family !== 'windows') return
    fetchWindowsVersionRequest()
  }, [selectedWindowsOs])

  useEffect(() => {
    if (!registerProjectTrigger) return
    registerProjectRequest()
    setRegisterProjectTrigger(false)
  }, [registerProjectTrigger])

  useEffect(() => {
    if (!registerServerTrigger) return
    registerServerRequest(projectId)
    setRegisterServerTrigger(false)
  }, [registerServerTrigger])

  useEffect(() => {
    if (!addServerTrigger) return
    const query = router.query
    registerServerRequest(Number(query.project))
    setAddServerTrigger(false)
  }, [addServerTrigger])

  useEffect(() => {
    if (!fetchOtherOsTrigger) return
    fetchOtherOsRequest()
    setFetchOtherOsTrigger(false)
  }, [fetchOtherOsTrigger])

  return {
    versionListData,
    windowsOsList,
    otherOsList,
    osFamily,
    setOsFamily,
    setSelectedWindowsOs,
    setTargetRegisterProject,
    setTargetRegisterServer,
    setRegisterServerTrigger,
    setOtherOsSearchKeyword,
    setRegisterProjectTrigger,
    setAddServerTrigger,
    setFetchOtherOsTrigger,
    isLoading,
  }
}

export const useProjectEdit = () => {
  const [projectId, setProjectId] = useState<number>()
  const [fetchProjectTrigger, setFetchProjectTrigger] = useState<boolean>()
  const [putProjectTrigger, setPutProjectTrigger] = useState<boolean>()
  const [projectData, setProjectData] = useState<{
    id: number
    name: string
    platform: string
  }>({
    id: null,
    name: null,
    platform: null,
  })
  const { dispatch } = useContext(GlobalContext)

  const fetchProjectRequest = async () => {
    apiClient
      .get(`/projects/${projectId}`)
      .then((res) => {
        console.log(res.data)
        setProjectData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const putProjectRequest = async () => {
    console.log(projectData)
    apiClient
      .put(`/projects/${projectId}`, projectData)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `プロジェクトを編集しました。`,
            type: 'success',
          },
        })
        setProjectData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!fetchProjectTrigger) return
    fetchProjectRequest()
    setFetchProjectTrigger(false)
  }, [fetchProjectTrigger])

  useEffect(() => {
    if (!putProjectTrigger) return
    putProjectRequest()
    setPutProjectTrigger(false)
  }, [putProjectTrigger])

  return {
    setFetchProjectTrigger,
    setPutProjectTrigger,
    projectData,
    setProjectData,
    setProjectId,
  }
}

export const useServerEdit = () => {
  const [serverId, setServerId] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [osFamily, setOsFamily] = useState<any>({ os_family: 'amazon' })
  const [windowsOsList, setWindowsOsList] = useState<any>([{}])
  const [otherOsList, setOtherOsList] = useState<{
    count: number
    data: any
  }>({
    count: 0,
    data: [],
  })
  const [otherOsSearchKeyword, setOtherOsSearchKeyword] = useState<string>()
  const [selectedWindowsOs, setSelectedWindowsOs] =
    useState<string>('windows_10')
  const [versionListData, setVersionListData] = useState<any>([{}])
  const [serverData, setServerData] = useState<any>({
    name: null,
    os_family: 'amazon',
    os_release: '1',
    last_modified_date: null,
  })
  const [putServerTrigger, setPutServerTrigger] = useState<boolean>(false)
  const [fetchServerTrigger, setFetchServerTrigger] = useState<boolean>(false)
  const [fetchOtherOsTrigger, setFetchOtherOsTrigger] = useState<boolean>(false)
  const { dispatch } = useContext(GlobalContext)

  const fetchVersionRequest = async () => {
    setVersionListData([{}])

    if (osFamily.os_family === 'windows') {
      apiClient
        .get('/cpes/get_versions', {
          params: { vendor: 'microsoft', product: selectedWindowsOs },
        })
        .then((res) => {
          console.log(res.data)
          const data = res.data.map((data) => {
            return {
              label: data,
              value: data,
            }
          })
          setVersionListData(data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      return
    } else {
      apiClient
        .get('/servers/get_version_list', { params: osFamily })
        .then((res) => {
          const data = res.data.map((data) => {
            return {
              label: data,
              value: data,
            }
          })
          setVersionListData(data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  const fetchServerRequest = async () => {
    apiClient
      .get(`/servers/${serverId}`)
      .then((res) => {
        console.log(res.data)
        setServerData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchWindowsOsRequest = async () => {
    apiClient
      .get('/servers/get_os_list_windows')
      .then((res) => {
        setWindowsOsList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchOtherOsRequest = async () => {
    setIsLoading(false)
    apiClient
      .get('/cpes/search?part[]=o', {
        params: { limit: 100, keyword: otherOsSearchKeyword },
      })
      .then((res) => {
        console.log(res.data)
        setIsLoading(true)
        setOtherOsList(res.data)
      })
      .catch((error) => {
        setIsLoading(true)
        console.log(error.response)
      })
  }

  const fetchWindowsVersionRequest = async () => {
    apiClient
      .get('/cpes/get_versions', {
        params: { vendor: 'microsoft', product: selectedWindowsOs },
      })
      .then((res) => {
        const data = res.data.map((data) => {
          return {
            label: data,
            value: data,
          }
        })
        setVersionListData(data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const putServerRequest = async () => {
    if (osFamily.os_family === 'windows') {
      let data = {
        name: serverData.name,
        os_name: serverData.os_name,
        os_version: serverData.os_version,
        auto_update_enabled: serverData.auto_update_enabled,
        last_modified_date: serverData.last_modified_date,
      }
      apiClient
        .put(`/servers/${serverId}/windows`, data)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'update_toaster',
            payload: {
              isShow: true,
              text: `サーバーを編集しました。`,
              type: 'success',
            },
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      let data = {
        name: serverData.name,
        os_vendor: serverData.os_vendor,
        os_name: serverData.os_name,
        os_version: serverData.os_version,
        last_modified_date: serverData.last_modified_date,
      }
      apiClient
        .put(`/servers/${serverId}/other`, data)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'update_toaster',
            payload: {
              isShow: true,
              text: `サーバーを編集しました。`,
              type: 'success',
            },
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else {
      let data = {
        name: serverData.name,
        os_family: serverData.os_family,
        os_release: serverData.os_release,
        last_modified_date: serverData.last_modified_date,
      }
      apiClient
        .put(`/servers/${serverId}`, data)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: 'update_toaster',
            payload: {
              isShow: true,
              text: `サーバーを編集しました。`,
              type: 'success',
            },
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  useEffect(() => {
    fetchVersionRequest()
  }, [osFamily])
  //
  // useEffect(() => {
  //   fetchWindowsOsRequest()
  // }, [])

  useEffect(() => {
    if (osFamily.os_family !== 'windows') return
    fetchWindowsVersionRequest()
  }, [selectedWindowsOs])

  useEffect(() => {
    if (!putServerTrigger) return
    putServerRequest()
    setPutServerTrigger(false)
  }, [putServerTrigger])

  useEffect(() => {
    if (!fetchServerTrigger) return
    fetchVersionRequest()
    fetchWindowsOsRequest()
    fetchServerRequest()
    setFetchServerTrigger(false)
  }, [fetchServerTrigger, osFamily])

  useEffect(() => {
    if (!fetchOtherOsTrigger) return
    fetchOtherOsRequest()
    setFetchOtherOsTrigger(false)
  }, [fetchOtherOsTrigger])

  return {
    versionListData,
    windowsOsList,
    otherOsList,
    osFamily,
    setOsFamily,
    setSelectedWindowsOs,
    setOtherOsSearchKeyword,
    setFetchOtherOsTrigger,
    isLoading,
    setPutServerTrigger,
    serverId,
    setServerId,
    setFetchServerTrigger,
    serverData,
    setServerData,
  }
}

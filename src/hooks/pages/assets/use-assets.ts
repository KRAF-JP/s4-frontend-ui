import { useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import { useRouter } from 'next/router'

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [projects, setProjects] = useState<any>([])
  const [defaultData, setDefaultData] = useState<any>([])

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

  useEffect(() => {
    fetchRequest()
  }, [])

  return {
    projects,
    setProjects,
    defaultData,
    isLoading,
    setIsLoading,
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
        console.log(res.data)
        setProjectId(res.data.id)
        setRegisterServerTrigger(true)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const registerServerRequest = async () => {
    if (osFamily.os_family === 'windows') {
      apiClient
        .post(`/projects/${projectId}/servers/windows`, targetRegisterServer)
        .then((res) => {
          router.push('/assets')
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else if (osFamily.os_family === 'other') {
      apiClient
        .post(`/projects/${projectId}/servers/other`, targetRegisterServer)
        .then((res) => {
          router.push('/assets')
        })
        .catch((error) => {
          console.log(error.response)
        })
    } else {
      apiClient
        .post(`/projects/${projectId}/servers`, targetRegisterServer)
        .then((res) => {
          router.push('/assets')
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  const addServerRequest = async (projectId: number) => {
    apiClient
      .post(`/projects/${projectId}/servers`, targetRegisterServer)
      .then((res) => {
        console.log(res.data)
        router.push('/assets')
      })
      .catch((error) => {
        console.log(error.response)
      })
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
    registerServerRequest()
    setRegisterServerTrigger(false)
  }, [registerServerTrigger])

  useEffect(() => {
    if (!addServerTrigger) return
    const query = router.query
    addServerRequest(Number(query.project))
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
    setOtherOsSearchKeyword,
    setRegisterProjectTrigger,
    setAddServerTrigger,
    setFetchOtherOsTrigger,
    isLoading,
  }
}

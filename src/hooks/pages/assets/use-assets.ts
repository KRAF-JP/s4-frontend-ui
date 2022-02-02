import { useEffect, useState } from 'react'
import { apiClient } from '../../api-client'

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
  const [osFamily, setOsFamily] = useState<any>({ os_family: 'amazon' })
  const [windowsOsList, setWindowsOsList] = useState<any>([{}])
  const [selectedWindowsOs, setSelectedWindowsOs] =
    useState<string>('windows_10')
  const [versionListData, setVersionListData] = useState<any>([{}])
  const [targetRegisterProject, setTargetRegisterProject] = useState<{
    name: string
    platform: string
  }>()
  const [targetRegisterServer, setTargetRegisterServer] = useState<{
    name: string
    os_family: string
    os_release: string
    last_modified_date: string
  }>()
  const [registerProjectTrigger, setRegisterProjectTrigger] =
    useState<boolean>(false)
  const [addServerTrigger, setAddServerTrigger] = useState<boolean>(false)

  const fetchVersionRequest = async () => {
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
        registerServerRequest(res.data.id)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const registerServerRequest = async (projectId: number) => {
    apiClient
      .post(`/projects/${projectId}/servers`, targetRegisterServer)
      .then((res) => {
        router.push('/assets')
      })
      .catch((error) => {
        console.log(error.response)
      })
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
    if (!addServerTrigger) return
    const query = router.query
    addServerRequest(Number(query.project))
    setAddServerTrigger(false)
  }, [addServerTrigger])

  return {
    versionListData,
    windowsOsList,
    setOsFamily,
    setSelectedWindowsOs,
    setTargetRegisterProject,
    setTargetRegisterServer,
    setRegisterProjectTrigger,
    setAddServerTrigger,
  }
}

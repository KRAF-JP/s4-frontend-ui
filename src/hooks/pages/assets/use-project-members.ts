import { useContext, useEffect, useState } from 'react'
import { apiClient } from '../../api-client'
import GlobalContext from '../../../store/context'
import { useRouter } from 'next/router'
import { useErrorHandle } from '../../use-error-handle'

export const useProjectMembers = () => {
  const router = useRouter()
  const { keyword } = router.query
  const [isLoadingMember, setIsLoadingMember] = useState<boolean>(false)
  const [projectMembers, setProjectMembers] = useState<any>([])
  const [projectNonMembers, setProjectNonMembers] = useState<any>([])
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false)
  const [nonMemberTrigger, setNonMemberTrigger] = useState<boolean>(false)
  const [postTrigger, setPostTrigger] = useState<boolean>(false)
  const [deleteMemberTrigger, setDeleteMemberTrigger] = useState<boolean>(false)
  const [targetMember, setTargetMember] = useState<any>([])
  const [targetProject, setTargetProject] = useState<number>()
  const [targetKeyword, setTargetKeyword] = useState<string>()
  const [targetKeywordNonMember, setTargetKeywordNonMember] = useState<string>()
  const { dispatch } = useContext(GlobalContext)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    apiClient
      .get(`/projects/${Number(targetProject)}/members`, {
        params: {
          keyword: targetKeyword,
        },
      })
      .then((res) => {
        setProjectMembers(res.data)
        setIsLoadingMember(true)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const nonMemberRequest = async () => {
    apiClient
      .get(`/projects/${Number(targetProject)}/members`, {
        params: {
          keyword: targetKeywordNonMember,
          nonmember: 1,
        },
      })
      .then((res) => {
        setProjectNonMembers(res.data)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }

  const postRequest = async () => {
    setIsLoadingMember(false)
    apiClient
      .post(`/projects/${Number(targetProject)}/members`, {
        user_ids: targetMember,
      })
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `追加しました。`,
            type: 'success',
          },
        })
        setIsLoadingMember(true)
      })
      .catch((error) => {
        errorHandle(error, '追加できませんでした。')
      })
  }

  const deleteRequest = async () => {
    setIsLoadingMember(false)
    apiClient
      .delete(`/projects/${Number(targetProject)}/members/${targetMember[0]}`)
      .then((res) => {
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `削除しました。`,
            type: 'success',
          },
        })
        setIsLoadingMember(true)
      })
      .catch((error) => {
        errorHandle(error, '削除できませんでした。')
      })
  }

  useEffect(() => {
    if (!fetchTrigger) return
    fetchRequest()
    setFetchTrigger(false)
  }, [targetProject, fetchTrigger])

  useEffect(() => {
    if (!nonMemberTrigger) return
    nonMemberRequest()
    setNonMemberTrigger(false)
  }, [targetProject, nonMemberTrigger])

  useEffect(() => {
    if (!postTrigger) return
    postRequest()
    setPostTrigger(false)
  }, [targetMember, postTrigger])

  useEffect(() => {
    if (!deleteMemberTrigger) return
    deleteRequest()
    setDeleteMemberTrigger(false)
  }, [targetMember, deleteMemberTrigger])

  return {
    projectMembers,
    setProjectMembers,
    setTargetMember,
    setPostTrigger,
    setDeleteMemberTrigger,
    setFetchTrigger,
    setNonMemberTrigger,
    isLoadingMember,
    setIsLoadingMember,
    setTargetProject,
    targetProject,
    targetKeyword,
    setTargetKeyword,
    targetKeywordNonMember,
    setTargetKeywordNonMember,
    projectNonMembers,
  }
}

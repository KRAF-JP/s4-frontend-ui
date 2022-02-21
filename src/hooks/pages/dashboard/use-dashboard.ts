import { fetcher } from '../../api-client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useErrorHandle } from '../../use-error-handle'

export type unsolvedVulnerabilityProps = {
  total_count: number
  severities_count: {
    '1': number
    '2': number
    '3': number
    '4': number
    '5': number
  }
}

export const useUnsolvedVulnerability = () => {
  const [unsolvedVulnerability, setUnsolvedVulnerability] =
    useState<unsolvedVulnerabilityProps>(null)
  const { data, error } = useSWR('/dashboard/unsolved_issue_counts', fetcher)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    if (error) return errorHandle(error)
    return setUnsolvedVulnerability(data)
  }

  useEffect(() => {
    if (!data) return
    fetchRequest()
  }, [data])

  return {
    unsolvedVulnerability,
  }
}

export const usePeriodCounts = () => {
  const [periodCounts, setPeriodCounts] = useState<any>({
    data: null,
    periodDate: null,
  })
  const { data, error } = useSWR('/dashboard/period_issue_counts', fetcher)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    if (error) return errorHandle(error)
    const dateReplace = data.map((data) => {
      return {
        ...data,
        date: data.date.substr(8, 10),
      }
    })

    return setPeriodCounts({
      data: dateReplace,
      periodDate: [data[0].date, data[13].date],
    })
  }

  useEffect(() => {
    if (!data) return
    fetchRequest()
  }, [data])

  return { periodCounts }
}

export const useSelfList = () => {
  const [selfList, setSelfList] = useState<any>(null)
  const { data, error } = useSWR('/dashboard/self_issue_list', fetcher)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    if (error) return errorHandle(error)
    return setSelfList(data)
  }

  useEffect(() => {
    if (!data) return
    fetchRequest()
  }, [data])

  return { selfList }
}

export const usePriorityList = () => {
  const [priorityList, setPriorityList] = useState<any>(null)
  const { data, error } = useSWR('/dashboard/priority_issue_list', fetcher)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    if (error) return errorHandle(error)

    return setPriorityList(data)
  }

  useEffect(() => {
    if (!data) return
    fetchRequest()
  }, [data])

  return {
    priorityList,
  }
}

export const useRecentList = () => {
  const [recentList, setRecentList] = useState<any>(null)
  const { data, error } = useSWR('/dashboard/recent_issue_list', fetcher)
  const errorHandle = useErrorHandle()

  const fetchRequest = async () => {
    if (error) return errorHandle(error)

    return setRecentList(data)
  }

  useEffect(() => {
    if (!data) return
    fetchRequest()
  }, [data])

  return {
    recentList,
  }
}

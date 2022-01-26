import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Sort } from '../../../atoms/sort'

type Props = {
  data?: []
  defaultValue?: []
  setData?: any
  reset?: boolean
  setReset?: any
}

const MembersSortable: React.FC<Props> = (props) => {
  const [sortName, setSortName] = useState<number>(0)
  const [sortEmail, setSortEmail] = useState<number>(0)
  const [sortRole, setSortRole] = useState<number>(0)
  const [sortDeletedAt, setSortDeletedAt] = useState<number>(0)

  //asc 昇順 desc 降順

  const sortAsc = (name: string) => {
    const sortData = props.data.slice().sort((a, b) => {
      if (a[name] < b[name]) {
        return -1
      }
      if (a[name] > b[name]) {
        return 1
      }
      return 0
    })
    props.setData([...sortData])
  }

  const sortDesc = (name) => {
    const sortData = props.data.slice().sort((a, b) => {
      if (a[name] < b[name]) {
        return 1
      }
      if (a[name] > b[name]) {
        return -1
      }
      return 0
    })
    props.setData([...sortData])
  }

  const sortAscLevel = (name: string, level: string) => {
    const sortData = props.data.slice().sort((a, b) => {
      if (a[name] !== null && b[name] !== null) {
        return a[name][level] - b[name][level]
      } else if (a[name] !== null) {
        return -1
      } else if (b[name] !== null) {
        return 1
      } else {
        return -1
      }
    })
    props.setData([...sortData])
  }

  const sortDescLevel = (name, level: string) => {
    const sortData = props.data.slice().sort((a, b) => {
      if (a[name] !== null && b[name] !== null) {
        return b[name][level] - a[name][level]
      } else {
        return 0
      }
    })
    props.setData([...sortData])
  }

  const handleClickSortData = (name: string, sort: number, level?: string) => {
    if (level) {
      if (sort === 0) {
        sortAscLevel(name, level)
      } else if (sort === 1) {
        sortDescLevel(name, level)
      } else {
        props.setData([...props.defaultValue])
      }
    } else {
      if (sort === 0) {
        sortAsc(name)
      } else if (sort === 1) {
        sortDesc(name)
      } else {
        props.setData([...props.defaultValue])
      }
    }
  }

  useEffect(() => {
    if (!props.reset) return
    setSortName(0)
    setSortEmail(0)
    setSortRole(0)
    setSortDeletedAt(0)
    props.setReset(false)
  }, [props.reset])

  return (
    <Wrap>
      <Sort
        sort={sortName}
        handleClick={() => {
          handleClickSortData('name', sortName)
          setSortEmail(0)
          setSortRole(0)
          setSortDeletedAt(0)
          setSortName((sortName + 1) % 3)
        }}
      >
        名前
      </Sort>
      <Sort
        sort={sortEmail}
        handleClick={() => {
          handleClickSortData('email', sortEmail)
          setSortRole(0)
          setSortName(0)
          setSortDeletedAt(0)
          setSortEmail((sortEmail + 1) % 3)
        }}
      >
        メールアドレス
      </Sort>
      <Sort
        sort={sortRole}
        handleClick={() => {
          handleClickSortData('role', sortRole)
          setSortEmail(0)
          setSortName(0)
          setSortDeletedAt(0)
          setSortRole((sortRole + 1) % 3)
        }}
      >
        権限
      </Sort>
      <Sort
        sort={sortDeletedAt}
        handleClick={() => {
          handleClickSortData('deleted_at', sortDeletedAt)
          setSortEmail(0)
          setSortName(0)
          setSortRole(0)
          setSortDeletedAt((sortDeletedAt + 1) % 3)
        }}
      >
        有効化
      </Sort>
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 1056px;
  display: grid;
  grid-template-columns: 260px 405px 1fr 85px;
  padding: 16px 32px 16px 16px;

  > * {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
`

export default MembersSortable

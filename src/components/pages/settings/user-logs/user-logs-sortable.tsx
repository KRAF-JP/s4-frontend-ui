import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Color from '../../../../const/color'
import { useRouter } from 'next/router'
import { Sort } from '../../../atoms/sort'

type Props = {
  data?: any
  defaultValue?: []
  setData?: any
  reset?: boolean
  setReset?: any
}

const UserLogsSortable: React.FC<Props> = (props) => {
  const router = useRouter()
  const [sortCreatedAt, setSortCreatedAt] = useState<number>(0)
  const [sortUserName, setSortUserName] = useState<number>(0)
  const [sortEmail, setSortEmail] = useState<number>(0)
  const [sortAction, setSortAction] = useState<number>(0)

  const handleClickSort = (name: string, sort: number) => {
    if (sort === 0) {
      delete router.query.sort
      delete router.query.direction
      router.push({
        query: { ...router.query },
      })
    } else if (sort === 1) {
      router.push({
        query: { ...router.query, sort: name, direction: 'asc' },
      })
    } else if (sort === 2) {
      router.push({
        query: { ...router.query, sort: name, direction: 'desc' },
      })
    }
  }

  useEffect(() => {
    if (!props.reset) return
    setSortCreatedAt(0)
    setSortUserName(0)
    setSortEmail(0)
    setSortAction(0)
    props.setReset(false)
  }, [props.reset])

  return (
    <Wrap>
      <Sort
        sort={sortCreatedAt}
        handleClick={() => {
          handleClickSort('created_at', (sortCreatedAt + 1) % 3)
          setSortCreatedAt((sortCreatedAt + 1) % 3)
          setSortUserName(0)
          setSortEmail(0)
          setSortAction(0)
        }}
      >
        検出日時
      </Sort>
      <Sort
        sort={sortUserName}
        handleClick={() => {
          handleClickSort('user_name', (sortUserName + 1) % 3)
          setSortCreatedAt(0)
          setSortUserName((sortUserName + 1) % 3)
          setSortEmail(0)
          setSortAction(0)
        }}
      >
        ユーザー
      </Sort>
      <Sort
        sort={sortEmail}
        handleClick={() => {
          handleClickSort('email', (sortEmail + 1) % 3)
          setSortCreatedAt(0)
          setSortUserName(0)
          setSortEmail((sortEmail + 1) % 3)
          setSortAction(0)
        }}
      >
        メールアドレス
      </Sort>
      <Sort
        sort={sortAction}
        handleClick={() => {
          handleClickSort('action', (sortAction + 1) % 3)
          setSortCreatedAt(0)
          setSortUserName(0)
          setSortEmail(0)
          setSortAction((sortAction + 1) % 3)
        }}
      >
        動作
      </Sort>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 210px 160px 320px minmax(96px, auto);
  padding: 16px 32px 16px 16px;

  > * {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
`
const SortLabel = styled.div`
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
  user-select: none;
`
const ButtonWrap = styled.div`
  margin-left: 8px;
`
const StatusChangeForm = styled.div`
  display: flex;
  align-items: center;
`
const StatusChange = styled.div`
  display: flex;
  height: 40px;
  margin-left: 24px;
  padding-left: 24px;
  border-left: 1px solid ${Color.COMPONENT.BORDER};

  > div {
    margin-right: 8px;
  }
`
const StatusChangeItem = styled.div``

export default UserLogsSortable

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import Color from '../../../../const/color'
import { Icon } from '../../../atoms/icon'
import { Select } from '../../../atoms/form'
import { List, ListItem } from '../../../molecules/list'
import { LoadingIcon } from '../../../atoms/loading-icon'
import { NextPage } from 'next'

type Props = {
  data: any[]
  setData: any
  searchRef?: any
  searchHeight?: number
  isLoading?: boolean
  setIsLoading: any
  totalCount?: number
}

const perPageSelectData = [
  {
    value: '10',
    label: '10件',
  },
  {
    value: '20',
    label: '20件',
  },
  {
    value: '50',
    label: '50件',
  },
  {
    value: '100',
    label: '100件',
  },
]

const UserLogsList: NextPage<Props> = (props) => {
  const router = useRouter()
  const query = router.query
  const [offset, setOffset] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageCount, setPageCount] = useState<number>(props.totalCount)
  const [initialSelect, setInitialSelect] = useState<any>(perPageSelectData[0])
  const [items, setItems] = useState([])

  const initialData = perPageSelectData.filter((data) => {
    return Number(data.value) === Number(query.limit)
  })

  const handlePageChange = (e) => {
    const pageNumber = e.selected
    router.push({
      pathname: '/settings/user-logs',
      query: { ...router.query, offset: pageNumber * perPage },
    })
    setOffset(pageNumber * perPage)
  }

  const handleChangePerPage = (e) => {
    const perPage = Number(e.target.value)
    router.push({
      pathname: '/settings/user-logs',
      query: { ...router.query, limit: perPage },
    })
    setCurrentPage(Math.ceil(offset / perPage))
    setPerPage(perPage)
  }

  useEffect(() => {
    setItems(props.data)
    setPageCount(Math.ceil(props.totalCount / perPage))
    console.log(props.totalCount)
  }, [offset, perPage, props.data, props.totalCount])

  useEffect(() => {
    if (query.offset) {
      setOffset(Number(query.offset))
      setCurrentPage(Math.ceil(offset / perPage))
    } else {
      setOffset(0)
      setCurrentPage(0)
    }

    if (!query.limit) {
      setPerPage(10)
      setInitialSelect(perPageSelectData[0])
    }
  }, [query])

  useEffect(() => {
    if (!initialData.length) {
    } else {
      setPerPage(Number(initialData[0].value))
      setInitialSelect(initialData[0])
    }
  }, [initialData])

  return (
    <Wrap>
      <StyledList height={props.searchHeight}>
        {props.isLoading ? (
          <>
            {items.length ? (
              <>
                {items.map((data, i) => (
                  <StyledListItem key={i}>
                    <DataListItem>
                      <DataCreatedAt>
                        {data.created_at.replaceAll('-', '/')}
                      </DataCreatedAt>
                      <DataUserName>{data.user.name}</DataUserName>
                      <DataEmail>{data.user.email}</DataEmail>
                      <DataAction>{data.action_name}</DataAction>
                    </DataListItem>
                  </StyledListItem>
                ))}
              </>
            ) : (
              <NothingText>
                検索条件に合う脆弱性はありませんでした。
              </NothingText>
            )}
          </>
        ) : (
          <LoadingIcon />
        )}
      </StyledList>

      <ListFooter>
        <PerPageList>
          <PerPageListShow>
            全 {props.totalCount} 件中
            <PageCurrentNumber>{Number(offset) + 1}</PageCurrentNumber>〜
            {props.totalCount > Number(offset) + Number(perPage) ? (
              <PageCurrentNumber>
                {Number(offset) + Number(perPage)}
              </PageCurrentNumber>
            ) : (
              <PageCurrentNumber>{props.totalCount}</PageCurrentNumber>
            )}
            件を表示
          </PerPageListShow>
          <StyledSelect
            defaultData={initialSelect}
            data={perPageSelectData}
            top
            handleClick={handleChangePerPage}
          />
        </PerPageList>

        <StyledReactPaginate
          previousLabel={<Icon.ChevronLeft color={Color.TEXT.GRAY} />}
          nextLabel={<Icon.ChevronRight color={Color.TEXT.GRAY} />}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          forcePage={currentPage}
          onPageChange={handlePageChange}
        />
      </ListFooter>
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 1056px;
  font-size: 14px;
`
const StyledList = styled(List)<{ height?: number }>`
  height: calc(100vh - ${({ height }) => height && height}px);
  margin: 0 0 0 -16px;
  padding: 4px 16px;
  overflow-y: scroll;
  transition: height 0.3s ease-in-out;
  &::-webkit-scrollbar {
    //display: none;
  }
`
const ListFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0 0;
`
const PerPageList = styled.div`
  display: flex;
  align-items: center;
`
const PerPageListShow = styled.div`
  display: flex;
  align-items: center;
`
const PageCurrentNumber = styled.div`
  margin: 0 0.4em;
`
const StyledSelect = styled(Select)`
  margin-left: 16px;

  > div {
    width: 96px;
  }
`

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  font-size: 16px;

  li {
    margin-left: 8px;
  }

  .selected {
    a {
      background: ${Color.PRIMARY._500};
      color: ${Color.TEXT.WHITE};
      cursor: pointer;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: ${Color.TEXT.GRAY};
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${Color.COMPONENT.WHITE_HOVER};
      color: ${Color.TEXT.GRAY};
      cursor: pointer;
      transition: all 0.2s;
    }
  }
`
const StyledListItem = styled(ListItem)`
  position: relative;
  display: grid;
  grid-template-columns: 40px 1fr;
  border-radius: 8px;
  line-height: 1.71;
  overflow: hidden;

  > * {
    margin-right: 16px;
  }
`
const DataListItem = styled.div`
  display: grid !important;
  grid-template-columns: 210px 160px 320px minmax(96px, auto);
  height: 100%;
  margin: 0;
  cursor: pointer;

  > * {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
`
const DataCreatedAt = styled.div``
const DataUserName = styled.div``
const DataEmail = styled.div``
const DataAction = styled.div``
const NothingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 1.71;
  text-align: center;
`

export default UserLogsList

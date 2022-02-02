import React, { useEffect, useState, useContext } from 'react'
import GlobalContext from '../../../store/context'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { List } from '../../molecules/list'
import { LoadingIcon } from '../../atoms/loading-icon'
import { NextPage } from 'next'
import { IconButton } from '../../atoms/icon-button'
import { ServerList } from '../../pages/assets'
import { Card } from '../../atoms/card'
import { useRouter } from 'next/router'

type Props = {
  data: any[]
  setData: any
  isLoading?: boolean
  setIsLoading: any
}

const ProjectList: NextPage<Props> = (props) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [openToggle, setOpenToggle] = useState({})
  const { state } = useContext(GlobalContext)

  const handleClickOpen = (i) => {
    setOpenToggle({
      ...openToggle,
      [i]: !openToggle[i],
    })
  }

  useEffect(() => {
    setItems(props.data)
  }, [props.data])

  return (
    <Wrap>
      <StyledList>
        {props.isLoading ? (
          <>
            {items.length ? (
              <>
                {items.map((data, i) => (
                  <Card key={i} margin={24}>
                    <ProjectListItem>
                      <WrapLeft>
                        <ProjectName>{data.name}</ProjectName>
                        {data.platform_display && (
                          <ProjectPlatform>
                            {data.platform_display}
                          </ProjectPlatform>
                        )}
                        <ProjectScanLastDate>
                          脆弱性スキャン最新日時：
                          {data.last_scanned_at
                            ? data.last_scanned_at.replaceAll('-', '/')
                            : '-'}
                        </ProjectScanLastDate>
                      </WrapLeft>
                      <WrapRight>
                        <ProjectServer
                          onClick={() => {
                            router.push({
                              pathname: `/assets/projects/${data.id}/register`,
                            })
                          }}
                        >
                          <IconButton>
                            <Icon.Plus />
                          </IconButton>
                          サーバ登録
                        </ProjectServer>
                        <IconButton>
                          <Icon.User />
                        </IconButton>
                        <IconButton>
                          <Icon.Pen />
                        </IconButton>
                        {state.user.role !== 0 && (
                          <IconButton>
                            <Icon.Trash />
                          </IconButton>
                        )}
                        <IconButton
                          handleClick={() => {
                            handleClickOpen(i)
                          }}
                        >
                          {openToggle[i] ? (
                            <Icon.ChevronUp />
                          ) : (
                            <Icon.ChevronDown />
                          )}
                        </IconButton>
                      </WrapRight>
                    </ProjectListItem>
                    <OpenWrap isOpen={openToggle[i]}>
                      <ServerList data={data.servers} />
                    </OpenWrap>
                  </Card>
                ))}
              </>
            ) : (
              <NothingText>
                検索条件に合うプロジェクトはありませんでした。
              </NothingText>
            )}
          </>
        ) : (
          <LoadingIcon />
        )}
      </StyledList>
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 830px;
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
const WrapLeft = styled.div`
  > * {
    margin-right: 16px;
  }
`
const WrapRight = styled.div`
  > * {
    font-size: 14px;
    font-weight: bold;
    color: ${Color.TEXT.GRAY};
    line-height: 1;
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`
const ProjectListItem = styled.div`
  height: 100%;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > * {
    display: flex;
    align-items: center;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
`
const ProjectName = styled.div`
  font-size: 18px;
  font-weight: 500;
`
const ProjectPlatform = styled.div`
  padding: 2px 8px;
  border-radius: 4px;
  border: solid 1px ${Color.TEXT.GRAY};
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.GRAY};
  line-height: 1.33;
`
const ProjectScanLastDate = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.GRAY};
`
const ProjectServer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`
const OpenWrap = styled.div<{ isOpen: any }>`
  display: none;
  ${({ isOpen }) =>
    isOpen &&
    `
    display: block;
  `}
`
const NothingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 1.71;
  text-align: center;
`

export default ProjectList

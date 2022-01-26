import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { List, ListItem } from '../../molecules/list'
import { NextPage } from 'next'
import { IconButton } from '../../atoms/icon-button'
import { CardInner } from '../../atoms/card'
import { PackageList, SoftwareList } from '../../pages/assets'

type Props = {
  data: any[]
}

const ServerList: NextPage<Props> = (props) => {
  const [items, setItems] = useState([])
  const [openToggle, setOpenToggle] = useState({})

  const handleClickOpen = (id: number) => {
    setOpenToggle({
      ...openToggle,
      [id]: !openToggle[id],
    })
  }

  useEffect(() => {
    setItems(props.data)
  }, [props.data])

  return (
    <Wrap>
      <StyledList>
        {items.length ? (
          <>
            {items.map((data, i) => (
              <CardInner key={i} bgColor={Color.PRIMARY._100}>
                <CardHeader>
                  <CardHeaderTitle>
                    <ServerListHeader>
                      <WrapLeft>
                        <ServerName>{data.name}</ServerName>
                        <ServerInfo>
                          <ServerLabel>OS：</ServerLabel>
                          {data.os_name_display ? data.os_name_display : '-'}
                        </ServerInfo>
                        <ServerInfo>
                          <ServerLabel>バージョン：</ServerLabel>
                          {data.os_version_display
                            ? data.os_version_display
                            : '-'}
                        </ServerInfo>
                      </WrapLeft>
                      <WrapRight>
                        <IconButton>
                          <Icon.Pen />
                        </IconButton>
                        <IconButton>
                          <Icon.Trash />
                        </IconButton>
                        <ServerOption
                          onClick={() => {
                            handleClickOpen(data.id)
                          }}
                        >
                          <IconButton>
                            {openToggle[data.id] ? (
                              <Icon.ChevronUp />
                            ) : (
                              <Icon.ChevronDown />
                            )}
                          </IconButton>
                          オプション
                        </ServerOption>
                      </WrapRight>
                    </ServerListHeader>
                  </CardHeaderTitle>
                </CardHeader>
                <CardContents isOpen={openToggle[data.id]} isMore={false}>
                  {data.is_linux ? (
                    <>
                      <CardContentsLabel>
                        サーバーにインストールされているソフトウェアの脆弱性のみ検出したい場合はこちら。
                      </CardContentsLabel>
                      <PackageList data={data.package} server={data.id} />
                    </>
                  ) : (
                    <></>
                  )}
                  {data.is_linux ? (
                    <CardContentsLabel>
                      【上級者向け】CPEを個別登録しCVEをNVDから検出する場合はこちら。
                    </CardContentsLabel>
                  ) : (
                    <CardContentsLabel>
                      OSの脆弱性に加え、脆弱性を検出したい特定のソフトウェアがある場合は、該当ソフトウェアを登録してください。
                    </CardContentsLabel>
                  )}
                  <SoftwareList data={data.software} server={data.id} />
                </CardContents>
              </CardInner>
            ))}
          </>
        ) : (
          <></>
        )}
      </StyledList>
    </Wrap>
  )
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CardHeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  width: 100%;
`
const CardContents = styled.div<{ isMore?: boolean; isOpen?: any }>`
  overflow: hidden;
  display: none;
  padding-bottom: 4px;
  ${({ isOpen }) =>
    isOpen &&
    `
    display: block;
  `}
`
const CardContentsLabel = styled.div`
  font-size: 14px;
  color: ${Color.TEXT.BLACK};
  margin-top: 24px;

  + div {
    margin-top: 16px;
  }
`
const Wrap = styled.div`
  width: 100%;
  font-size: 14px;
`
const StyledList = styled(List)`
  height: auto;
  margin: 0 -16px;
  padding: 4px 16px;
  overflow-y: scroll;
  transition: height 0.3s ease-in-out;

  &::-webkit-scrollbar {
    //display: none;
  }
`
const ServerListHeader = styled.div`
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
const ServerName = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-right: 8px;

  + div {
    border-left: 1px solid ${Color.TEXT.GRAY};
  }
`
const ServerInfo = styled.div`
  font-size: 12px;
  padding-left: 24px;
  margin-right: 0;
`
const ServerLabel = styled.div`
  display: inline-block;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const ServerOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  color: ${Color.TEXT.GRAY};
  font-weight: bold;
`

export default ServerList

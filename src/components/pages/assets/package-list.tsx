import React, { createRef, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { ListItem } from '../../molecules/list'
import { NextPage } from 'next'
import { IconButton } from '../../atoms/icon-button'
import { CardInner } from '../../atoms/card'
import Button from '../../atoms/button/button'

type Props = {
  data: any[]
  server: number
}

const PackageList: NextPage<Props> = (props) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [openToggle, setOpenToggle] = useState<boolean>(false)

  const handleClickOpen = () => {
    setOpenToggle(!openToggle)
  }

  useEffect(() => {
    setItems(props.data)
  }, [props.data])

  return (
    <>
      {items.length ? (
        <>
          <CardInner>
            <CardHeader>
              <WrapLeft>
                <CardHeaderTitle>パッケージ</CardHeaderTitle>
              </WrapLeft>
              <WrapRight>
                <ServerOption onClick={() => {}}>
                  <IconButton>
                    <Icon.Reload />
                  </IconButton>
                  情報更新
                </ServerOption>
              </WrapRight>
            </CardHeader>
            <CardContents isOpen={true}>
              <PackageListHeader>
                <PackageLabel>パッケージ</PackageLabel>
                <PackageLabel>バージョン</PackageLabel>
              </PackageListHeader>
              {items.map((data, i) => (
                <PackageListItem key={i}>
                  <PackageName>{data.name}</PackageName>
                  <PackageVersion>{data.version}</PackageVersion>
                </PackageListItem>
              ))}
              <CardFooter>
                <WrapLeft>
                  {items.length > 3 ? (
                    <ServerOption
                      onClick={() => {
                        handleClickOpen()
                      }}
                    >
                      <IconButton>
                        {openToggle ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
                      </IconButton>
                      {openToggle ? '閉じる' : 'もっと見る'}
                    </ServerOption>
                  ) : (
                    <></>
                  )}
                </WrapLeft>
                <WrapRight>全 {items.length} 件</WrapRight>
              </CardFooter>
            </CardContents>
          </CardInner>
        </>
      ) : (
        <>
          <RegisterWrap>
            <Button
              buttonType={'secondary'}
              beforeIcon={<Icon.Plus />}
              small={true}
              label={'コマンド実行でパッケージ登録'}
              handleClick={() => {
                router.push({
                  pathname: `/assets/servers/${props.server}/packages/register`,
                })
              }}
            />
          </RegisterWrap>
        </>
      )}
    </>
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
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  margin: 0 2px;
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
const RegisterWrap = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  > button {
    margin-right: 8px;
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
const ServerOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  color: ${Color.TEXT.GRAY};
  font-weight: bold;
`
const PackageListHeader = styled.div`
  position: relative;
  display: grid !important;
  grid-template-columns: 240px 1fr;
  padding: 8px 16px;
`
const PackageLabel = styled.div`
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const PackageListItem = styled(ListItem)`
  position: relative;
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100%;
  border-radius: 8px;
  line-height: 1.71;
  overflow: hidden;
  margin: 2px 2px 4px;

  > * {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-right: 16px;)}
`
const PackageName = styled.div``
const PackageVersion = styled.div``

export default PackageList

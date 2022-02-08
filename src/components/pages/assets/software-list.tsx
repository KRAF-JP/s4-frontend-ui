import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { List, ListItem } from '../../molecules/list'
import { NextPage } from 'next'
import { IconButton } from '../../atoms/icon-button'
import { CardInner } from '../../atoms/card'
import Button from '../../atoms/button/button'
import Modal from '../../organisms/modal'
import { useSoftwareDelete } from '../../../hooks/pages/assets/use-softwares'

type Props = {
  data: any[]
  server: number
}

const SoftwareList: NextPage<Props> = (props) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [openToggle, setOpenToggle] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const { target, setTarget, setDeleteTrigger } = useSoftwareDelete()

  const handleClickOpen = () => {
    setOpenToggle(!openToggle)
  }

  const handleSubmitDelete = () => {
    setDeleteTrigger(true)
    setIsShowModal(false)
  }

  const handleSubmitCancel = () => {
    setTarget({
      id: null,
      name: null,
    })
    setIsShowModal(false)
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
                <CardHeaderTitle>ソフトウェア</CardHeaderTitle>
              </WrapLeft>
              <WrapRight>
                <Button
                  type={'button'}
                  label={'個別登録'}
                  beforeIcon={<Icon.Plus />}
                  small
                  handleClick={() => {
                    router.push({
                      pathname: `/assets/servers/${props.server}/software/register`,
                      query: {},
                    })
                  }}
                >
                  個別登録
                </Button>
                <Button
                  type={'button'}
                  label={'CSV一括登録'}
                  beforeIcon={<Icon.DownLoad />}
                  small
                  handleClick={() => {}}
                >
                  個別登録
                </Button>
              </WrapRight>
            </CardHeader>
            <CardContents isOpen={true}>
              <SoftwareListHeader>
                <SoftwareLabel>ソフトウェア</SoftwareLabel>
                <SoftwareLabel>バージョン</SoftwareLabel>
                <SoftwareLabel>ベンダー</SoftwareLabel>
              </SoftwareListHeader>
              <StyledList isOpen={openToggle}>
                {items.map((data, i) => (
                  <SoftwareListItem key={i} size={48}>
                    <SoftwareName>{data.product_name}</SoftwareName>
                    <SoftwareVersion>{data.version}</SoftwareVersion>
                    <SoftwareVendor>{data.vendor_name}</SoftwareVendor>
                    <SoftwareAction>
                      <IconButton handleClick={() => {}}>
                        <Icon.Pen />
                      </IconButton>
                      <IconButton
                        handleClick={() => {
                          setTarget({
                            id: data.id,
                            name: data.product_name,
                          })
                          setIsShowModal(true)
                        }}
                      >
                        <Icon.Trash />
                      </IconButton>
                    </SoftwareAction>
                  </SoftwareListItem>
                ))}
              </StyledList>
              <CardFooter>
                <WrapLeft>
                  {items.length > 3 ? (
                    <Button
                      type={'button'}
                      label={openToggle ? '閉じる' : 'もっと見る'}
                      beforeIcon={
                        <>
                          {openToggle ? (
                            <Icon.ChevronUp />
                          ) : (
                            <Icon.ChevronDown />
                          )}
                        </>
                      }
                      small
                      handleClick={() => {
                        handleClickOpen()
                      }}
                    >
                      {openToggle ? '閉じる' : 'もっと見る'}
                    </Button>
                  ) : (
                    <></>
                  )}
                </WrapLeft>
                <WrapRight>全 {items.length} 件</WrapRight>
              </CardFooter>
            </CardContents>
          </CardInner>
          <Modal
            isShow={isShowModal}
            setIsShow={setIsShowModal}
            submit={{
              label: '削除',
              buttonType: 'danger',
              disabled: false,
            }}
            title={'ソフトウェアを削除'}
            handleClickSubmit={() => {
              handleSubmitDelete()
            }}
            handleClickCancel={() => {
              handleSubmitCancel()
            }}
          >
            <>
              「{target.name}」を削除しますか？
              <br />
              （該当の資産で検出された脆弱性も削除されます）
            </>
          </Modal>
        </>
      ) : (
        <>
          <RegisterWrap>
            <Button
              buttonType={'secondary'}
              beforeIcon={<Icon.Plus />}
              small={true}
              label={'ソフトウェア個別登録'}
              handleClick={() => {
                router.push({
                  pathname: `/assets/servers/${props.server}/software/register`,
                  query: {},
                })
              }}
            />
            <Button
              buttonType={'secondary'}
              beforeIcon={<Icon.Plus />}
              small={true}
              label={'ソフトウェアCSV一括登録'}
              handleClick={() => {
                router.push({
                  pathname: `/assets/servers/${props.server}/software/register`,
                  query: {},
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
  color: ${Color.TEXT.BLACK};
  font-size: 14px;
  display: flex;
  align-items: center;

  > * {
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
const SoftwareListHeader = styled.div`
  position: relative;
  display: grid !important;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 16px;
`
const SoftwareLabel = styled.div`
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const StyledList = styled(List)<{ isOpen: boolean }>`
  max-height: 157px;
  overflow: hidden;
  padding-bottom: 2px;
  transition: max-height 0.2s ease-out;
  ${({ isOpen }) =>
    isOpen &&
    `
      max-height: 200vh !important;
  `}
`
const SoftwareListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 8px;
  line-height: 1.71;
  margin: 2px 2px 4px;
  padding: 2px 16px !important;

  > * {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-right: 16px;)}
`
const SoftwareName = styled.div``
const SoftwareVersion = styled.div``
const SoftwareVendor = styled.div``
const SoftwareAction = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  > div:first-child {
    margin-right: 8px;
  }
`

export default SoftwareList

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Button } from '../../atoms/button'
import { Icon } from '../../atoms/icon'
import { ListItem } from '../../molecules/list'
import { IconButton } from '../../atoms/icon-button'
import { CardInner } from '../../atoms/card'
import { useAccessFilter } from '../../../hooks/pages/settings/restrictions/use-access-filter'
import Modal from '../../organisms/modal'
import FormField from '../../molecules/form-field'
import { InputText } from '../../atoms/form'
import { LabelEmail } from '../../atoms/label'

type Props = {
  title?: string
  type: string
  label: string
  bgColor?: string
  isLoading: boolean
  dataDispatch: any
  handleClickAdd?(e: React.MouseEvent<HTMLElement>): void
  handleClickModify?(e: React.MouseEvent<HTMLElement>): void
  handleClickDelete?(e: React.MouseEvent<HTMLElement>): void
  data: any
  setTarget: any
  setPutTrigger: any
  setPostTrigger: any
  setDeleteTrigger: any
}

const AccessFilterCard: React.FC<Props> = (props) => {
  const [modalData, setModalData] = useState<any>({})
  const [emailValue, setEmailValue] = useState<string>('')
  const [submitDisable, setSubmitDisable] = useState(true)
  const [invalidMessage, setInvalidMessage] = useState<string>('')
  const [isShowAccordion, setIsShowAccordion] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowModifyModal, setIsShowModifyModal] = useState(false)
  const [isShowAddModal, setIsShowAddModal] = useState(false)
  const [addList, setAddList] = useState<any>([])
  const [addValue, setAddValue] = useState<string>('')
  const addElement = useRef<any>()

  const handleDataSet = (data, setState) => {
    setModalData(data)
    setState(true)
  }

  const handleClickModalCancel = () => {
    setEmailValue('')
    setInvalidMessage('')
    setIsShowModifyModal(false)
    setIsShowDeleteModal(false)
    setIsShowAddModal(false)
    setSubmitDisable(true)
    setAddList([])
  }

  const handleClickModify = (id: number, type: string, value: string) => {
    if (value) {
      const putData = { id: id, filter_type: type, filter_value: value }
      props.setTarget(putData)
      props.setPutTrigger(true)
      setIsShowModifyModal(false)
      setEmailValue('')
    }
  }

  const handleClickDelete = (
    id: number,
    type: string,
    filter_value: string
  ) => {
    const deleteData = { id: id, type: type, filter_value: filter_value }
    props.setTarget(deleteData)
    props.setDeleteTrigger(true)
    setIsShowDeleteModal(false)
  }

  const handleClickAdd = (data: any) => {
    const addData = data.map((data) => {
      return data.filter_value
    })

    const setData = {
      filter_type: data[0].filter_type,
      filter_value: addData,
    }

    props.setTarget(setData)
    props.setPostTrigger(true)
    setIsShowAddModal(false)
    setAddList([])
  }

  const handleClickAddValue = (label: string) => {
    const addData = {
      filter_type: props.type,
      filter_value: label,
    }
    setSubmitDisable(false)
    setAddList([...addList, addData])
  }

  const handleClickAddValueRemove = (label: string) => {
    if (addList.length === 0) {
      setSubmitDisable(false)
    } else {
      setSubmitDisable(true)
    }
    const removeData = addList.filter((data) => {
      return data.filter_value !== label
    })
    setAddList(removeData)
  }

  return (
    <CardInner bgColor={props.bgColor}>
      <CardHeader>
        <CardHeaderTitle>{props.label}</CardHeaderTitle>
        <Button
          label={'追加'}
          beforeIcon={<Icon.Plus />}
          buttonType={'primary'}
          small
          handleClick={() => {
            setIsShowAddModal(true)
          }}
        />
      </CardHeader>

      {props.data.length !== 0 && (
        <>
          <CardContents isMore={isShowAccordion}>
            {props.data.map((data, i) => (
              <ListItem key={i} size={48}>
                <div>
                  <IconWrap>
                    {data.filter_type === 'deny_email' ? (
                      <Icon.CircleCross color={Color.COMPONENT.DANGER} />
                    ) : (
                      <Icon.CircleCheck color={Color.PRIMARY._500} />
                    )}
                  </IconWrap>
                  <Text>{data.filter_value}</Text>
                </div>
                <ActionArea>
                  <IconButton
                    handleClick={() => {
                      handleDataSet(
                        {
                          id: data.id,
                          type: data.filter_type,
                          value: data.filter_value,
                        },
                        setIsShowModifyModal
                      )
                    }}
                  >
                    <Icon.Pen />
                  </IconButton>

                  <IconButton
                    handleClick={() => {
                      handleDataSet(
                        {
                          id: data.id,
                          type: data.filter_type,
                          value: data.filter_value,
                        },
                        setIsShowDeleteModal
                      )
                    }}
                  >
                    <Icon.Trash size={16} />
                  </IconButton>
                </ActionArea>
              </ListItem>
            ))}
          </CardContents>

          <CardFooter>
            <div>
              {props.data.length > 3 && (
                <MoreButton>
                  <MoreIcon>
                    {isShowAccordion ? (
                      <Icon.ChevronUp color={Color.TEXT.GRAY} />
                    ) : (
                      <Icon.ChevronDown color={Color.TEXT.GRAY} />
                    )}
                  </MoreIcon>
                  <MoreText
                    onClick={() => {
                      setIsShowAccordion(!isShowAccordion)
                    }}
                  >
                    {isShowAccordion ? '閉じる' : 'もっと見る'}
                  </MoreText>
                </MoreButton>
              )}
            </div>
            <Length>全 {props.data.length} 件</Length>
          </CardFooter>
        </>
      )}

      <Modal
        isShow={isShowDeleteModal}
        setIsShow={setIsShowDeleteModal}
        title={`${props.label}${props.title}を削除`}
        submit={{
          label: '削除',
          buttonType: 'danger',
          disabled: false,
        }}
        handleClickCancel={handleClickModalCancel}
        handleClickSubmit={() => {
          handleClickDelete(modalData.id, modalData.type, modalData.value)
        }}
      >
        「{modalData.value}」を削除しますか？
      </Modal>

      <Modal
        isShow={isShowModifyModal}
        setIsShow={setIsShowModifyModal}
        title={`${props.label}${props.title}を編集`}
        submit={{
          label: '変更',
          buttonType: 'primary',
          disabled: submitDisable,
        }}
        handleClickCancel={handleClickModalCancel}
        handleClickSubmit={() => {
          handleClickModify(modalData.id, modalData.type, emailValue)
        }}
      >
        <FormField label={`現在の${props.title}`} marginBottom={24}>
          {modalData.value}
        </FormField>
        <FormField label={`変更後の${props.title}`}>
          <InputText
            value={emailValue}
            invalidMessage={invalidMessage}
            onChange={(e) => {
              if (e.target.value) {
                setSubmitDisable(false)
              } else {
                setSubmitDisable(true)
              }
              setEmailValue(e.target.value)
            }}
            size={'XXL'}
          />
        </FormField>
      </Modal>

      <Modal
        title={`${props.label}${props.title}を登録`}
        isShow={isShowAddModal}
        setIsShow={setIsShowAddModal}
        submit={{
          label: '登録',
          buttonType: 'primary',
          disabled: submitDisable,
        }}
        handleClickCancel={handleClickModalCancel}
        handleClickSubmit={() => {
          handleClickAdd(addList)
        }}
      >
        <FormField label={props.title}>
          <AddListWrap
            onClick={() => {
              addElement.current.focus()
            }}
          >
            {addList.map((data, i) => (
              <LabelEmail
                key={i}
                label={data.filter_value}
                handleClick={() => {
                  handleClickAddValueRemove(data.filter_value)
                }}
              />
            ))}
            <StyledInput
              value={addValue}
              ref={addElement}
              onChange={(e) => {
                if (e.target.value !== ',') {
                  setAddValue(e.target.value)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  if (addValue) {
                    handleClickAddValue(addValue)
                    setAddValue('')
                  }
                }

                if (e.key === 'Backspace' && !addValue) {
                  const lastNum = addList.length - 1
                  const arrLast = addList.filter((data, i) => {
                    return addList.indexOf(data) !== lastNum
                  })
                  setAddList(arrLast)

                  if (addList.length < 2) {
                    setSubmitDisable(true)
                  } else {
                    setSubmitDisable(false)
                  }
                }
              }}
            />
          </AddListWrap>
        </FormField>
        <ModalText>
          ※ 複数ある場合はエンター、またはカンマ（,）区切りで入力してください
        </ModalText>
      </Modal>
    </CardInner>
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
`
const CardContents = styled.div<{ isMore?: boolean }>`
  max-height: ${({ isMore }) => (isMore ? 'auto' : '166px')};
  margin: 16px -10px 0 -10px;
  padding: 10px;
  overflow: hidden;
`
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 8px 0 0;
`
const IconWrap = styled.div`
  margin-right: 16px;
  height: 16px;
`
const Text = styled.div``
const MoreButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 126px;
  height: 40px;
  padding-left: 8px;
  border-radius: 8px;
  cursor: pointer;
`
const MoreIcon = styled.div`
  height: 16px;
  margin-right: 8px;
`
const MoreText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${Color.TEXT.GRAY};
`
const Length = styled.div`
  font-size: 14px;
`
const ActionArea = styled.div`
  > div {
    margin-left: 8px;
  }
`
const AddListWrap = styled.div`
  width: 480px;
  min-height: 240px;
  padding: 8px 0 0 8px;
  border: 1px solid ${Color.COMPONENT.FORM_BORDER};
  border-radius: 8px;
  cursor: text;

  > * {
    margin: 0 8px 8px 0;
  }
`
const StyledInput = styled.input`
  height: 32px;
  padding: 0 4px;
  border: none;
  font-size: 14px;
  appearance: none;

  &:focus {
    outline: none;
  }
`
const ModalText = styled.p`
  margin-top: 24px;
  font-size: 14px;
  color: ${Color.TEXT.BLACK};
`

export default AccessFilterCard

import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Button } from '../../atoms/button'
import { Icon } from '../../atoms/icon'
import Skeleton from 'react-loading-skeleton'
import { ListItem } from '../../molecules/list'
import { IconButton } from '../../atoms/icon-button'
import { CardInner } from '../../atoms/card'
import { useAccessFilter } from '../../../hooks/pages/settings/use-access-filter'
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
  const {
    setTarget,
    setPutTrigger,
    setPostTrigger,
    setDeleteTrigger,
    setAllowEmail,
  } = useAccessFilter()

  const handleDataSet = (data, setState) => {
    setModalData(data)
    setState(true)
  }

  const validateEmail = (value) => {
    value = value || ''
    if (value === '') {
      return undefined
    }

    const matches = value.match(
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    )
    if (matches !== null) {
      return setInvalidMessage('')
    } else {
      setSubmitDisable(true)
      return setInvalidMessage('正しいメールアドレスを入力してください')
    }
  }

  const validateIp = (value) => {
    value = value || ''
    if (value === '') {
      return undefined
    }

    const matches = value.match(
      /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/
    )
    if (matches !== null) {
      return setInvalidMessage('')
    } else {
      setSubmitDisable(true)
      return setInvalidMessage('正しいIPアドレスを入力してください')
    }
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
      setTarget(putData)
      setPutTrigger(true)
      setIsShowModifyModal(false)

      props.data.filter((data) => {
        if (data.id === id) {
          data.filter_value = putData.filter_value
        }
        return data.id === id
      })

      props.dataDispatch(props.data)
      setEmailValue('')
    }
  }

  const handleClickDelete = (
    id: number,
    type: string,
    filter_value: string
  ) => {
    const deleteData = { id: id, type: type, filter_value: filter_value }
    setTarget(deleteData)
    setDeleteTrigger(true)
    setIsShowDeleteModal(false)

    const data = props.data.filter((data) => {
      return data.id !== deleteData.id
    })

    props.dataDispatch(data)
  }

  const handleClickAdd = (data: []) => {
    setTarget(data)
    setPostTrigger(true)
    setIsShowAddModal(false)

    props.dataDispatch([...props.data, ...data])
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

      <CardContents isMore={isShowAccordion}>
        {props.isLoading || (
          <Skeleton
            baseColor={Color.COMPONENT.BORDER}
            width={'100%'}
            height={64}
            borderRadius={16}
          />
        )}
        {props.data.map((data, i) => (
          <ListItem key={i}>
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
                もっと見る
              </MoreText>
            </MoreButton>
          )}
        </div>
        <Length>全 {props.data.length} 件</Length>
      </CardFooter>

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
              if (props.title === 'IPアドレス') {
                validateIp(e.target.value)
              } else {
                validateEmail(e.target.value)
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
  max-height: ${({ isMore }) => (isMore ? 'auto' : '208px')};
  margin-top: 16px;
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
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 40px;
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

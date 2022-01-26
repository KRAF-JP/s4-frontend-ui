import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Color from '../../../../const/color'
import { Icon } from '../../../atoms/icon'
import { IconImage } from '../../../atoms/icon-image'
import {
  InputText,
  Select,
  ToggleButton,
  Checkbox,
} from '../../../atoms/form'
import { List, ListItem } from '../../../molecules/list'
import AuthorityName from '../../../../const/authority-name'
import { IconButton } from '../../../atoms/icon-button'
import ReactPaginate from 'react-paginate'
import { useUsers, useUserDetail } from '../../../../hooks/pages/settings/members'
import Modal from '../../../organisms/modal'
import FormField from '../../../molecules/form-field'
import { composeValidators, required } from '../../../utils/varidator'
import { Field, Form } from 'react-final-form'
import { LoadingIcon } from '../../../atoms/loading-icon'

type Props = {
  data: any[]
  setData: any
  searchRef?: any
  searchHeight?: number
  isLoading?: boolean
  setIsLoading: any
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

const MembersList: React.FC<Props> = (props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isActiveUsers, setIsActiveUsers] = useState({})

  const [offset, setOffset] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(20)
  const [pageCount, setPageCount] = useState<number>(0)
  const [items, setItems] = useState([])
  const [editUser, setEditUser] = useState<any>({
    id: null,
    lastName: null,
    firstName: null,
    email: null,
    role: null,
  })
  const { setTarget, setDeleteTrigger, setRestoreTrigger, setPutTrigger } =
    useUsers()

  const handlePageChange = (e) => {
    let pageNumber = e.selected

    setOffset(pageNumber * perPage)
  }

  const handleChangePerPage = (e) => {
    setPerPage(Number(e.target.value))
  }

  const handleUserEditCancel = () => {
    setIsShowModal(false)
  }

  const handleEditSubmit = async (formValue) => {
    const { lastname, firstname, role } = formValue.values
    const target = {
      id: editUser.id,
      data: {
        lastname: lastname,
        firstname: firstname,
        role: role ? 2 : 0,
      },
    }
    setIsShowModal(false)
    setTarget(target)
    setPutTrigger(true)

    const data = props.data.map((data) => {
      if (editUser.id === data.id) {
        const name = `${lastname} ${firstname}`
        return {
          ...data,
          name: name,
          role: role ? 2 : 0,
        }
      } else {
        return {
          ...data,
        }
      }
    })

    setItems(data)
  }

  const handleClickEdit = (
    id: number,
    lastname: string,
    firstname: string,
    role: number,
    email: string
  ) => {
    setIsShowModal(true)
    setEditUser({
      id: id,
      lastName: lastname,
      firstName: firstname,
      email: email,
      role: role,
    })
  }

  const handleUserActive = (e) => {
    setIsActiveUsers({
      ...isActiveUsers,
      [e.target.id]: e.target.checked,
    })
    setTarget(e.target)
    if (e.target.checked) {
      setRestoreTrigger(e.target)
    } else {
      setDeleteTrigger(e.target)
    }
  }

  useEffect(() => {
    const endOffset = offset + perPage
    setItems(props.data.slice(offset, endOffset))
    setPageCount(Math.ceil(props.data.length / perPage))
  }, [offset, perPage, props.data])

  return (
    <Wrap>
      <StyledList height={props.searchHeight}>
        {props.isLoading ? (
          <>
            {items.length ? (
              <>
                {items.map((data, i) => (
                  <StyledListItem key={i} size={56}>
                    <DataName>
                      <IconImage src={data.profile_image} size={32} />
                      <IconLabel>{data.name}</IconLabel>
                    </DataName>
                    <DataEmail>
                      <ItemText>{data.email}</ItemText>
                    </DataEmail>
                    <DataRole>
                      <ItemText>{AuthorityName.ROLE[data.role]}</ItemText>
                    </DataRole>
                    <ActionWrap>
                      {data.deleted_at === null && data.role !== 1 ? (
                        <IconButton
                          handleClick={() => {
                            handleClickEdit(
                              data.id,
                              data.lastname,
                              data.firstname,
                              data.role,
                              data.email
                            )
                          }}
                        >
                          <Icon.Pen />
                        </IconButton>
                      ) : (
                        <NoEdit />
                      )}
                      {data.role !== 1 && (
                        <ToggleButton
                          id={data.id}
                          data-name={data.name}
                          checked={
                            isActiveUsers[data.id] ??
                            data.deleted_at === null ??
                            true
                          }
                          name={'activeUser'}
                          onChange={(e) => {
                            handleUserActive(e)
                          }}
                        />
                      )}
                    </ActionWrap>
                  </StyledListItem>
                ))}
              </>
            ) : (
              <NothingText>
                検索条件に合うメンバーはありませんでした。
              </NothingText>
            )}
          </>
        ) : (
          <LoadingIcon />
        )}
      </StyledList>

      <Form
        onSubmit={handleEditSubmit}
        initialValues={{
          id: editUser.id,
          lastname: editUser.lastName,
          firstname: editUser.firstName,
          role: editUser.role === 2,
        }}
        validate={(values: any) => {
          const errors: any = {}

          errors.lastname = composeValidators(required('姓を入力してください'))(
            values.lastname
          )

          errors.firstname = composeValidators(
            required('名を入力してください')
          )(values.firstname)

          return errors
        }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} id={'submitUserEdit'}>
            <Modal
              isShow={isShowModal}
              setIsShow={setIsShowModal}
              submit={{
                label: '保存',
                buttonType: 'primary',
                disabled: false,
                form: 'submitUserEdit',
              }}
              handleClickSubmit={() => {
                handleEditSubmit(form.getState())
              }}
              handleClickCancel={handleUserEditCancel}
            >
              <>
                <ModalHeader>
                  <ModalUserName>{editUser.name}</ModalUserName>
                  メンバー編集
                </ModalHeader>
                <ModalContent>
                  <FormNameWrap>
                    <FormField marginBottom={24} label={'姓'}>
                      <Field name={'lastname'} type={'text'}>
                        {({ input, meta }) => (
                          <InputText
                            {...(input as any)}
                            type={'text'}
                            name={'lastname'}
                            size={'L'}
                            invalidMessage={
                              meta.error && meta.touched && meta.error
                            }
                          />
                        )}
                      </Field>
                    </FormField>
                    <FormField marginBottom={24} label={'名'}>
                      <Field name={'firstname'} type={'text'}>
                        {({ input, meta }) => (
                          <InputText
                            {...(input as any)}
                            type={'text'}
                            name={'firstname'}
                            size={'L'}
                            invalidMessage={
                              meta.error && meta.touched && meta.error
                            }
                          />
                        )}
                      </Field>
                    </FormField>
                  </FormNameWrap>
                  <FormField marginBottom={24} label={'メールアドレス'}>
                    {editUser.email}
                  </FormField>
                  <FormField marginBottom={24} label={'権限'}>
                    <Field name={'role'} type={'checkbox'}>
                      {({ input, meta }) => (
                        <Checkbox
                          {...(input as any)}
                          name={'role'}
                          labelName={'プロジェクト管理者'}
                          value={2}
                        />
                      )}
                    </Field>
                  </FormField>
                </ModalContent>
              </>
            </Modal>
          </form>
        )}
      />

      <ListFooter>
        <PerPageList>
          <PerPageListShow>
            全 {props.data.length} 件中
            <PageCurrentNumber>{Number(offset) + 1}</PageCurrentNumber>〜
            {props.data.length > Number(offset) + Number(perPage) ? (
              <PageCurrentNumber>
                {Number(offset) + Number(perPage)}
              </PageCurrentNumber>
            ) : (
              <PageCurrentNumber>{props.data.length}</PageCurrentNumber>
            )}
            件を表示
          </PerPageListShow>
          <StyledSelect
            defaultData={perPageSelectData[1]}
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
const ActionWrap = styled.div`
  display: grid !important;
  grid-template-columns: 48px 1fr;
  > div {
    color: ${Color.TEXT.LIGHT_GRAY};
    margin-right: 8px;
    justify-content: center;

    &:last-child {
      margin-right: 0;
    }
  }
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
const StyledListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 260px 405px 1fr 115px;
  padding: 0 32px 0 16px;

  > * {
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
`
const DataName = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  > :first-child {
    margin-right: 8px;
  }
`
const DataEmail = styled.div`
  white-space: nowrap;
`
const DataRole = styled.div``
const IconLabel = styled.label``
const ItemText = styled.label``
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
      transition: all 0.2s;
    }
  }
`
const ModalHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 24px;
`
const ModalContent = styled.div``
const ModalUserName = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.GRAY};
`
const FormNameWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 48%;
  }
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
const NoEdit = styled.div``

export default MembersList

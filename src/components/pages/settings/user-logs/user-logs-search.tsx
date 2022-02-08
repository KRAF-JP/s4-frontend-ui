import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import SearchToggle from '../../../molecules/search-toggle'
import FormField from '../../../molecules/form-field'
import { InputText, InputDate, Select } from '../../../atoms/form'
import { SearchCheckbox } from '../../../atoms/search-checkbox'
import { Button } from '../../../atoms/button'
import { Icon } from '../../../atoms/icon'
import { IconButton } from '../../../atoms/icon-button'
import { useRouter } from 'next/router'
import { useUserLogsSearchItem } from '../../../../hooks/pages/settings/user-logs/use-user-logs'
import GlobalContext from '../../../../store/context'

type Props = {
  data?: []
  setData?: any
  searchRef?: any
  setReset?: any
  handleClick?(e: React.MouseEvent<HTMLElement>): void
}

const defaultSelect = {
  value: '',
  label: 'すべて',
}

const UserLogsSearch: React.FC<Props> = (props) => {
  const router = useRouter()
  const [minDate, setMinDate] = useState<any>()
  const { userList } = useUserLogsSearchItem()
  const { state } = useContext(GlobalContext)

  const [userListData, setUserListData] = useState<any>(defaultSelect)

  const handleUserChange = (e) => {
    const userId = Number(e.target.value)

    if (userId) {
      router.push({
        query: { ...router.query, user_id: userId },
      })
    } else {
      delete router.query.user_id
      router.push({
        query: { ...router.query },
      })
    }
  }

  const handleUserSet = () => {
    setUserListData({
      label: state.user.name,
      value: state.user.id,
      image: state.user.profile_image,
    })
    router.push({
      query: { ...router.query, user_id: state.user.id },
    })
  }

  const handleActionChange = (formState: any) => {
    const { action } = formState.values
    router.push({
      query: { ...router.query, 'action[]': action },
    })
  }

  const toDoubleDigits = (num) => {
    num += ''
    if (num.length === 1) {
      num = '0' + num
    }
    return num
  }

  const handleStartDateChange = (formValues: any) => {
    const { createStartDate } = formValues.values
    const year = createStartDate.getFullYear()
    const month = toDoubleDigits(createStartDate.getMonth() + 1)
    const day = toDoubleDigits(createStartDate.getDate())
    setMinDate(createStartDate)

    router.push({
      query: { ...router.query, create_date_start: `${year}-${month}-${day}` },
    })
  }

  const handleEndDateChange = (formValues: any) => {
    const { createEndDate } = formValues.values
    const year = createEndDate.getFullYear()
    const month = toDoubleDigits(createEndDate.getMonth() + 1)
    const day = toDoubleDigits(createEndDate.getDate())

    router.push({
      query: { ...router.query, create_date_end: `${year}-${month}-${day}` },
    })
  }

  let timer = null

  const handleKeywordChange = (formValues: any) => {
    const { keyword } = formValues.values

    clearTimeout(timer)
    timer = setTimeout(() => {
      if (!keyword) {
        delete router.query.keyword
        router.push({
          pathname: '/settings/user-logs',
          query: { ...router.query },
        })
      } else {
        router.push({
          pathname: '/settings/user-logs',
          query: { ...router.query, keyword: keyword },
        })
      }
    }, 2000)
  }

  const handleClear = () => {
    if (!Object.keys(router.query).length) return

    router.push({
      pathname: '/settings/user-logs',
    })

    setUserListData({ label: 'すべて', value: '' })
    props.setReset(true)
  }

  return (
    <Wrap ref={props.searchRef}>
      <SearchToggle
        height={208}
        handleClick={props.handleClick}
        form={
          <Form
            onSubmit={handleActionChange}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <FormWrap>
                  <FormWrapRow>
                    <InputWrap>
                      <FormField label={'検出日'}>
                        <Field name={'createStartDate'} type={'text'} value={1}>
                          {({ input, meta }) => (
                            <InputDate
                              {...input}
                              onChange={(e) => {
                                input.onChange(e)
                                handleStartDateChange(form.getState())
                              }}
                            />
                          )}
                        </Field>
                        〜&nbsp;&nbsp;
                        <Field name={'createEndDate'} type={'text'} value={1}>
                          {({ input, meta }) => (
                            <InputDate
                              {...input}
                              minDate={minDate}
                              onChange={(e) => {
                                input.onChange(e)
                                handleEndDateChange(form.getState())
                              }}
                            />
                          )}
                        </Field>
                      </FormField>
                    </InputWrap>
                    <InputWrap>
                      <StyledFormField label={'担当者'}>
                        <Select
                          data={userList}
                          defaultData={userListData}
                          handleClick={handleUserChange}
                        />
                      </StyledFormField>
                      <IconButton handleClick={handleUserSet}>
                        <Icon.User />
                      </IconButton>
                    </InputWrap>
                  </FormWrapRow>

                  <FormWrapRow>
                    <InputWrap>
                      <FormField label={'動作'}>
                        <Field
                          name={'action'}
                          type={'checkbox'}
                          value={'created'}
                        >
                          {({ input, meta }) => (
                            <SearchCheckbox
                              {...input}
                              onChange={(e) => {
                                input.onChange(e)
                                handleActionChange(form.getState())
                              }}
                            >
                              追加
                            </SearchCheckbox>
                          )}
                        </Field>
                        <Field
                          name={'action'}
                          type={'checkbox'}
                          value={'active'}
                        >
                          {({ input, meta }) => (
                            <SearchCheckbox
                              {...input}
                              onChange={(e) => {
                                input.onChange(e)
                                handleActionChange(form.getState())
                              }}
                            >
                              有効化
                            </SearchCheckbox>
                          )}
                        </Field>
                        <Field
                          name={'action'}
                          type={'checkbox'}
                          value={'inactive'}
                        >
                          {({ input, meta }) => (
                            <SearchCheckbox
                              {...input}
                              onChange={(e) => {
                                input.onChange(e)
                                handleActionChange(form.getState())
                              }}
                            >
                              無効化
                            </SearchCheckbox>
                          )}
                        </Field>
                        <Field
                          name={'action'}
                          type={'checkbox'}
                          value={'login'}
                        >
                          {({ input, meta }) => (
                            <SearchCheckbox
                              {...input}
                              onChange={(e) => {
                                input.onChange(e)
                                handleActionChange(form.getState())
                              }}
                            >
                              ログイン
                            </SearchCheckbox>
                          )}
                        </Field>
                        <Field
                          name={'action'}
                          type={'checkbox'}
                          value={'logout'}
                        >
                          {({ input, meta }) => (
                            <SearchCheckbox
                              {...input}
                              onChange={(e) => {
                                input.onChange(e)
                                handleActionChange(form.getState())
                              }}
                            >
                              ログアウト
                            </SearchCheckbox>
                          )}
                        </Field>
                      </FormField>
                    </InputWrap>
                    <InputWrap>
                      <FormField>
                        <Field name={'keyword'} type={'text'} value={1}>
                          {({ input, meta }) => (
                            <FormField label={'キーワード'}>
                              <InputText
                                {...(input as any)}
                                size={'L'}
                                onKeyUp={(e) => {
                                  input.onChange(e)
                                  handleKeywordChange(form.getState())
                                }}
                              />
                            </FormField>
                          )}
                        </Field>
                      </FormField>
                    </InputWrap>
                    <InputWrap>
                      <FormField>
                        <Button
                          type={'button'}
                          label={'絞り込みをリセット'}
                          small={true}
                          buttonType={'secondary'}
                          handleClick={() => {
                            form.reset()
                            handleClear()
                          }}
                        />
                      </FormField>
                    </InputWrap>
                  </FormWrapRow>
                </FormWrap>
              </form>
            )}
          />
        }
      />
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 1056px;
  margin-top: -60px;
`
const FormWrap = styled.div`
  width: 100%;
  padding-top: 8px;
`
const FormWrapRow = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 24px;

  &:last-of-type {
    margin: 0;
  }
`
const InputWrap = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0 32px 0 0;
`
const StyledFormField = styled(FormField)`
  margin-right: 8px;
`

export default UserLogsSearch

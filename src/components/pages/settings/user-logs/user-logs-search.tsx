import React, { useEffect, useContext, useState } from 'react'
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
  const [initialQuery, setInitailQuery] = useState<any>([])

  const [userListData, setUserListData] = useState<any>(defaultSelect)

  const handleUserChange = (e) => {
    const userId = Number(e.target.value)
    delete router.query.offset
    if (userId) {
      router.push(
        {
          query: { ...router.query, user_id: userId },
        },
        undefined,
        { shallow: true }
      )
    } else {
      delete router.query.user_id
      router.push(
        {
          query: { ...router.query },
        },
        undefined,
        { shallow: true }
      )
    }
  }

  const handleUserSet = () => {
    setUserListData({
      label: state.user.name,
      value: state.user.id,
      image: state.user.profile_image,
    })
    delete router.query.offset
    router.push(
      {
        query: { ...router.query, user_id: state.user.id },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleActionChange = (formState: any) => {
    const { action } = formState.values
    delete router.query.offset
    router.push(
      {
        query: { ...router.query, 'action[]': action },
      },
      undefined,
      { shallow: true }
    )
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

    delete router.query.offset
    router.push(
      {
        query: {
          ...router.query,
          create_date_start: `${year}-${month}-${day}`,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleEndDateChange = (formValues: any) => {
    const { createEndDate } = formValues.values
    const year = createEndDate.getFullYear()
    const month = toDoubleDigits(createEndDate.getMonth() + 1)
    const day = toDoubleDigits(createEndDate.getDate())

    delete router.query.offset
    router.push(
      {
        query: {
          ...router.query,
          create_date_end: `${year}-${month}-${day}`,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  let timer = null

  const handleKeywordChange = (formValues: any) => {
    const { keyword } = formValues.values

    clearTimeout(timer)
    timer = setTimeout(() => {
      delete router.query.offset
      if (!keyword) {
        delete router.query.keyword
        router.push(
          {
            pathname: '/settings/user-logs',
            query: { ...router.query },
          },
          undefined,
          { shallow: true }
        )
      } else {
        router.push(
          {
            pathname: '/settings/user-logs',
            query: { ...router.query, keyword: keyword },
          },
          undefined,
          { shallow: true }
        )
      }
    }, 2000)
  }

  const handleClear = () => {
    if (!Object.keys(router.query).length) return

    if (router.query.limit) {
      router.push(
        {
          pathname: '/settings/user-logs',
          query: { limit: router.query.limit },
        },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(
        {
          pathname: '/settings/user-logs',
        },
        undefined,
        { shallow: true }
      )
    }

    setUserListData({ label: 'すべて', value: '' })
    props.setReset(true)
  }

  useEffect(() => {
    if (!userList.length) return
    if (router.query.user_id) {
      const initialUser = userList.filter((data) => {
        return data.value === Number(router.query.user_id)
      })
      setUserListData(initialUser[0])
    }
  }, [router.isReady, userList])

  useEffect(() => {
    if (router.query['action[]']) {
      const action = router.query['action[]']

      if (Array.isArray(action)) {
        const actionList = action.map((data) => {
          return data
        })

        setInitailQuery((state) => ({
          ...state,
          action: actionList,
        }))
      } else {
        setInitailQuery((state) => ({
          ...state,
          action: [router.query['action[]']],
        }))
      }
    } else {
      setInitailQuery((state) => ({
        ...state,
        action: [],
      }))
    }
  }, [router.isReady, router.query])

  return (
    <Wrap ref={props.searchRef}>
      <SearchToggle
        height={208}
        handleClick={props.handleClick}
        form={
          <Form
            onSubmit={handleActionChange}
            initialValues={{
              createStartDate: router.query.create_date_start,
              createEndDate: router.query.create_date_end,
              action: initialQuery.action,
              keyword: router.query.keyword,
            }}
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

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Color from '../../../../../const/color'
import FormField from '../../../../molecules/form-field'
import {
  InputDate,
  InputText,
  RadioButton,
  Select,
} from '../../../../atoms/form'
import { Icon } from '../../../../atoms/icon'
import ToggleTab from '../../../../atoms/form/toggle-tab'
import ToggleTabList from '../../../../molecules/toggle-tab-list/toggle-tab-list'
import { Field, Form } from 'react-final-form'
import { composeValidators, required } from '../../../../utils/varidator'
import { Button } from '../../../../atoms/button'
import Modal from '../../../../organisms/modal'
import { LoadingIcon } from '../../../../atoms/loading-icon'
import { List, ListItem } from '../../../../molecules/list'

type Props = {
  data: any
  setData: any
  versionList: any
  windowsOsList: any
  otherOsList: any
  setOsFamily: any
  setWindowsOs: any
  setOtherOsSearchKeyword: any
  setFetchOtherOsTrigger: any
  isLoading: boolean
}

const RegisterServer: React.FC<Props> = (props) => {
  const [selectItem, setSelectItem] = useState<string>()
  const [otherOsItems, setOtherOsItems] = useState<{
    count: number
    data: any
  }>({
    count: 0,
    data: [],
  })
  const [modalIsShow, setModalIsShow] = useState<boolean>(false)
  const [os, setOs] = useState<string>()
  const [isWindows, setIsWindows] = useState<boolean>(false)
  const [isOther, setIsOther] = useState<boolean>(false)
  const [otherSearchKeyword, setOtherSearchKeyword] = useState<string>(null)
  const [otherSelectOsVersion, setOtherSelectOsVersion] = useState<{
    os_name: string
    os_version: string
    os_vendor: string
  }>({
    os_name: null,
    os_version: null,
    os_vendor: null,
  })
  const [serverData, setServerData] = useState<{
    name: string
    os_family: string
    os_release: string
    last_modified_date: string
  }>({
    name: null,
    os_family: 'amazon',
    os_release: null,
    last_modified_date: null,
  })
  const [serverWindowsData, setServerWindowsData] = useState<{
    name: string
    os_name: string
    os_version: string
    auto_update_enabled: boolean
    last_modified_date: string
  }>({
    name: null,
    os_name: null,
    os_version: null,
    auto_update_enabled: false,
    last_modified_date: null,
  })
  const [serverOtherData, setServerOtherData] = useState<{
    name: string
    os_vendor: string
    os_name: string
    os_version: string
    last_modified_date: string
  }>({
    name: null,
    os_vendor: null,
    os_name: null,
    os_version: null,
    last_modified_date: null,
  })

  const handleSubmit = () => {}

  const handleServerName = (formValue: any) => {
    const { server_name } = formValue.values

    props.setData({ ...props.data, name: server_name })
  }

  const handleOsFamily = (formValue: any) => {
    const { server_os_family } = formValue.values

    if (server_os_family === 'windows') {
      setIsOther(false)
      setIsWindows(true)
      setOs(server_os_family)
      props.setOsFamily({ os_family: server_os_family })
      props.setData({ ...serverWindowsData, name: props.data.name })
    } else if (server_os_family === 'other') {
      setIsOther(true)
      setIsWindows(false)
      setOs(server_os_family)
      props.setOsFamily({ os_family: server_os_family })
      props.setData({ ...serverOtherData, name: props.data.name })
    } else {
      setIsOther(false)
      setIsWindows(false)
      setOs(server_os_family)
      props.setOsFamily({ os_family: server_os_family })
      props.setData({
        ...serverData,
        os_family: server_os_family,
        name: props.data.name,
      })
    }
  }

  const handleVersionChange = (e) => {
    if (os === 'windows') {
      props.setData({ ...props.data, os_version: e.target.value })
    } else {
      props.setData({ ...props.data, os_release: e.target.value })
    }
  }

  const handleWindowsOsChange = (e) => {
    props.setData({ ...props.data, os_name: e.target.value })
    props.setWindowsOs(e.target.value)
  }

  const toDoubleDigits = (num) => {
    num += ''
    if (num.length === 1) {
      num = '0' + num
    }
    return num
  }

  const handleInstallDateChange = (formValue) => {
    const { installDate } = formValue.values
    const date = new Date(installDate)
    const year = date.getFullYear()
    const month = toDoubleDigits(date.getMonth() + 1)
    const day = toDoubleDigits(date.getDate())

    props.setData({
      ...props.data,
      last_modified_date: `${year}-${month}-${day}`,
    })
  }

  const handleUpdateMeans = (formValue) => {
    const { update_means } = formValue.values

    if (os === 'windows') {
      update_means === 'true'
        ? props.setData({ ...props.data, auto_update_enabled: true })
        : props.setData({ ...props.data, auto_update_enabled: false })
    }
  }

  const handleKeywordChange = (formValues: any) => {
    const { other_os_keyword } = formValues.values
    setOtherSearchKeyword(other_os_keyword)
  }

  const handleOsVersionSet = (os, version, vendor) => {
    setOtherSelectOsVersion({
      os_name: os,
      os_version: version,
      os_vendor: vendor,
    })
  }

  const handleClickOthersSelect = () => {
    props.setData({ ...props.data, ...otherSelectOsVersion })
    setModalIsShow(false)
  }

  useEffect(() => {
    if (os !== 'windows') return
    props.setData({
      ...props.data,
      os_name: props.windowsOsList[0].value,
    })
  }, [props.windowsOsList, os])

  useEffect(() => {
    if (os === 'windows') {
      props.setData({
        ...props.data,
        os_version: props.versionList[0].value,
      })
    } else if (os === 'other') {
      props.setData({
        ...props.data,
      })
    } else {
      props.setData({
        ...props.data,
        os_release: props.versionList[0].value,
      })
    }
  }, [props.versionList])

  useEffect(() => {
    props.setOtherOsSearchKeyword(otherSearchKeyword)

    const timer = setTimeout(() => {
      if (!otherSearchKeyword) {
        setOtherOsItems({ ...otherOsItems, data: [] })
      } else {
        props.setFetchOtherOsTrigger(true)
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [otherSearchKeyword])

  useEffect(() => {
    setOtherOsItems(props.otherOsList)
  }, [props.otherOsList])

  return (
    <>
      <ContentsTitle>サーバー情報</ContentsTitle>

      <Form
        onSubmit={handleSubmit}
        initialValues={{ server_os_family: 'amazon', update_means: 'false' }}
        validate={(values: any) => {
          const errors: any = {}

          errors.server_name = composeValidators(
            required('サーバー名を入力してください')
          )(values.server_name)

          return errors
        }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Field name={'server_name'} type={'text'}>
              {({ input, meta }) => (
                <FormField label={'サーバー名'} marginBottom={24} required>
                  <InputText
                    {...(input as any)}
                    size={'XL'}
                    invalidMessage={meta.error && meta.touched && meta.error}
                    onChange={(e) => {
                      input.onChange(e)
                      handleServerName(form.getState())
                    }}
                  />
                </FormField>
              )}
            </Field>

            <FormField label={'OS種別'} marginBottom={24} required>
              <RadioGroup>
                <Field
                  name={'server_os_family'}
                  type={'radio'}
                  value={'amazon'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'Amazon Linux'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'server_os_family'}
                  type={'radio'}
                  value={'redhat'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'Red Hat Enterprise Linux'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'server_os_family'}
                  type={'radio'}
                  value={'centos'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'CentOS'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'server_os_family'}
                  type={'radio'}
                  value={'debian'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'Debian'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'server_os_family'}
                  type={'radio'}
                  value={'ubuntu'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'Ubuntu'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'server_os_family'}
                  type={'radio'}
                  value={'windows'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'Windows'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field name={'server_os_family'} type={'radio'} value={'other'}>
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'その他'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleOsFamily(form.getState())
                      }}
                    />
                  )}
                </Field>
              </RadioGroup>
            </FormField>

            {isOther && otherSelectOsVersion.os_name && (
              <>
                <FieldFlex>
                  <FormField label={'OS'} marginBottom={16} required>
                    {otherSelectOsVersion.os_name}
                  </FormField>

                  <FormField label={'バージョン'} marginBottom={16} required>
                    {otherSelectOsVersion.os_version}
                  </FormField>
                </FieldFlex>

                <FormField marginBottom={24}>
                  <Button
                    type={'button'}
                    label={'OS選択'}
                    buttonType={'primary'}
                    small
                    handleClick={() => {
                      setModalIsShow(true)
                    }}
                  />
                </FormField>
              </>
            )}

            <FieldFlex>
              {isOther && !isWindows && !otherSelectOsVersion.os_name && (
                <FormField label={'OS・バージョン'} marginBottom={24} required>
                  <Button
                    type={'button'}
                    label={'OS選択'}
                    buttonType={'primary'}
                    small
                    handleClick={() => {
                      setModalIsShow(true)
                    }}
                  />
                </FormField>
              )}

              {isWindows && (
                <FormField label={'OS'} marginBottom={24} required>
                  <Select
                    defaultData={props.windowsOsList[0]}
                    data={props.windowsOsList}
                    handleClick={handleWindowsOsChange}
                  />
                </FormField>
              )}

              {!isOther && (
                <FormField label={'バージョン'} marginBottom={24} required>
                  <Select
                    defaultData={props.versionList[0]}
                    data={props.versionList}
                    handleClick={handleVersionChange}
                  />
                </FormField>
              )}
            </FieldFlex>

            <FormField
              label={'インストール日または最終更新日'}
              marginBottom={24}
            >
              <Field name={'installDate'} type={'text'} value={1}>
                {({ input, meta }) => (
                  <InputDate
                    {...input}
                    onChange={(e) => {
                      input.onChange(e)
                      handleInstallDateChange(form.getState())
                    }}
                  />
                )}
              </Field>
            </FormField>

            {isWindows && (
              <FormField label={'更新手段'} marginBottom={10}>
                <ToggleTabList>
                  <Field name={'update_means'} type={'radio'} value={'true'}>
                    {({ input, meta }) => (
                      <ToggleTab
                        {...input}
                        label={'自動更新'}
                        onChange={(e) => {
                          input.onChange(e)
                          handleUpdateMeans(form.getState())
                        }}
                      />
                    )}
                  </Field>
                  <Field name={'update_means'} type={'radio'} value={'false'}>
                    {({ input, meta }) => (
                      <ToggleTab
                        {...input}
                        label={'手動更新'}
                        onChange={(e) => {
                          input.onChange(e)
                          handleUpdateMeans(form.getState())
                        }}
                      />
                    )}
                  </Field>
                </ToggleTabList>
              </FormField>
            )}

            <Modal
              title={'OS選択'}
              isShow={modalIsShow}
              setIsShow={setModalIsShow}
              submit={{
                label: '選択',
                buttonType: 'primary',
              }}
              handleClickSubmit={handleClickOthersSelect}
              handleClickCancel={() => {
                setModalIsShow(false)
              }}
            >
              <Field name={'other_os_keyword'} type={'text'}>
                {({ input, meta }) => (
                  <InputText
                    {...(input as any)}
                    icon={<Icon.Search color={Color.TEXT.GRAY} />}
                    size={'XXL'}
                    placeholder={'OS、バージョン、ベンダーで検索'}
                    onKeyUp={(e) => {
                      input.onChange(e)
                      handleKeywordChange(form.getState())
                    }}
                  />
                )}
              </Field>

              <ListWrap>
                <ListHeader>
                  <HeaderItem>OS</HeaderItem>
                  <HeaderItem>バージョン</HeaderItem>
                  <HeaderItem>ベンダー</HeaderItem>
                </ListHeader>
                <StyledList>
                  {props.isLoading ? (
                    <>
                      {otherOsItems ? (
                        <>
                          {otherOsItems.data.length ? (
                            <>
                              {otherOsItems.data.map((data, i) => (
                                <StyledListItem
                                  key={i}
                                  handleClick={() => {
                                    setSelectItem(i)
                                    handleOsVersionSet(
                                      data['product'],
                                      data['version'],
                                      data['vendor']
                                    )
                                  }}
                                  select={selectItem === i}
                                  disabled={data['disabled']}
                                >
                                  <ContentItem>{data['product']}</ContentItem>
                                  <ContentItem>{data['version']}</ContentItem>
                                  <ContentItem>{data['vendor']}</ContentItem>
                                </StyledListItem>
                              ))}
                            </>
                          ) : (
                            <NothingText>
                              検索条件に合うソフトウェアはありませんでした。
                            </NothingText>
                          )}
                        </>
                      ) : (
                        <NothingText>
                          検索条件に合うソフトウェアはありませんでした。
                        </NothingText>
                      )}
                    </>
                  ) : (
                    <LoadingIcon />
                  )}
                </StyledList>
              </ListWrap>
              <Text>
                検索結果 {otherOsItems.count} 件中{' '}
                {otherOsItems.data.length ? 1 : 0} 〜 {otherOsItems.data.length}{' '}
                件を表示
              </Text>
            </Modal>
          </form>
        )}
      />
    </>
  )
}

const ContentsTitle = styled.div`
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
`
const RadioGroup = styled.div`
  display: flex;

  > * {
    margin-right: 24px;
  }
`
const FieldFlex = styled.div`
  display: flex;

  > * {
    margin-right: 8px;
  }
`
const Help = styled.div<{ marginBottom?: number }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${marginBottom}px` : 0};

  a {
    margin-left: 4px;
    font-size: 14px;
    color: ${Color.PRIMARY._500};
    text-decoration: underline;
  }
`
const ListWrap = styled.div`
  min-width: 560px;
  margin-top: 16px;
`
const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 136px 136px 1fr;
  border-bottom: 1px solid ${Color.COMPONENT.BORDER};
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const HeaderItem = styled.div`
  margin: 8px 16px;
`
const StyledList = styled(List)`
  height: 460px;
  overflow-y: scroll;
  padding: 8px 0;
  line-height: 1.5;
`
const StyledListItem = styled(ListItem)<{ select?: boolean }>`
  display: grid;
  grid-template-columns: 136px 136px 1fr;
  box-shadow: none;
  cursor: pointer;
  font-size: 14px;
  word-break: break-word;

  ${({ select }) =>
    select &&
    `
    outline: 2px solid ${Color.PRIMARY._500};
    outline-offset: -2px;
    background: ${Color.COMPONENT.WHITE_HOVER};
    `}

  > div {
    padding-right: 8px;
  }
`
const ContentItem = styled.div``
const NothingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
`
const Text = styled.p`
  position: absolute;
  bottom: 44px;
  color: ${Color.TEXT.BLACK};
  font-size: 14px;
`

export default RegisterServer

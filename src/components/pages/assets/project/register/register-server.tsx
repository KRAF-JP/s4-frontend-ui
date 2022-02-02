import React, { useState } from 'react'
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

type Props = {
  data: any
  setData: any
  versionList: any
  windowsOsList: any
  setOsFamily: any
  setWindowsOs: any
}

const RegisterServer: React.FC<Props> = (props) => {
  const [isWindows, setIsWindows] = useState<boolean>(false)
  const [isOther, setIsOther] = useState<boolean>(false)
  const [isOtherData, setIsOtherData] = useState<any>()

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
      props.setOsFamily({ os_family: server_os_family })
    } else if (server_os_family === 'other') {
      setIsOther(true)
      setIsWindows(false)
    } else {
      setIsOther(false)
      setIsWindows(false)
      props.setOsFamily({ os_family: server_os_family })
    }

    props.setData({ ...props.data, os_family: server_os_family })
  }

  const handleVersionChange = (e) => {
    props.setData({ ...props.data, os_release: e.target.value })
  }

  const handleWindowsOsChange = (e) => {
    props.setData({ ...props.data, os_family: e.target.value })
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

  return (
    <>
      <ContentsTitle>サーバー情報</ContentsTitle>

      <Form
        onSubmit={handleSubmit}
        initialValues={{ server_os_family: 'amazon' }}
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
                      labelName={'REDHAT Linux'}
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
                      labelName={'Debian Linux'}
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
                      labelName={'Ubuntu Linux'}
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

            {isOther && isOtherData && (
              <FieldFlex>
                <FormField label={'OS'} marginBottom={24} required>
                  OS
                </FormField>

                <FormField label={'バージョン'} marginBottom={24} required>
                  バージョン
                </FormField>
              </FieldFlex>
            )}

            <FieldFlex>
              {isOther && !isWindows && (
                <FormField label={'OS・バージョン'} marginBottom={24} required>
                  <Button
                    type={'button'}
                    label={'OS選択'}
                    buttonType={'primary'}
                    small
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
              marginBottom={10}
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
              <Help marginBottom={24}>
                <Icon.Question color={Color.PRIMARY._500} />
                <Link href={''}>
                  <a target={'_blank'}>最終更新日の確認方法</a>
                </Link>
              </Help>
            )}

            {isWindows && (
              <FormField label={'更新手段'} marginBottom={10}>
                <ToggleTabList>
                  <ToggleTab label={'自動更新'} />
                  <ToggleTab label={'手動更新'} />
                </ToggleTabList>
              </FormField>
            )}

            {isWindows && (
              <Help>
                <Icon.Question color={Color.PRIMARY._500} />
                <Link href={''}>
                  <a target={'_blank'}>更新手段の確認方法</a>
                </Link>
              </Help>
            )}
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

export default RegisterServer

import React from 'react'
import styled from 'styled-components'
import Color from '../../../../../const/color'
import FormField from '../../../../molecules/form-field'
import { InputText, RadioButton } from '../../../../atoms/form'
import { Field, Form } from 'react-final-form'
import { composeValidators, required } from '../../../../utils/varidator'
import { Button } from '../../../../atoms/button'
import { SearchCheckbox } from '../../../../atoms/search-checkbox'

type Props = {
  data: any
  setData: any
}

const RegisterProject: React.FC<Props> = (props) => {
  const handleSubmit = () => {}

  const handleProjectName = (formValue: any) => {
    const { project_name } = formValue.values

    props.setData({ ...props.data, name: project_name })
  }

  const handleEnvironment = (formValue: any) => {
    const { project_environment } = formValue.values

    props.setData({ ...props.data, platform: project_environment })
  }

  return (
    <>
      <ContentsTitle>プロジェクト情報</ContentsTitle>

      <Form
        onSubmit={handleSubmit}
        validate={(values: any) => {
          const errors: any = {}

          errors.project_name = composeValidators(
            required('プロジェクト名を入力してください')
          )(values.project_name)

          return errors
        }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Field name={'project_name'} type={'text'}>
              {({ input, meta }) => (
                <FormField label={'プロジェクト名'} marginBottom={24} required>
                  <InputText
                    {...(input as any)}
                    size={'XL'}
                    invalidMessage={meta.error && meta.touched && meta.error}
                    onChange={(e) => {
                      input.onChange(e)
                      handleProjectName(form.getState())
                    }}
                  />
                </FormField>
              )}
            </Field>

            <FormField label={'環境'}>
              <RadioGroup>
                <Field
                  name={'project_environment'}
                  type={'radio'}
                  value={'aws'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'AWS'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleEnvironment(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'project_environment'}
                  type={'radio'}
                  value={'azure'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'azure'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleEnvironment(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'project_environment'}
                  type={'radio'}
                  value={'gcp'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'GCP'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleEnvironment(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'project_environment'}
                  type={'radio'}
                  value={'salesforce'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'salesforce'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleEnvironment(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'project_environment'}
                  type={'radio'}
                  value={'onpremises'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'オンプレミス'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleEnvironment(form.getState())
                      }}
                    />
                  )}
                </Field>
                <Field
                  name={'project_environment'}
                  type={'radio'}
                  value={'other'}
                >
                  {({ input, meta }) => (
                    <RadioButton
                      {...input}
                      labelName={'その他'}
                      small
                      onChange={(e) => {
                        input.onChange(e)
                        handleEnvironment(form.getState())
                      }}
                    />
                  )}
                </Field>
              </RadioGroup>
            </FormField>
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

export default RegisterProject

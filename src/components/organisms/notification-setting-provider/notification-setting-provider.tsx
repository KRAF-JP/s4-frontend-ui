import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import Color from '../../../const/color'
import { Button } from '../../atoms/button'
import { Icon } from '../../atoms/icon'
import { InputText, ToggleButton } from '../../atoms/form'
import FormField from '../../molecules/form-field'
import FormFieldMask from '../../molecules/form-field-mask'
import {
  composeValidators,
  required,
  url,
  email,
  number,
} from '../../utils/varidator'
import GlobalContext from '../../../store/context'
import { useOrganization } from '../../../hooks/use-organization'
import Modal from '../../organisms/modal'
import { CardInner } from '../../atoms/card'

type Props = {}

const NotificationSettingProvider: React.FC<Props> = (props) => {
  const { state } = useContext(GlobalContext)
  const [isActiveSlack, setIsActiveSlack] = useState<boolean>(
    state.organization.notification_slack_enabled
  )
  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(
    state.organization.notification_email_enabled
  )
  const [isShowSlack, setIsShowSlack] = useState<boolean>()
  const [isShowEmail, setIsShowEmail] = useState<boolean>()
  const [isShowModal, setIsShowModal] = useState<boolean>()
  const [isShowModalSubmit, setIsShowModalSubmit] = useState<boolean>(true)
  const {
    setTarget,
    setPutTrigger,
    setSlackSendTrigger,
    setEmailSendTrigger,
    setEmailVerificationSendTrigger,
    setEmailVerificationTrigger,
  } = useOrganization()

  const handleSlackEnable = async () => {
    setIsActiveSlack(!isActiveSlack)
    setTarget({ notification_slack_enabled: !isActiveSlack })
    setPutTrigger(true)
  }

  const handleEmailEnable = () => {
    setIsActiveEmail(!isActiveEmail)
    setTarget({ notification_email_enabled: !isActiveEmail })
    setPutTrigger(true)
  }

  const handleSlackShow = () => {
    setIsShowSlack(!isShowSlack)
  }

  const handleEmailShow = () => {
    setIsShowEmail(!isShowEmail)
  }

  const handleSlackSubmit = async (formValues: any) => {
    const { url } = formValues
    let target
    if (url) {
      target = { notification_slack_url: url }
    } else {
      target = { notification_slack_url: null }
    }
    setIsShowSlack(false)
    if (url !== state.organization.notification_slack_url) {
      setTarget(target)
      setPutTrigger(true)
    }
  }

  const handleMailSubmit = async (formValues: any) => {
    const { email } = formValues
    let target
    if (email) {
      target = { notification_email: email }
    } else {
      target = { notification_email: null }
    }
    setIsShowEmail(false)
    if (email !== state.organization.notification_email) {
      setTarget(target)
      setPutTrigger(true)
    }
  }

  const handleSlackSendTest = async (formValues) => {
    const { url } = formValues.values

    if (url) {
      setTarget({
        notification_slack_url: state.organization.notification_slack_url,
      })
      setSlackSendTrigger(true)
    }
  }

  const handleVerificationSend = async () => {
    setEmailVerificationSendTrigger(true)
    setIsShowModal(true)
  }

  const handleEmailSendTest = async () => {
    setEmailSendTrigger(true)
  }

  const handleClickModalCancel = () => {
    setIsShowModal(false)
  }

  const handleEmailVerificationSubmit = async (form) => {
    const { verificationCode } = form.getState().values
    const data = {
      verify_code: verificationCode,
    }
    form.reset()
    setTarget(data)
    setEmailVerificationTrigger(true)
    setIsShowModal(false)
  }

  useEffect(() => {
    setIsActiveSlack(state.organization.notification_slack_enabled)
    setIsActiveEmail(state.organization.notification_email_enabled)
  }, [state])

  return (
    <>
      <Item>
        <Header>
          <Title>Slack通知</Title>
          <ToggleButton
            checked={isActiveSlack}
            name={'slackNotification'}
            onChange={handleSlackEnable}
          />
        </Header>
        <Form
          onSubmit={handleSlackSubmit}
          initialValues={{
            url: state.organization.notification_slack_url,
          }}
          validate={(values: any) => {
            const errors: any = {}

            errors.url = composeValidators(url)(values.url)

            return errors
          }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Content isShow={isActiveSlack}>
                <Field name={'url'} type={'text'}>
                  {({ input, meta }) => (
                    <FormField label={'Slack通知URL（Webhhook URL）'}>
                      <FormFieldMask
                        value={input.value}
                        isShow={isShowSlack}
                        handleClick={handleSlackShow}
                      >
                        <InputText
                          {...(input as any)}
                          type={'text'}
                          name={'url'}
                          size={'XL'}
                          invalidMessage={
                            meta.error && meta.touched && meta.error
                          }
                          disabled={!isActiveSlack}
                        />

                        <Button
                          type={'submit'}
                          label={'保存'}
                          buttonType={'primary'}
                          small
                          disabled={!isActiveSlack}
                        />
                      </FormFieldMask>
                      {input.value && (
                        <SeparateWrap isShow={isShowSlack}>
                          <Button
                            type={'button'}
                            label={'テスト送信'}
                            buttonType={'secondary'}
                            small
                            handleClick={() => {
                              handleSlackSendTest(form.getState())
                            }}
                          />
                        </SeparateWrap>
                      )}
                    </FormField>
                  )}
                </Field>
              </Content>
            </form>
          )}
        />
      </Item>

      <Item>
        <Header>
          <Title>メール通知</Title>
          <ToggleButton checked={isActiveEmail} onChange={handleEmailEnable} />
        </Header>
        <Form
          onSubmit={handleMailSubmit}
          initialValues={{ email: state.organization.notification_email }}
          validate={(values: any) => {
            const errors: any = {}

            errors.email = composeValidators(email)(values.email)
            errors.verificationCode = composeValidators(number)(
              values.verificationCode
            )

            return errors
          }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Content isShow={isActiveEmail}>
                <Field name={'email'} type={'text'}>
                  {({ input, meta }) => (
                    <FormField label={'通知用メールアドレス'}>
                      {!isShowEmail && (
                        <SeparateWrap isShow={isShowEmail}>
                          {input.value && (
                            <>
                              {state.organization
                                .notification_email_verified_at ? (
                                <Icon.StatusDone />
                              ) : (
                                <Icon.StatusBacklog />
                              )}
                            </>
                          )}
                        </SeparateWrap>
                      )}

                      <FormFieldMask
                        value={input.value}
                        isShow={isShowEmail}
                        handleClick={handleEmailShow}
                      >
                        <InputText
                          {...(input as any)}
                          type={'text'}
                          name={'email'}
                          size={'XL'}
                          invalidMessage={
                            meta.error && meta.touched && meta.error
                          }
                          disabled={!isActiveEmail}
                        />

                        <Button
                          label={'保存'}
                          buttonType={'primary'}
                          small
                          disabled={!isActiveEmail}
                        />
                      </FormFieldMask>
                      {input.value && (
                        <>
                          {state.organization.notification_email_verified_at ? (
                            <SeparateWrap isShow={isShowEmail}>
                              <Button
                                type={'button'}
                                label={'テスト送信'}
                                buttonType={'secondary'}
                                small
                                handleClick={handleEmailSendTest}
                              />
                            </SeparateWrap>
                          ) : (
                            <SeparateWrap isShow={isShowEmail}>
                              <Button
                                type={'button'}
                                label={'認証メール送信'}
                                buttonType={'primary'}
                                small
                                handleClick={handleVerificationSend}
                              />
                            </SeparateWrap>
                          )}
                        </>
                      )}
                    </FormField>
                  )}
                </Field>

                <Modal
                  title={'メールアドレス認証'}
                  isShow={isShowModal}
                  setIsShow={setIsShowModal}
                  submit={{
                    label: '認証',
                    buttonType: 'primary',
                    disabled: isShowModalSubmit,
                  }}
                  handleClickCancel={handleClickModalCancel}
                  handleClickSubmit={() => {
                    handleEmailVerificationSubmit(form)
                  }}
                >
                  <ModalDescription>
                    {state.organization.notification_email}
                    宛に認証メールを送信しました。
                    <br />
                    ご確認の上、メールに記載の認証コードを入力してください。
                  </ModalDescription>
                  <Field name={'verificationCode'} type={'text'}>
                    {({ input, meta }) => (
                      <FormField label={'認証コード'} marginBottom={24}>
                        <InputText
                          {...(input as any)}
                          size={'XXL'}
                          onChange={(e) => {
                            input.onChange(e)
                            if (
                              !e.target.value ||
                              !e.target.value.match(/^[0-9]+$/)
                            ) {
                              setIsShowModalSubmit(true)
                            } else {
                              setIsShowModalSubmit(false)
                            }
                          }}
                          invalidMessage={
                            meta.error && meta.touched && meta.error
                          }
                        />
                      </FormField>
                    )}
                  </Field>
                  <ResendEmail>認証コードを再送する</ResendEmail>
                </Modal>
              </Content>
            </form>
          )}
        />
      </Item>
    </>
  )
}

const Item = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${Color.COMPONENT.BORDER};

  &:last-of-type {
    border: none;
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`
const Title = styled.div`
  margin-right: 24px;
  font-size: 16px;
  font-weight: 500;
`
const Content = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`
const SeparateWrap = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'none' : 'block')};
`
const ModalDescription = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.71;
`
const ResendEmail = styled.div`
  font-size: 14px;
  color: ${Color.PRIMARY._500};
  text-decoration: underline;
`

export default NotificationSettingProvider

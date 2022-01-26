import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Button } from '../../atoms/button'
import { Icon } from '../../atoms/icon'
import { IconImage } from '../../atoms/icon-image'
import { IconButton } from '../../atoms/icon-button'
import { InputText } from '../../atoms/form'
import FormField from '../../molecules/form-field'
import ProfileImage from '../../molecules/profile-image'
import HistoryList from '../../molecules/history-list'
import PopupCard from '../../molecules/popup-card'
import GlobalContext from '../../../store/context'
import FormFieldMask from '../../molecules/form-field-mask'
import Skeleton from 'react-loading-skeleton'
import { useNotification } from '../../../hooks/pages/use-notification'
import { useUser } from '../../../hooks/use-user'
import { Form, Field } from 'react-final-form'
import { composeValidators, required } from '../../utils/varidator'
import { useUserLogout } from '../../../hooks/use-user-logout'
import Modal from '../modal'
import { FileUpload } from '../settings'
import { useUploadImage } from '../../../hooks/use-upload-image'

type Props = {}

const PersonalNav: React.FC<Props> = (props) => {
  const [isAlert, setIsAlert] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isPersonalSetting, setIsPersonalSetting] = useState(false)
  const notificationElement = useRef(null)
  const personalSettingElement = useRef(null)
  const documentClickHandler = useRef(null)
  const { notifications } = useNotification()
  const { state } = useContext(GlobalContext)
  const { setPutTrigger, setTarget } = useUser()
  const { setPostUserLogoutTrigger } = useUserLogout()
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isShowSelect, setIsSelect] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<string>('')
  const [uploadFile, setUploadFile] = useState()
  const { setUserPostTrigger, setUserDeleteTrigger, setData } = useUploadImage()
  const handleShowHistory = () => {
    setIsAlert(true)
    setIsPersonalSetting(false)
    document.addEventListener('click', documentClickHandler.current)
  }

  const handleShowPersonalSetting = () => {
    setIsPersonalSetting(true)
    setIsAlert(false)
    document.addEventListener('click', documentClickHandler.current)
  }

  const handleIsShowName = () => {
    setIsShow(!isShow)
  }

  const removeDocumentClickHandler = () => {
    document.removeEventListener('click', documentClickHandler.current)
  }

  const handleSubmit = async (formValues: any) => {
    const { firstname, lastname } = formValues
    const target = { firstname: firstname, lastname: lastname }
    setIsPersonalSetting(false)

    if (target) {
      setTarget(target)
      setPutTrigger(true)
    }
  }

  const handleUserLogout = () => {
    setPostUserLogoutTrigger(true)
  }

  const handleFileUploadCancel = () => {
    setImageFile('')
    setIsShowModal(false)
  }

  const handleFileDelete = () => {
    setUserDeleteTrigger(true)
    setIsShowModal(false)
  }

  const handleFileUploadSubmit = () => {
    setData(uploadFile)
    setUserPostTrigger(true)
    setIsShowModal(false)
  }

  useEffect(() => {
    documentClickHandler.current = (e) => {
      if (
        notificationElement.current.contains(e.target) ||
        personalSettingElement.current.contains(e.target)
      )
        return

      setIsAlert(false)
      setIsPersonalSetting(false)
      removeDocumentClickHandler()
    }
  }, [])

  return (
    <Wrap>
      <PersonalNavList>
        <PersonalNavItem ref={notificationElement}>
          <IconButton handleClick={handleShowHistory} focus={isAlert}>
            <Icon.Bell />
          </IconButton>
          {state.notification.is_newly !== 0 && (
            <Newly>{state.notification.is_newly}</Newly>
          )}
          <PopupCard isShow={isAlert} title={'通知'}>
            {notifications.length !== 0 ? (
              <HistoryList items={notifications} />
            ) : (
              '通知はありません。'
            )}
          </PopupCard>
        </PersonalNavItem>
        <PersonalNavItem ref={personalSettingElement}>
          {state.isLoadingUser || (
            <Skeleton
              baseColor={Color.COMPONENT.BORDER}
              width={40}
              height={40}
              circle
            />
          )}
          <IconImage
            handleClick={handleShowPersonalSetting}
            src={state.user.profile_image}
            size={36}
          />
          <PopupCard
            isShow={isPersonalSetting}
            title={'ユーザー情報'}
            width={332}
          >
            <ProfileImageBox
              onClick={() => {
                setIsSelect(true)
              }}
            >
              <ProfileImage src={state.user.profile_image} />
            </ProfileImageBox>
            <Options isShow={isShowSelect}>
              <OptionItem
                onClick={() => {
                  setIsSelect(false)
                  setIsShowModal(true)
                }}
              >
                写真を変更
              </OptionItem>
              <OptionItem
                onClick={() => {
                  setIsSelect(false)
                  handleFileDelete()
                }}
              >
                削除
              </OptionItem>
            </Options>
            <Modal
              title={''}
              isShow={isShowModal}
              submit={{
                label: '保存',
                buttonType: 'primary',
                disabled: false,
              }}
              handleClickCancel={handleFileUploadCancel}
              handleClickSubmit={handleFileUploadSubmit}
            >
              <FileUpload
                image={imageFile}
                setImage={setImageFile}
                uploadFile={setUploadFile}
              />
            </Modal>
            <Form
              onSubmit={handleSubmit}
              initialValues={{
                firstname: state.user.firstname,
                lastname: state.user.lastname,
              }}
              validate={(values: any) => {
                const errors: any = {}

                errors.lastname = composeValidators(
                  required('姓を入力してください')
                )(values.lastname)

                errors.firstname = composeValidators(
                  required('名を入力してください')
                )(values.firstname)

                return errors
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <FieldLabel isShow={isShow}>姓名</FieldLabel>
                  <StyledFormFieldMask
                    value={state.user.name}
                    isShow={isShow}
                    handleClick={handleIsShowName}
                  >
                    <FormFlex>
                      <FormField label={'姓'}>
                        <Field name={'lastname'} type={'text'}>
                          {({ input, meta }) => (
                            <InputText
                              {...(input as any)}
                              size={'M'}
                              invalidMessage={
                                meta.error && meta.touched && meta.error
                              }
                            />
                          )}
                        </Field>
                      </FormField>
                      <FormField label={'名'}>
                        <Field name={'firstname'} type={'text'}>
                          {({ input, meta }) => (
                            <InputText
                              {...(input as any)}
                              size={'M'}
                              invalidMessage={
                                meta.error && meta.touched && meta.error
                              }
                            />
                          )}
                        </Field>
                      </FormField>
                      <Button label={'保存'} buttonType={'primary'} small />
                    </FormFlex>
                  </StyledFormFieldMask>
                </form>
              )}
            />
            <FormField label={'メールアドレス'} marginBottom={24}>
              {state.user.email}
            </FormField>

            <FormField label={'権限'} marginBottom={24}>
              {state.user.role === 1
                ? 'スーパーユーザー'
                : state.user.role === 2
                ? '管理者'
                : '一般'}
            </FormField>

            <ButtonGroup>
              <Button
                label={'ログアウト'}
                buttonType={'secondary'}
                handleClick={handleUserLogout}
                small
              />
            </ButtonGroup>
          </PopupCard>
        </PersonalNavItem>
      </PersonalNavList>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
const PersonalNavList = styled.ul`
  display: flex;
`
const PersonalNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  border-radius: 50%;
  background: #fff;
  box-shadow: ${Color.ELEVATION.L};
`
const ProfileImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`
const FormFlex = styled.div`
  display: flex;
  align-items: flex-end;

  > div {
    margin-right: 8px;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`
const FieldLabel = styled.p<{ isShow: boolean }>`
  font-size: 14px;
  color: ${Color.TEXT.GRAY};
  line-height: 1.43;
  display: ${({ isShow }) => (isShow ? 'none' : 'block')};
  width: 100%;
`
const StyledFormFieldMask = styled(FormFieldMask)`
  margin-bottom: 10px;
`
const Newly = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${Color.COMPONENT.NOTICE};
  font-size: 12px;
  font-weight: 500;
  color: ${Color.TEXT.WHITE};
`
const Options = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 30%;
  left: 45%;
  width: 160px;
  max-height: 200px;
  padding: 8px;
  border-radius: 8px;
  background: ${Color.COMPONENT.SURFACE};
  box-shadow: ${Color.ELEVATION.L};
  scroll-behavior: smooth;
  z-index: 10;
`
const OptionItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 8px;
  background: Color.COMPONENT.WHITE_HOVER : Color.COMPONENT.SURFACE};
  font-size: 14px;
  cursor: pointer;
  line-height: 1.4;

  &:last-child {
    margin: 0;
  }

  &:hover {
    background: ${Color.COMPONENT.WHITE_HOVER};
  }
`
export default PersonalNav

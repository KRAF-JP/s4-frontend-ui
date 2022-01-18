import React, { useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import Modal from '../../organisms/modal/modal'
import { FileUpload } from '../../organisms/settings'
import GlobalContext from '../../../store/context'
import { apiClient } from '../../../hooks/api-client'

type Props = {
  src: string
  handleClick?(e: React.MouseEvent<HTMLElement>): void
  handleClickDelete?(e: React.MouseEvent<HTMLElement>): void
}

const ProfileImage: React.FC<Props> = (props) => {
  const [isHover, setIsHover] = useState(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isShowSelect, setIsSelect] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<string>('')
  const [uploadFile, setUploadFile] = useState()
  const { dispatch } = useContext(GlobalContext)

  const handleFileUploadCancel = () => {
    setImageFile('')
    setIsShowModal(false)
  }

  const handleFileDelete = () => {
    apiClient
      .delete('/user/profile_image')
      .then((res) => {
        setIsShowModal(false)
        dispatch({
          type: 'update_user_profile_image',
          payload: imageFile,
        })
      })
      .catch((err) => {
        // #TODO sentry
      })
  }

  const handleFileUploadSubmit = () => {
    const data = new FormData()
    data.append('profile_image', uploadFile)
    apiClient
      .post('/user/profile_image', data, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((response) => {
        setIsShowModal(false)
        dispatch({
          type: 'update_user_profile_image',
          payload: response.data,
        })
      })
      .catch((err) => {
        // #TODO sentry
      })
  }

  return (
    <ProfileImageWrap>
      <ImageWrap
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          setIsSelect(true)
        }}
      >
        {props.src ? (
          <img src={`data:image/png;base64,${props.src}`} alt="" />
        ) : (
          <>No Image</>
        )}

        {props.handleClick && (
          <HoverImage isHover={isHover}>
            <Icon.Camera color={Color.COMPONENT.SURFACE} size={40} />
          </HoverImage>
        )}
      </ImageWrap>
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
    </ProfileImageWrap>
  )
}

const ProfileImageWrap = styled.div`
  position: relative;
`
const ImageWrap = styled.div<{ onClick?: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background: ${Color.SEVERITY.INFO};
  font-size: 24px;
  color: ${Color.TEXT.GRAY};
  cursor: pointer;
  overflow: hidden;

  img {
    width: 160px;
    height: 160px;
    border: none;
    object-fit: cover;
  }
`
const HoverImage = styled.div<{ isHover?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${({ isHover }) => (isHover ? 1 : 0)};
  transition: opacity 0.2s ease-out;
`
const Options = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 80%;
  left: 35%;
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

export default ProfileImage

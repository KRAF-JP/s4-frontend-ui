import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { useDropzone } from 'react-dropzone'

type Props = {
  image: string
  setImage: any
  uploadFile: any
}

const FileUpload: React.FC<Props> = (props) => {
  const accept = 'image/png, image/jpg, image/jpeg, image/gif'
  const onDrop = useCallback((acceptedFiles) => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL
    if (acceptedFiles.length != 0)
      props.setImage(createObjectURL(acceptedFiles[0]))
    props.uploadFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  })

  return (
    <FileUploadWrap
      {...getRootProps()}
      isActive={isDragActive}
      isEnable={props.image}
    >
      <input {...getInputProps()} />
      {props.image ? (
        <ImageWrap>
          <img src={props.image} alt="" />
        </ImageWrap>
      ) : (
        <Text>
          画像ファイルをドロップ
          <br />
          またはクリックでファイルを選択
        </Text>
      )}
    </FileUploadWrap>
  )
}

const FileUploadWrap = styled.div<{ isActive: boolean; isEnable: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  border: 2px dashed
    ${({ isActive }) => (isActive ? Color.PRIMARY._500 : '#b8c5db')};
  ${({ isEnable }) => isEnable && `border: none;`}
  text-align: center;
  cursor: pointer;
`
const ImageWrap = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Text = styled.div``

export default FileUpload

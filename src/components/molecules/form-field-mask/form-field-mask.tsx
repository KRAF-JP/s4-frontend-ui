import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '../../atoms/icon'
import { IconButton } from '../../atoms/icon-button'

type Props = {
  value?: string
  isShow: boolean
  children: React.ReactNode
  handleClick?(e: React.MouseEvent<HTMLElement>): void
}

const FormFieldMask: React.FC<Props> = (props) => {
  return (
    <Wrap>
      <Mask isShow={props.isShow}>
        {props.value && <Text>{props.value}</Text>}
        <IconButton handleClick={props.handleClick}>
          <Icon.Pen />
        </IconButton>
      </Mask>
      <Form isShow={props.isShow}>{props.children}</Form>
    </Wrap>
  )
}
const Wrap = styled.div``
const Mask = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'none' : 'flex')};
  align-items: center;
`
const Text = styled.div`
  max-width: 320px;
  height: 20px;
  margin-right: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`
const Form = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};

  > div {
    margin: 0 8px 24px 0;
  }
`

export default FormFieldMask

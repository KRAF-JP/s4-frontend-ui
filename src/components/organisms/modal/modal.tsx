import React, { useState } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Button } from '../../atoms/button/'

type Props = {
  title?: string
  submit?: {
    label: string
    buttonType: 'primary' | 'secondary' | 'danger' | string
    disabled?: boolean
  }
  isShow?: boolean
  setIsShow?: any
  children?: React.ReactNode
  handleClickCancel?(e: React.MouseEvent<HTMLElement>): void
  handleClickSubmit?(e: React.MouseEvent<HTMLElement>): void
}

const Modal: React.FC<Props> = (props) => {
  return (
    <Overlay isShow={props.isShow} onClick={() => props.setIsShow(false)}>
      <Block onClick={(e) => e.stopPropagation()}>
        {props.title && <Header>{props.title}</Header>}
        {props.children && <Content>{props.children}</Content>}
        <Footer>
          <Button
            label={'キャンセル'}
            buttonType={'secondary'}
            handleClick={props.handleClickCancel}
            small={true}
          />
          {props.submit && (
            <Button
              label={props.submit.label}
              buttonType={props.submit.buttonType}
              disabled={props.submit.disabled}
              handleClick={props.handleClickSubmit}
              small={true}
            />
          )}
        </Footer>
      </Block>
    </Overlay>
  )
}

const Overlay = styled.div<{ isShow: boolean }>`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  visibility: hidden;

  transition: opacity 0.3s, visibility 0.3s;
  ${({ isShow }) =>
    isShow &&
    `
    visibility: visible;
    opacity: 1;
  `}
`
const Block = styled.div`
  z-index: 101;
  min-width: 400px;
  background: ${Color.COMPONENT.SURFACE};
  padding: 36px 40px;
  border-radius: 16px;
  box-shadow: ${Color.ELEVATION.XL};
  @media (max-width: 768px) {
    margin: 0.5em;
  }
`
const Header = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 24px;
`
const Content = styled.div`
  line-height: 1.71;
`
const Footer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 24px;
  flex-wrap: wrap;
  button {
    &:not(:first-child) {
      margin-left: 8px;
    }
  }
`

export default Modal

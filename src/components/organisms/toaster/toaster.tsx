import React, { useState, useContext, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import GlobalContext from '../../../store/context'

type Props = {}

const Toaster: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(GlobalContext)

  const handleClick = () => {
    dispatch({ type: 'update_toaster', payload: { isShow: false } })
  }

  useEffect(() => {
    if (!state.isToaster.isShow) return
    setTimeout(() => {
      dispatch({ type: 'update_toaster', payload: { isShow: false } })
    }, 5000)
  }, [state.isToaster.isShow])

  return (
    <Wrap isShow={state.isToaster.isShow} type={state.isToaster.type}>
      <TextWrap>
        <IconWrap>
          {state.isToaster.type === 'success' && (
            <Icon.CircleCheck size={24} color={Color.TEXT.WHITE} />
          )}
          {state.isToaster.type === 'cation' && (
            <Icon.Cation size={24} color={Color.TEXT.WHITE} />
          )}
          {state.isToaster.type === 'error' && (
            <Icon.Error size={24} color={Color.TEXT.WHITE} />
          )}
        </IconWrap>
        <Text>{state.isToaster.text}</Text>
      </TextWrap>
      <Close onClick={handleClick}>
        <Icon.Cross size={16} color={Color.TEXT.WHITE} />
      </Close>
      <Indicator />
    </Wrap>
  )
}

const bgColor = (props) => {
  if (props.type === 'success') {
    return `
      background: ${Color.PRIMARY._500};
  `
  } else if (props.type === 'cation') {
    return `
      background: ${Color.COMPONENT.NOTICE};
  `
  } else if (props.type === 'error') {
    return `
      background: ${Color.COMPONENT.DANGER};
  `
  } else {
    return
  }
}

const anime = keyframes`
  0% {
    display: flex;
    transform: translate(-50%, -200%);
  }
  10% {
    display: flex;
    transform: translate(-50%, 0);
  }
  90% {
    display: flex;
    transform: translate(-50%, 0);
    opacity: 1;
  }
  100% {
    display: none;
    transform: translate(-50%, 0);
    opacity: 0;
  }
`
const indicatorLine = keyframes`
  0% {
    width: 100%;
  }
  10% {
    width: 100%;
  }
  90% {
    width: 0;
  }
  100% {
    width: 0;
  }
`
const Wrap = styled.div<{ isShow: boolean; type: string }>`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 16px;
  left: 50%;
  width: 660px;
  height: 56px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: ${Color.ELEVATION.XL};
  transform: translate(-50%, -200%);
  animation: ${anime} 5s ease-in-out;
  z-index: 1000;
  overflow: hidden;
  ${bgColor};
`
const TextWrap = styled.div`
  display: flex;
  align-items: center;
`
const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Color.TEXT.WHITE};
`
const Close = styled.div`
  cursor: pointer;
`
const IconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`
const Indicator = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: ${Color.COMPONENT.FORM_BORDER};
  animation: ${indicatorLine} 5s linear;
`

export default Toaster

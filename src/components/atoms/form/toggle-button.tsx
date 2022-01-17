import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'

type Props = {
  checked?: boolean
  onChange?: (e: React.SyntheticEvent) => void
  id?: string
  value?: string
  name?: string
  isInvalid?: boolean
}

const ToggleButton: React.FC<Props> = (props) => {
  return (
    <StyledToggleButton>
      <Marker checked={props.checked}>
        <On checked={props.checked}>ON</On>
        <Off checked={props.checked}>OFF</Off>
      </Marker>
      <InnerInput type={'checkbox'} {...props} />
    </StyledToggleButton>
  )
}

const StyledToggleButton = styled.label`
  width: 64px;
  height: 32px;
  cursor: pointer;
`
const Marker = styled.div<{ checked?: boolean }>`
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 16px;
  background: ${Color.COMPONENT.TOGGLE};
  transition: all 0.2s ease-out;

  &::before {
    position: absolute;
    top: 50%;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: ${Color.COMPONENT.SURFACE};
    content: '';
    transform: translate(0, -50%);
    transition: all 0.2s ease-out;
  }

  ${({ checked }) =>
    checked &&
    `
    background: ${Color.PRIMARY._500};
    
    &::before {
      left: 36px;
    }
  `}
`
const On = styled.p<{ checked?: boolean }>`
  display: block;
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 12px;
  font-weight: 700;
  color: ${Color.TEXT.WHITE};
  transform: translate(0, -50%);
  opacity: 0;
  transition: opacity 0.2s ease-out;
  line-height: 1;

  ${({ checked }) =>
    checked &&
    `
    opacity: 1;
  `}
`
const Off = styled.p<{ checked?: boolean }>`
  display: block;
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 12px;
  font-weight: 700;
  color: ${Color.TEXT.WHITE};
  transform: translate(0, -50%);
  opacity: 1;
  transition: opacity 0.2s ease-out;
  line-height: 1;

  ${({ checked }) =>
    checked &&
    `
    opacity: 0;
  `}
`
const InnerInput = styled.input`
  display: none;
`

export default ToggleButton

import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'

type Props = {
  checked?: boolean
  onChange?: (e: React.SyntheticEvent) => void
  value?: string
  name?: string
  labelName: string
  icon?: React.ReactNode
}

const RadioButton: React.FC<Props> = (props) => {
  return (
    <StyledRadioButton>
      <Marker checked={props.checked} />
      {props.labelName}
      <InnerInput type={'radio'} {...props} />
    </StyledRadioButton>
  )
}

const StyledRadioButton = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`
const Marker = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border: 2px solid ${Color.COMPONENT.FORM_BORDER};
  border-radius: 12px;

  ${({ checked }) =>
    checked &&
    `
    border: 2px solid ${Color.PRIMARY._500};
    
    &::before {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      background: ${Color.PRIMARY._500};
      content: '';
    }
  `}
`
const InnerInput = styled.input`
  display: none;
`

export default RadioButton

import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../icon'

type Props = {
  checked?: boolean
  onChange?: (e: React.SyntheticEvent) => void
  id?: string
  value?: string
  name?: string
  labelName: string
  isInvalid?: boolean
}

const Checkbox: React.FC<Props> = (props) => {
  return (
    <StyledCheckbox>
      <Marker checked={props.checked} isInvalid={props.isInvalid}>
        {props.checked && <Icon.Check color={Color.TEXT.WHITE} size={16} />}
      </Marker>
      {props.labelName && <Label>{props.labelName}</Label>}
      <InnerInput type={'checkbox'} {...props} />
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`
const Marker = styled.div<{ checked?: boolean; isInvalid?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${Color.COMPONENT.FORM_BORDER};
  border-radius: 6px;
  line-height: 1;

  ${({ checked }) =>
    checked &&
    `
    border: 2px solid ${Color.PRIMARY._500};
    background: ${Color.PRIMARY._500};
  `}
`
const InnerInput = styled.input`
  display: none;
`
const Label = styled.div`
  margin-left: 8px;
`

export default Checkbox

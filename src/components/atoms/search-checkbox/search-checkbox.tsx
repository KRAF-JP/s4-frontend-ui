import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'

type Props = {
  name: string
  value: string | number
  color?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  checked?: boolean
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  handleClick?(e: React.MouseEvent<HTMLElement>): void
}

const SearchCheckbox: React.FC<Props> = (props) => {
  return (
    <Wrap>
      <input
        type="checkbox"
        name={props.name}
        value={props.value}
        checked={props.checked ?? props.checked}
        onChange={props.onChange}
      />
      <Text onClick={props.handleClick}>
        {props.color && <UrgencyBar color={props.color} />}
        {props.icon && <IconWrap>{props.icon}</IconWrap>}
        {props.children}
      </Text>
    </Wrap>
  )
}

const Wrap = styled.label`
  display: inline-block;
  border-radius: 8px;
  background: ${Color.COMPONENT.SURFACE};
  overflow: hidden;

  input {
    display: none;

    &:checked + span {
      outline: 2px solid ${Color.PRIMARY._500};
      background: ${Color.COMPONENT.WHITE_HOVER};
      outline-offset: -2px;
    }
  }
`
const Text = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${Color.COMPONENT.FORM_BORDER};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${Color.COMPONENT.WHITE_HOVER};
  }
`
const UrgencyBar = styled.div<{ color?: string }>`
  width: 8px;
  height: 16px;
  margin-right: 8px;
  border-radius: 4px;
  background: ${({ color }) => color && color};
`
const IconWrap = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
`

export default SearchCheckbox

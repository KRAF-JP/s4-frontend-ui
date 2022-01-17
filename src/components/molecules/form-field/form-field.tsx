import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'

type Props = {
  label: string
  className?: string
  children?: React.ReactNode
  marginBottom?: number
}

const FormField: React.FC<Props> = (props) => {
  return (
    <Wrap className={props.className} marginBottom={props.marginBottom}>
      <Label>{props.label}</Label>
      <ChildrenWrap>{props.children}</ChildrenWrap>
    </Wrap>
  )
}

const Wrap = styled.div<{ marginBottom?: number }>`
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px`};
  font-size: 14px;
`
const Label = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${Color.TEXT.GRAY};
  line-height: 1.43;
  display: block;
  width: 100%;
`
const ChildrenWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > * {
    margin-right: 8px;

    &:last-of-type {
      margin: 0;
    }
  }
`

export default FormField

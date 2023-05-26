import styled from 'styled-components'
import { NextPage } from 'next'
import { Color } from '../../../const/color'
import React from 'react'

type Props = {
  height?: number
  name?: string
  defaultValue?: string
  readOnly?: boolean
  value: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const CommandArea: NextPage<Props> = (props) => {
  return (
    <Wrap
      {...props}
      onChange={(e) => {
        props.onChange(e)
      }}
    ></Wrap>
  )
}

const Wrap = styled.textarea<{ height?: number }>`
  width: 100%;
  height: ${({ height }) => (height ? height : '160px')};
  margin: 16px 0;
  padding: 24px;
  background-color: ${Color.COMPONENT.TEXTAREA};
  font-size: 14px;
  color: ${Color.TEXT.WHITE};
  line-height: 1.71;

  + button {
    margin-bottom: 24px;
  }

  white-space: pre-wrap;
`
export default CommandArea

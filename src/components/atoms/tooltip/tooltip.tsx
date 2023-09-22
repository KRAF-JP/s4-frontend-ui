import styled from 'styled-components'
import Color from '../../../const/color'
import React from 'react'

type Props = {
  content: string
  className?: string
  children?: React.ReactNode
  nl2br?: boolean
}

const Tooltip: React.FC<Props> = (props) => {
  const nl2br = (content) => {
    if (!content) return
    return content.split('\n').map((item, i) => {
      return (
        <React.Fragment key={i}>
          {item}
          <br />
        </React.Fragment>
      )
    })
  }

  return (
    <Wrap data-testid="atoms-tt-wrap">
      <>
        {props.children}
        <Content className={props.className} content={props.content}>
          {props.nl2br ? nl2br(props.content) : props.content}
        </Content>
      </>
    </Wrap>
  )
}

export default Tooltip

const Content = styled.span<{ content?: string }>`
  display: ${({ content }) => (content ? 'inline-block' : 'none')};
  position: absolute;
  bottom: -35px;
  left: 38%;
  padding: 5px;
  line-height: 1.3;
  visibility: hidden;
  opacity: 0;
  background: ${Color.TEXT.GRAY};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  color: ${Color.TEXT.WHITE};
  transition: 0.3s ease-in;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 100;
`
const Wrap = styled.span`
  position: relative;
  cursor: pointer;
  font-size: 11px;
  &:hover ${Content} {
    opacity: 1;
    visibility: visible;
  }
`

import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../icon'
import Link from 'next/link'

type Props = {
  href?: string
  title: string
  date?: string
  disabled?: boolean
}

const LinkButton: React.FC<Props> = (props) => {
  return (
    <Wrap data-testid="atoms-lb-wrap" {...props}>
      {props.href ? (
        <Link href={props.href}>
          <a target="_blank" rel="noreferrer noopener">
            <IconWrapper data-testid="atoms-lb-icon-wrapper">
              <ButtonTitle data-testid="atoms-lb-button-title">
                {props.title}
                <DateWrap data-testid="atoms-lb-date-wrap">
                  <Icon.History size={11} />
                  <DateText data-testid="atoms-lb-date-text">
                    {props.date}
                  </DateText>
                </DateWrap>
              </ButtonTitle>
              <Icon.ExternalLink />
            </IconWrapper>
          </a>
        </Link>
      ) : (
        <IconWrapper data-testid="atoms-lb-icon-wrapper">
          <ButtonTitle data-testid="atoms-lb-button-title">
            {props.title}
            <DateWrap data-testid="atoms-lb-date-wrap">
              <Icon.History size={11} />
            </DateWrap>
          </ButtonTitle>
          <Icon.ExternalLink />
        </IconWrapper>
      )}
    </Wrap>
  )
}

const Wrap = styled.div<Props>`
  display: flex;
  align-items: center;
  width: 148px;
  height: 56px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${Color.TEXT.GRAY};
  cursor: ${({ href }) => (href ? 'pointer' : 'initial')};
  opacity: ${({ href }) => (href ? 1 : 0.5)};
  transition: background 0.2s linear;

  &:hover {
    background: ${({ href }) => (href ? Color.COMPONENT.GRAY_HOVER : '')};
    transition: background 0.2s linear;
  }
`
const ButtonTitle = styled.div`
  margin: 0 16px 0 0;
  font-weight: bold;
  font-size: 16px;
  color: ${Color.TEXT.WHITE};
`
const IconWrapper = styled.div`
  fill: ${Color.COMPONENT.SURFACE};
  display: flex;
  align-items: center;
`
const DateWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-weight: normal;
  > span {
    display: inherit;
  }
`
const DateText = styled.span`
  margin-left: 4px;
  font-size: 12px;
`

export default LinkButton

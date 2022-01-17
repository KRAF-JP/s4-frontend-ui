import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../icon'
import Link from 'next/link'

type Props = {
  href?: string
  title: string
  date: string
  disabled?: boolean
}

const LinkButton: React.FC<Props> = (props) => {
  return (
    <Wrap {...props}>
      {props.href ? (
        <Link href={props.href}>
          <IconWrapper>
            <ButtonTitle>
              {props.title}
              <DateWrap>
                <Icon.History />
                <DateText>{props.date}</DateText>
              </DateWrap>
            </ButtonTitle>
            <Icon.ExternalLink />
          </IconWrapper>
        </Link>
      ) : (
        <IconWrapper>
          <ButtonTitle>
            {props.title}
            <DateWrap>
              <Icon.History />
              <DateText>{props.date}</DateText>
            </DateWrap>
          </ButtonTitle>
          <Icon.ExternalLink />
        </IconWrapper>
      )}
    </Wrap>
  )
}

const Wrap = styled.div<Props>`
  width: 143px;
  height: 56px;
  padding: 12px 16px 9px;
  border-radius: 8px;
  background-color: ${Color.TEXT.GRAY};
  &:hover {
    background: ${({ disabled }) =>
      disabled ? '' : `${Color.COMPONENT.GRAY_HOVER}`};
  }
  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
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
  margin-top: 2px;
  > span > svg {
    width: 11px;
  }
`
const DateText = styled.span`
  font-size: 10px;
`

export default LinkButton

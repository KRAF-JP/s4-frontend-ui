import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../icon'
import { useRouter } from 'next/router'

type Props = {
  label: string
}

const LinkBack: React.FC<Props> = (props) => {
  const router = useRouter()

  return (
    <LinkBackWrap
      onClick={() => {
        router.back()
      }}
    >
      <LinkBackIcon>
        <Icon.ChevronLeft size={14} color={Color.TEXT.GRAY} />
      </LinkBackIcon>
      <LinkBackText>{props.label}</LinkBackText>
    </LinkBackWrap>
  )
}

const LinkBackWrap = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
`
const LinkBackIcon = styled.div`
  margin-right: 16px;
`
const LinkBackText = styled.div`
  font-size: 14px;
`

export default LinkBack

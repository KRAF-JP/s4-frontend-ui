import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'

type Props = {
  title: string
  description?: string
}

const PageHeader: React.FC<Props> = (props) => {
  return (
    <Wrap>
      <Title>{props.title}</Title>
      {props.description && <Description>{props.description}</Description>}
    </Wrap>
  )
}

const Wrap = styled.div`
  margin-bottom: 32px;
`
const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
`
const Description = styled.p`
  font-size: 12px;
  color: ${Color.TEXT.GRAY};
`

export default PageHeader

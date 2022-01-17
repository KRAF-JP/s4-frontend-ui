import React from 'react'
import styled from 'styled-components'

type Props = {
  children?: React.ReactNode
}

const TextList: React.FC<Props> = (props) => {
  return <Text {...props}>{props.children}</Text>
}

const Text = styled.li`
  margin-bottom: 8px;
  list-style-type: disc;
  font-size: 14px;
`

export default TextList

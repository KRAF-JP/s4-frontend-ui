import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  className?: string
}

const Tab: React.FC<Props> = (props) => {
  return (
    <Wrap className={props.className}>
      <TabList>{props.children}</TabList>
    </Wrap>
  )
}

const Wrap = styled.div``
const TabList = styled.ul`
  display: flex;
`

export default Tab

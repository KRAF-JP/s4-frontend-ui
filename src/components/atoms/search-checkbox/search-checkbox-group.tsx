import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

const SearchCheckboxGroup: React.FC<Props> = (props) => {
  return <Wrap>{props.children}</Wrap>
}

const Wrap = styled.div`
  display: flex;

  > *:last-child span {
    margin: 0;
  }
`

export default SearchCheckboxGroup

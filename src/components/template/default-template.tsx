import React, { useEffect } from 'react'
import styled from 'styled-components'
import Color from '../../const/color'
import GlobalNav from '../../components/organisms/global-nav/global-nav'
import PersonalNav from '../../components/organisms/personal-nav'
import Toaster from '../../components/organisms/toaster'

interface Props {
  children: React.ReactNode
}

const DefaultTemplate: React.FC<Props> = (props) => {
  return (
    <Wrap>
      <Toaster />
      <GlobalNavStyled />
      <PersonalNav />
      <Contents>{props.children}</Contents>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
`
const GlobalNavStyled = styled(GlobalNav)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  height: 100%;
`
const Contents = styled.main`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  width: 100%;
  height: 100%;
  padding: 48px;
  background: ${Color.COMPONENT.BACKGROUND};
  overflow: scroll;
`

export default DefaultTemplate

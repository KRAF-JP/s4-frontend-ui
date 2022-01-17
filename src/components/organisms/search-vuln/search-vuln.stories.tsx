import React from 'react'
import { storiesOf } from '@storybook/react'
import Color from '../../../const/color'
import GlobalStyle from '../../utils/global-style'
import styled from 'styled-components'
import SearchVuln from '../../organisms/search-vuln'

storiesOf('Components/Organisms/SearchVuln', module).add('SearchVuln', () => (
  <Wrap>
    <GlobalStyle />
    <FieldGroup>
      <FieldGroupTitle>Search Vuln</FieldGroupTitle>
      <Field>
        <SearchVuln />
      </Field>
    </FieldGroup>
  </Wrap>
))

const Wrap = styled.div`
  background-color: ;
`
const FieldGroup = styled.div`
  margin-bottom: 32px;
`
const FieldGroupTitle = styled.div`
  margin-bottom: 16px;
  padding: 8px;
  border-bottom: 1px solid ${Color.COMPONENT.FORM_BORDER};
  font-size: 16px;
  font-weight: 600;
`
const Field = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 16px 16px;
`

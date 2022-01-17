import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Color from '../../../const/color'
import GlobalStyle from '../../utils/global-style'
import LoginForm from '../login-form'
import GlobalHead from '../../utils//global-head'

storiesOf('Components/Molecules/LoginForm', module).add('LoginForm', () => (
  <Wrap>
    <GlobalStyle />
    <FieldGroup>
      <Field>
        <LoginForm />
      </Field>
    </FieldGroup>
  </Wrap>
))

const Wrap = styled.div``
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
const FieldTitle = styled.p`
  min-width: 150px;
  font-size: 12px;
  font-weight: 500;
`

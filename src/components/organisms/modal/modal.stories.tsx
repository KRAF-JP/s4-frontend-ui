import React from 'react'
import { storiesOf } from '@storybook/react'
import GlobalStyle from '../../utils/global-style'
import styled from 'styled-components'
import Modal from '../../organisms/modal/modal'

storiesOf('Components/Organisms/Modal', module)
  .add('Modal', () => (
    <Wrap>
      <GlobalStyle />
      <Modal
        title={'許可メールアドレスを登録'}
        submit={{
          label: '送信',
          buttonType: 'primary',
        }}
      />
    </Wrap>
  ))
  .add('Cancel', () => (
    <Wrap>
      <GlobalStyle />
      <Modal title={'許可メールアドレスを登録'} />
    </Wrap>
  ))

const Wrap = styled.div``

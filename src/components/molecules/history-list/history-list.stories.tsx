import React from 'react'
import { storiesOf } from '@storybook/react'
import GlobalStyle from '../../utils//global-style'
import styled from 'styled-components'
import HistoryList from '../history-list/history-list'

storiesOf('Components/Molecules/HistoryList', module).add('HistoryList', () => (
  <Wrap>
    <GlobalStyle />
    <HistoryList
      items={[
        {
          src: '/sample.jpg',
          name: '山田',
          text: 'が対応状況を「対応中」に変更しました',
          date: '数時間前',
        },
        {
          src: '/sample.jpg',
          name: 'SS 花子',
          text: 'が担当者を「山田太郎」に変更',
          date: '10時間前',
        },
        {
          src: '/sample.jpg',
          name: 'SS 権太',
          text: 'が担当者を「SS 花子」に設定',
          date: '昨日 21:30',
        },
      ]}
    />
  </Wrap>
))

const Wrap = styled.div``

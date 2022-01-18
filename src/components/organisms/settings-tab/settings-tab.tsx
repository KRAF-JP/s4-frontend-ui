import React from 'react'
import styled from 'styled-components'
import { Tab, TabItem } from '../../molecules/tab'

type Props = {}

const SettingsTab: React.FC<Props> = (props) => {
  return (
    <StyledTab>
      <TabItem name={'基本設定'} link={'/settings'} />
      <TabItem name={'通知設定'} link={'/settings/notifications'} />
      <TabItem name={'メンバー一覧'} link={'/settings/members'} />
      <TabItem name={'メンバー利用制限'} link={'/settings/restrictions'} />
      {/*<TabItem name={'チケット管理'} link={'/settings/tickets'} />*/}
      <TabItem name={'ユーザーログ'} link={'/settings/user-logs'} />
    </StyledTab>
  )
}

const StyledTab = styled(Tab)`
  margin-bottom: 20px;
`

export default SettingsTab

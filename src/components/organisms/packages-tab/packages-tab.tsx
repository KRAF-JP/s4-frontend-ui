import React from 'react'
import styled from 'styled-components'
import { Tab, TabItem } from '../../molecules/tab'

type Props = {
  server: number
}

const PackagesTab: React.FC<Props> = (props) => {
  return (
    <StyledTab>
      <TabItem
        name={'自動取得コマンドで実行'}
        link={`/assets/servers/${props.server}/packages/register`}
      />
      <TabItem
        name={'手動取得コマンドで実行'}
        link={`/assets/servers/${props.server}/packages/register-manual`}
      />
    </StyledTab>
  )
}

const StyledTab = styled(Tab)`
  margin-bottom: 20px;
`

export default PackagesTab

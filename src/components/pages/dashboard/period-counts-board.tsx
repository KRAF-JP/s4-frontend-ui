import React from 'react'
import styled from 'styled-components'
import { NextPage } from 'next'
import Color from '../../../const/color'
import { ResponsiveBar } from '@nivo/bar'
import { CardDashboard } from '../../atoms/card'
import { LoadingIcon } from '../../atoms/loading-icon'

type Props = {
  data: any
}

const PeriodCountsBoard: NextPage<Props> = (props) => {
  const formatDate = (date, format) => {
    format = format.replace(/yyyy/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
    return format
  }

  return (
    <WeeklyCard
      title={
        props.data.periodDate &&
        `${formatDate(
          new Date(props.data.periodDate[0]),
          'yyyy/MM/dd'
        )} 〜 ${formatDate(new Date(props.data.periodDate[1]), 'yyyy/MM/dd')}`
      }
    >
      <CardDescription>直近2週間に検出された脆弱性件数</CardDescription>
      <Graph>
        {props.data.data ? (
          <ResponsiveBar
            data={props.data.data}
            keys={['issues_count']}
            indexBy="date"
            margin={{ top: 0, right: 10, bottom: 20, left: 50 }}
            padding={0.1}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            borderRadius={8}
            colors={{ scheme: 'blues' }}
            colorBy="indexValue"
            enableLabel={false}
          />
        ) : (
          <LoadingIcon />
        )}
      </Graph>
    </WeeklyCard>
  )
}

const WeeklyCard = styled(CardDashboard)`
  grid-column: 4/7;
  grid-row: 1/2;
  background: ${Color.COMPONENT.SURFACE};

  > div {
    font-family: Roboto, sans-serif;
    font-size: 20px;
    line-height: 1.1;
  }
`
const CardDescription = styled.p`
  margin: -8px 0 16px;
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const Graph = styled.div`
  height: 160px;

  > div {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.1;
  }
`

export default PeriodCountsBoard

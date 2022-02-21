import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { NextPage } from 'next'
import { List, ListItem } from '../../molecules/list'
import { Card } from '../../atoms/card'
import { LoadingIcon } from '../../atoms/loading-icon'
import DashboardListItem from '../../molecules/list/dashboard-list-item'

type Props = {
  data: any
}

const PriorityListBoard: NextPage<Props> = (props) => {
  return (
    <AssignCard title={'優先度の高い脆弱性（最新5件）'}>
      <StyledList>
        {props.data ? (
          <>
            {props.data.length ? (
              <>
                {props.data.map((data, i) => (
                  <DashboardListItem
                    key={i}
                    vulnerabilityId={data.id}
                    severityId={data.vuln && data.vuln.cvss_severity_id}
                    score={data.vuln && data.vuln.cvss_base_score}
                    status={data.status}
                    title={data.vuln ? data.vuln.title : data.description}
                    createdAt={data.created_at}
                    profileImage={data.assignee && data.assignee.profile_image}
                  />
                ))}
              </>
            ) : (
              <ListItem>
                現在、「未対応」または「対応中」の脆弱性は0件です。
              </ListItem>
            )}
          </>
        ) : (
          <LoadingIcon />
        )}
      </StyledList>
    </AssignCard>
  )
}

const AssignCard = styled(Card)`
  grid-column: 3/5;
  background: ${Color.PRIMARY._100};
`
const StyledList = styled(List)`
  height: calc(100% - 48px);
  margin: -5px;
  padding: 5px;
  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export default PriorityListBoard

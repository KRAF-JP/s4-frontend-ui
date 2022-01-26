import React from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { IconImage } from '../../atoms/icon-image'
import Link from 'next/link'

type Props = {
  items?: any[]
}

const HistoryList: React.FC<Props> = (props) => {
  return (
    <List>
      {props.items ? (
        <>
          {props.items &&
            props.items.map((item, i) => (
              <Item key={i}>
                {item.is_newly && <ReadIcon />}
                <Left>
                  {item.user.profile_image && (
                    <IconImage src={item.user.profile_image} size={32} />
                  )}
                </Left>
                <Right>
                  <Content isRead={item.read_at}>
                    {item.type && (
                      <>
                        {/ProjectAssigned/.test(item.type) && (
                          <>
                            {item.user.name}さんが、あなたを「
                            {item.resource.name}
                            」に追加しました。
                          </>
                        )}
                        {/IssueStatusUpdated/.test(item.type) && (
                          <>
                            {item.user.name}さんが、「{item.resource.vuln_id}
                            」を{item.resource.status_name}に変更しました
                          </>
                        )}
                        {/IssueAssigned/.test(item.type) && (
                          <>
                            {item.user.name}さんが、あなたを「
                            {item.resource.vuln_id}
                            」の担当者に設定しました
                          </>
                        )}
                      </>
                    )}

                    {item.update_contents && (
                      <>
                        {item.user_id ? (
                          <>
                            <HistoryName>{item.user.name}</HistoryName>さん
                          </>
                        ) : (
                          <HistoryName>システム</HistoryName>
                        )}
                        が、
                        {item.update_contents_front.map((data, i) => (
                          <>
                            {i >= 1 && '、'}
                            {data.property}を「
                            {data.new_value}」に
                          </>
                        ))}
                        変更しました。
                      </>
                    )}
                  </Content>
                  <Date>{item.created_at.replaceAll('-', '/')}</Date>
                </Right>
              </Item>
            ))}
        </>
      ) : (
        '履歴はありません'
      )}
    </List>
  )
}

const List = styled.ul``
const Item = styled.li`
  display: flex;
  justify-content: start;
  position: relative;
  padding: 8px 0;
  border-radius: 16px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`
const Left = styled.div`
  > div {
    margin-top: 3px;
  }
`
const Right = styled.div`
  margin-left: 16px;
  line-height: 24px;
`
const Content = styled.div<{ isRead?: boolean }>`
  font-size: 14px;
`
const Date = styled.span`
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const ReadIcon = styled.div`
  position: absolute;
  top: 4px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: ${Color.COMPONENT.NOTICE};
`
const HistoryName = styled.span`
  padding-right: 4px;
  font-weight: bold;
`

export default HistoryList

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
      {props.items &&
        props.items.map((item, i) => (
          <Link key={i} href={''}>
            <Item>
              {item.is_newly && <ReadIcon />}
              <Left>
                {item.user.profile_image && (
                  <IconImage src={item.user.profile_image} size={32} />
                )}
              </Left>
              <Right>
                <Content isRead={item.read_at}>
                  {/ProjectAssigned/.test(item.type) && (
                    <>
                      {item.user.name}さんが、あなたを「{item.resource.name}
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
                      {item.user.name}さんが、あなたを「{item.resource.vuln_id}
                      」の担当者に設定しました
                    </>
                  )}
                </Content>
                <Date>{item.resource.created_at}</Date>
              </Right>
            </Item>
          </Link>
        ))}
    </List>
  )
}

const List = styled.ul``
const Item = styled.li`
  display: flex;
  justify-content: start;
  position: relative;
  padding: 8px 8px 8px 16px;
  border-radius: 16px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:hover {
    background: ${Color.COMPONENT.WHITE_HOVER};
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
  font-weight: ${({ isRead }) => (isRead ? 'normal' : 'bold')};
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

export default HistoryList

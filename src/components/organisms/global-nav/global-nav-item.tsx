import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { NotificationIcon } from '../../atoms/notification-icon'

type Props = {
  name: string
  path: string
  icon: React.ReactNode
  notification?: number
  navToggle: boolean
}

const GlobalNavItem: React.FC<Props> = (props) => {
  const router = useRouter()

  const currentPath = (path) => {
    return router.pathname.indexOf(path) > -1
  }

  const currentColor = (path) => {
    if (currentPath(path)) {
      return Color.PRIMARY._500
    } else {
      return Color.TEXT.GRAY
    }
  }

  const icons = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return <Icon.Dashboard color={currentColor(props.path)} size={24} />
      case 'assets':
        return <Icon.Database color={currentColor(props.path)} size={24} />
      case 'vuln':
        return <Icon.Cation color={currentColor(props.path)} size={24} />
      case 'threat':
        return <Icon.Threat color={currentColor(props.path)} size={24} />
      case 'setting':
        return <Icon.Setting color={currentColor(props.path)} size={24} />
    }
  }

  return (
    <NavItem current={currentPath(props.path)} navToggle={props.navToggle}>
      <Link href={props.path}>
        <a>
          {icons(props.icon)}
          <NavItemName navToggle={props.navToggle}>{props.name}</NavItemName>
          {props.notification && (
            <NotificationIconStyled
              number={props.notification}
              omit={props.navToggle}
            />
          )}
        </a>
      </Link>
    </NavItem>
  )
}

const NavItem = styled.li<{ current?: boolean; navToggle: boolean }>`
  position: relative;
  margin: 8px 0;
  font-size: 14px;
  font-weight: bold;

  ${({ navToggle }) =>
    navToggle &&
    `
      margin: 8px;
  `}

  ${({ current, navToggle }) =>
    current &&
    `
    &::before {
      position: absolute;
      top: 50%;
      left: ${navToggle ? '-24px' : '-28px'};
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-color: ${Color.PRIMARY._500};
      transform: translate(0, -50%);
      content: '';
    }
  `}

  a {
    position: relative;
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 16px;
    border-radius: 8px;
    color: ${({ current }) => (current ? Color.PRIMARY._500 : Color.TEXT.GRAY)};

    ${({ navToggle }) =>
      navToggle &&
      `
        justify-content: center;
        padding: 0 8px;
  `}

    &:hover {
      background: ${Color.COMPONENT.WHITE_HOVER};
    }
  }
`
const NotificationIconStyled = styled(NotificationIcon)`
  position: absolute;
  top: 50%;
  right: 16px;
  width: initial;
  min-width: 24px;
  padding: 0 8px;
  font-family: Roboto, sans-serif;
  transform: translate(0, -50%);
`
const NavItemName = styled.div<{ navToggle: boolean }>`
  margin-left: 16px;
  white-space: nowrap;

  ${({ navToggle }) =>
    navToggle &&
    `
    display: none;
  `}
`
export default GlobalNavItem

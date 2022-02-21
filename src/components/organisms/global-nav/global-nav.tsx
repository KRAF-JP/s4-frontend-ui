import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import GlobalContext from '../../../store/context'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { IconImage } from '../../atoms/icon-image'
import GlobalNavItem from '../../organisms/global-nav/global-nav-item'
import Skeleton from 'react-loading-skeleton'
import { useVulnerabilityUnRead } from '../../../hooks/pages/vulnerability/use-vulnerability'

type Props = {
  className?: string
}

const GlobalNav: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(GlobalContext)
  const [navToggle, setNavToggle] = useState(state.isNavOpen)
  const {} = useVulnerabilityUnRead()

  const handleClickNav = (bool) => {
    setNavToggle(!bool)
    dispatch({ type: 'is_nav', payload: !state.isNavOpen })
  }

  useEffect(() => {
    setNavToggle(state.isNavOpen)
  }, [])

  return (
    <>
      <NavWrap className={props.className} navToggle={navToggle}>
        <Logo>
          <LogoSymbol>
            <Icon.LogoSymbol size={32} />
          </LogoSymbol>
          <LogoType navToggle={navToggle}>
            <Icon.LogoType size={45} />
          </LogoType>
        </Logo>
        <Nav>
          <NavList navToggle={navToggle}>
            <GlobalNavItem
              name={'ダッシュボード'}
              path={'/dashboard'}
              icon={'dashboard'}
              navToggle={navToggle}
            />
            <GlobalNavItem
              name={'資産'}
              path={'/assets'}
              icon={'assets'}
              navToggle={navToggle}
            />
            <>
              {state.vulnerability.unread !== 0 ? (
                <GlobalNavItem
                  name={'脆弱性'}
                  path={'/vulnerability'}
                  icon={'vuln'}
                  navToggle={navToggle}
                  notification={state.vulnerability.unread}
                />
              ) : (
                <GlobalNavItem
                  name={'脆弱性'}
                  path={'/vulnerability'}
                  icon={'vuln'}
                  navToggle={navToggle}
                />
              )}
            </>
          </NavList>
          {state.user.role === 1 && (
            <NavList navToggle={navToggle}>
              <GlobalNavItem
                name={'管理'}
                path={'/settings'}
                icon={'setting'}
                navToggle={navToggle}
              />
            </NavList>
          )}
        </Nav>
        <NavUser navToggle={navToggle}>
          <NavUserIcon>
            {state.isLoadingUser || (
              <Skeleton
                baseColor={Color.COMPONENT.BORDER}
                width={40}
                height={40}
                borderRadius={50}
              />
            )}
            <IconImage src={state.user.org_image} size={40} />
          </NavUserIcon>
          <NavUserInfo navToggle={navToggle}>
            <NavUserText>ログイン中の組織</NavUserText>
            <NavUserName>
              {state.isLoadingUser || (
                <Skeleton
                  baseColor={Color.COMPONENT.BORDER}
                  width={180}
                  height={16}
                />
              )}
              {state.user.org_name}
            </NavUserName>
          </NavUserInfo>
        </NavUser>
      </NavWrap>
      <NavToggleBtn
        navToggle={navToggle}
        onClick={() => {
          handleClickNav(navToggle)
        }}
      >
        {navToggle ? (
          <Icon.BtnNavOpen size={32} />
        ) : (
          <Icon.BtnNavClose size={32} />
        )}
      </NavToggleBtn>
    </>
  )
}

const NavWrap = styled.div<{ navToggle: boolean }>`
  display: grid;
  grid-template-columns: ${({ navToggle }) => (navToggle ? '64px' : 'auto')};
  grid-template-rows: 112px auto 56px;
  position: relative;
  width: ${({ navToggle }) => (navToggle ? '64px' : '288px')};
  background: ${Color.COMPONENT.SURFACE};
  padding: ${({ navToggle }) => (navToggle ? '16px 0' : '16px')};
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);
  transition: width 0.2s ease-out;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px;
`
const LogoSymbol = styled.div``
const LogoType = styled.div<{ navToggle: boolean }>`
  margin-left: 16px;

  ${({ navToggle }) =>
    navToggle &&
    `
    display: none;
  `}
`
const Nav = styled.nav``
const NavList = styled.ul<{ navToggle: boolean }>`
  &::after {
    display: block;
    width: 240px;
    margin: 16px auto;
    border-bottom: 1px solid ${Color.COMPONENT.BORDER};
    content: '';
    transition: width 0.2s ease-out;
  }

  ${({ navToggle }) =>
    navToggle &&
    `
    &::after {
      width: 40px;
    }
  `}

  &:last-child {
    &::after {
      display: none;
    }
  }
`
const NavUser = styled.div<{ navToggle: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  ${({ navToggle }) =>
    navToggle &&
    `
    justify-content: center;
  `}
`
const NavUserIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`
const NavUserInfo = styled.div<{ navToggle: boolean }>`
  margin-left: 8px;
  white-space: nowrap;

  ${({ navToggle }) =>
    navToggle &&
    `
    display: none;
  `}
`
const NavUserText = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  color: ${Color.TEXT.GRAY};
`
const NavUserName = styled.div`
  font-size: 14px;
`
const NavToggleBtn = styled.div<{ navToggle: boolean }>`
  position: absolute;
  left: 288px;
  bottom: 0;
  width: 32px;
  height: 32px;
  transition: left 0.2s ease-out;
  cursor: pointer;

  ${({ navToggle }) =>
    navToggle &&
    `
      left: 64px;
  `}
`

export default GlobalNav

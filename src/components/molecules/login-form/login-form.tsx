import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { apiClient } from '../../../hooks/api-client'
import { useErrorHandle } from '../../../hooks/use-error-handle'

type Props = {}

const LoginForm: React.FC<Props> = (props) => {
  const [loginGoogleEnable, setLoginGoogleEnable] = useState(false)
  const [loginMsEnable, setLoginMsEnable] = useState(false)
  const [loginOktaEnable, setLoginOktaEnable] = useState(false)
  const [loginOkta, setLoginOkta] = useState<boolean>(false)
  const errorHandle = useErrorHandle()

  const handleLoginGoogle = () => {
    setLoginGoogleEnable(true)

    setTimeout(() => {
      setLoginGoogleEnable(false)
    }, 2000)
    window.location.href = `${process.env.NEXT_PUBLIC_APP_ROOT}/login/google`
  }

  const handleLoginMicrosoft = () => {
    setLoginMsEnable(true)

    setTimeout(() => {
      setLoginMsEnable(false)
    }, 2000)
    window.location.href = `${process.env.NEXT_PUBLIC_APP_ROOT}/login/graph`
  }

  const handleLoginOkta = () => {
    setLoginOktaEnable(true)

    setTimeout(() => {
      setLoginOktaEnable(false)
    }, 2000)
    window.location.href = `${process.env.NEXT_PUBLIC_APP_ROOT}/login/okta`
  }

  useEffect(() => {
    apiClient
      .get('/login/organization')
      .then((res) => {
        setLoginOkta(res.data.okta_enabled)
      })
      .catch((error) => {
        errorHandle(error)
      })
  }, [])

  return (
    <Wrap>
      <IconWrap>
        <Icon.LogoSymbol size={50} />
        <Icon.LogoType size={70} />
      </IconWrap>

      <Title>ログイン</Title>

      <LoginButtonWrap>
        <LoginButton
          data-testid="molecules-lf-ggl-button"
          onClick={handleLoginGoogle}
          isLogging={loginGoogleEnable}
        >
          <LoginButtonLogo>
            <Icon.LogoGoogle size={18} />
          </LoginButtonLogo>
          <LoginButtonText>
            {loginGoogleEnable
              ? 'ログインしています...'
              : 'Google アカウントでログイン'}
          </LoginButtonText>
        </LoginButton>

        <LoginButton
          data-testid="molecules-lf-ms-button"
          onClick={handleLoginMicrosoft}
          isLogging={loginMsEnable}
        >
          <LoginButtonLogo>
            <Icon.LogoMs size={19} />
          </LoginButtonLogo>
          <LoginButtonText>
            {loginMsEnable
              ? 'ログインしています...'
              : 'Microsoft アカウントでサインイン'}
          </LoginButtonText>
        </LoginButton>

        {loginOkta && (
          <LoginButton
            data-testid="molecules-lf-okt-button"
            onClick={handleLoginOkta}
            isLogging={loginOktaEnable}
          >
            <LoginButtonLogo>
              <Image src={'/logo_okta.png'} width={24} height={24} />
            </LoginButtonLogo>
            <LoginButtonText>
              {loginOktaEnable
                ? 'ログインしています...'
                : 'Okta アカウントでサインイン'}
            </LoginButtonText>
          </LoginButton>
        )}
      </LoginButtonWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 381px;
  height: 432px;
  padding: 64px 50px;
  border-radius: 16px;
  background: ${Color.COMPONENT.SURFACE};
  box-shadow: ${Color.ELEVATION.L};
`
const IconWrap = styled.div`
  display: flex;
  align-items: center;

  > *:first-child {
    margin-right: 16px;
  }
`
const Title = styled.h1`
  margin-top: 50px;
  font-weight: normal;
`
const LoginButtonWrap = styled.div`
  width: 100%;
`
const LoginButton = styled.div<{ isLogging?: boolean }>`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto;
  height: 40px;
  margin-bottom: 16px;
  border: 1px solid ${Color.COMPONENT.FORM_BORDER};
  border-radius: 8px;
  cursor: pointer;

  ${({ isLogging }) => isLogging && `pointer-events: none;`}
  &:last-child {
    margin: 0;
  }
`
const LoginButtonLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 2;
`
const LoginButtonText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2 / 3;
  font-size: 14px;
  font-weight: 600;
`
const Logging = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/3;
  pointer-events: none;
`

export default LoginForm

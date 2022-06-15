process.env.NEXT_PUBLIC_APP_ROOT = 'https://vams.jp/'

import React from 'react'
import { fireEvent, screen, waitFor, act } from '@testing-library/react'
import { render } from '../../../../__utils__/context-provider'
import { LoginForm } from '../../../../index'
import { apiClient } from '../../../../hooks/api-client'
import { AxiosInstance } from 'axios'

jest.mock('../../../../hooks/api-client')
const mockApiClient: jest.Mocked<AxiosInstance> = apiClient as any
mockApiClient.get = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({ status: 200, data: { okta_enabled: false } })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({ status: 200, data: { okta_enabled: true } })
  )
  .mockImplementationOnce(() =>
    Promise.reject({ response: { status: 403, data: { message: 'test' } } })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({ status: 200, data: { okta_enabled: true } })
  )

describe('ログインフォームのレンダリング確認', () => {
  test('okta: false時、Google と マイクロソフト のみ表示され、okta は表示されない。', async () => {
    render(<LoginForm />)

    expect(
      await screen.findByTestId('molecules-lf-ggl-button')
    ).toBeInTheDocument()
    expect(
      await screen.findByTestId('molecules-lf-ms-button')
    ).toBeInTheDocument()
    //存在しないこと
    expect(
      await screen.queryByTestId('molecules-lf-okt-button')
    ).not.toBeInTheDocument()
  })

  test('okta: true 時、Google と マイクロソフト と okta が表示される。', async () => {
    render(<LoginForm />)

    expect(
      await screen.findByTestId('molecules-lf-ggl-button')
    ).toBeInTheDocument()
    expect(
      await screen.findByTestId('molecules-lf-ms-button')
    ).toBeInTheDocument()
    expect(
      await screen.findByTestId('molecules-lf-okt-button')
    ).toBeInTheDocument()
  })

  test('APIアクセス不能時、okta が存在しないこと。', async () => {
    render(<LoginForm />)
    expect(
      await screen.findByTestId('molecules-lf-ggl-button')
    ).toBeInTheDocument()
    expect(
      await screen.findByTestId('molecules-lf-ms-button')
    ).toBeInTheDocument()
    await waitFor(() =>
      expect(
        screen.queryByTestId('molecules-lf-okt-button')
      ).not.toBeInTheDocument()
    )
  })
})

describe('ログインボタン押下時の挙動チェック', () => {
  jest.useFakeTimers()
  const url = 'https://vams.jp'
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
  })
  test('各ログインボタン押下時、ログイン中のメッセージになり、２秒後元に戻る。', async () => {
    render(<LoginForm />)
    expect(
      await screen.findByTestId('molecules-lf-ggl-button')
    ).toHaveTextContent('Google アカウントでログイン')
    fireEvent.click(screen.getByTestId('molecules-lf-ggl-button'))
    expect(
      await screen.findByTestId('molecules-lf-ggl-button')
    ).toHaveTextContent('ログインしています...')

    expect(
      await screen.findByTestId('molecules-lf-ms-button')
    ).toHaveTextContent('Microsoft アカウントでサインイン')
    fireEvent.click(screen.getByTestId('molecules-lf-ms-button'))
    expect(
      await screen.findByTestId('molecules-lf-ms-button')
    ).toHaveTextContent('ログインしています...')

    expect(
      await screen.findByTestId('molecules-lf-okt-button')
    ).toHaveTextContent('Okta アカウントでサインイン')
    fireEvent.click(screen.getByTestId('molecules-lf-okt-button'))
    expect(
      await screen.findByTestId('molecules-lf-okt-button')
    ).toHaveTextContent('ログインしています...')

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(
      await screen.findByTestId('molecules-lf-ggl-button')
    ).toHaveTextContent('Google アカウントでログイン')
    expect(
      await screen.findByTestId('molecules-lf-ms-button')
    ).toHaveTextContent('Microsoft アカウントでサインイン')
    expect(
      await screen.findByTestId('molecules-lf-okt-button')
    ).toHaveTextContent('Okta アカウントでサインイン')
  })
})

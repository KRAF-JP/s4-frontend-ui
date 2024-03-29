import React from 'react'
import { HistoryList } from '../../../../index'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  issueAssignedNotification,
  projectAssignNotification,
  issueStatusUpdateNotification,
} from '../../../../__data__/moleclues/history-list-data'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
    }
  },
}))

const mockSetIsAlert = jest.fn()
const mockRemoveHandler = jest.fn()
const mockHandleClick = jest.fn()

afterEach(() => {
  mockPush.mockReset()
  mockSetIsAlert.mockReset()
  mockRemoveHandler.mockReset()
})

describe('通知リスト - 個別表示確認', () => {
  test('プロジェクトアサイン通知の場合、該当プロジェクトへのアサインが通知される。', () => {
    render(<HistoryList items={[projectAssignNotification]} />)
    expect(screen.getByTestId('molecules-hl-read-icon')).toBeInTheDocument()
    expect(screen.getByTestId('molecules-hl-content').textContent).toBe(
      'プロジェクト 管理者history.you.toテストプロジェクトhistory.added'
    )
  })

  test('イシューステータス通知の場合、対応イシューのステータスが通知される。', () => {
    render(<HistoryList items={[issueStatusUpdateNotification]} handleClick={mockHandleClick} />)
    expect(screen.getByTestId('molecules-hl-read-icon')).toBeInTheDocument()
    expect(screen.getByTestId('molecules-hl-content').textContent).toBe(
      'プロジェクト 管理者vulnerability.detail.responsible.person.nameCVE-2020-5329」を未対応に変更しました。'
    )
  })

  test('イシューアサイン通知の場合、対応イシューへのアサインが通知される。', () => {
    render(<HistoryList items={[issueAssignedNotification]} handleClick={mockHandleClick} />)
    expect(screen.getByTestId('molecules-hl-read-icon')).toBeInTheDocument()
    expect(screen.getByTestId('molecules-hl-content').textContent).toBe(
      'プロジェクト 管理者 history.you.toCVE-2020-9349history.responsible.for'
    )
  })
})

describe('通知リスト - 一覧表示確認', () => {
  test('一覧の場合、通知が昇順で表示される。', () => {
    render(
      <HistoryList
        items={[
          projectAssignNotification,
          issueStatusUpdateNotification,
          issueAssignedNotification,
        ]}
      />
    )
    expect(screen.queryAllByTestId('molecules-hl-content')[0].textContent).toBe(
      'プロジェクト 管理者history.you.toテストプロジェクトhistory.added'
    )
    expect(screen.queryAllByTestId('molecules-hl-content')[1].textContent).toBe(
      'プロジェクト 管理者vulnerability.detail.responsible.person.nameCVE-2020-5329」を未対応に変更しました。'
    )
    expect(screen.queryAllByTestId('molecules-hl-content')[2].textContent).toBe(
      'プロジェクト 管理者 history.you.toCVE-2020-9349history.responsible.for'
    )
  })
})

describe('通知リスト - handleLinkClick', () => {
  test('イシューステータス通知の場合、該当のpropsがコールされる。', () => {
    render(
      <HistoryList
        items={[issueStatusUpdateNotification]}
        setIsAlert={mockSetIsAlert}
        removeHandler={mockRemoveHandler}
        handleClick={mockHandleClick}
      />
    )
    fireEvent.click(screen.getByTestId('molecules-hl-content-link'))

    expect(screen.getByTestId('molecules-hl-content').textContent).toBe(
      'プロジェクト 管理者vulnerability.detail.responsible.person.nameCVE-2020-5329」を未対応に変更しました。'
    )
    expect(mockPush).toBeCalledTimes(1)
    expect(mockPush).toBeCalledWith({
      pathname: '/vulnerability/[id]',
      query: { id: 50 },
    })
    expect(mockSetIsAlert).toBeCalledTimes(1)
    expect(mockSetIsAlert).toBeCalledWith(false)
    expect(mockRemoveHandler).toBeCalledTimes(1)
    expect(mockRemoveHandler).toBeCalledWith()
  })

  test('イシューアサイン通知の場合、該当のpropsがコールされる。', () => {
    render(
      <HistoryList
        items={[issueAssignedNotification]}
        setIsAlert={mockSetIsAlert}
        removeHandler={mockRemoveHandler}
        handleClick={mockHandleClick}
      />
    )
    fireEvent.click(screen.getByTestId('molecules-hl-content-link'))

    expect(screen.getByTestId('molecules-hl-content').textContent).toBe(
      'プロジェクト 管理者 history.you.toCVE-2020-9349history.responsible.for'
    )
    expect(mockPush).toBeCalledTimes(1)
    expect(mockPush).toBeCalledWith({
      pathname: '/vulnerability/[id]',
      query: { id: 35 },
    })
    expect(mockSetIsAlert).toBeCalledTimes(1)
    expect(mockSetIsAlert).toBeCalledWith(false)
    expect(mockRemoveHandler).toBeCalledTimes(1)
    expect(mockRemoveHandler).toBeCalledWith()
  })
})

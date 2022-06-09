import React from 'react'
import HistoryList from '../../../../components/molecules/history-list'
import { render, screen, cleanup } from '@testing-library/react'
import {
  sysHistoryItem,
  userHistoryItem,
} from '../../../../__data__/moleclues/history-list-data'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
    }
  },
}))

interface Items {
  caseTitle: string
  items: any[]
  expected: string
}
const falsyItems: Items[] = [
  { caseTitle: '空の配列', items: [], expected: '' }, //空の配列の場合「履歴はありません」の出力なし
  { caseTitle: 'null', items: null, expected: '履歴はありません' },
  { caseTitle: 'undefined', items: undefined, expected: '履歴はありません' },
]

afterEach(() => cleanup())

describe.each(falsyItems)(
  '履歴リスト - props.itemsがfalsy（空の配列/null/undefined）の時',
  (datum: Items) => {
    const { items, caseTitle, expected } = datum
    test(`${caseTitle}の場合、リストに「${expected}」が表示される。`, () => {
      render(<HistoryList items={items} />)
      expect(screen.getByTestId('molecules-hl-list')).toHaveTextContent(
        expected
      )
    })
  }
)

describe('履歴リスト - Issue 履歴', () => {
  test('システム履歴の場合、アイコンがlogo-symbolになり、表示名が「システム」になる。', () => {
    render(<HistoryList items={[sysHistoryItem]} />)
    expect(screen.getByTestId('molecules-hl-logo-symbol')).toBeInTheDocument()
    expect(screen.getByTestId('molecules-hl-history-name').textContent).toBe(
      'システム'
    )
  })
  test('ユーザ履歴の場合、アイコン表示がユーザアイコンになり、表示名が「ユーザ名」になる。', () => {
    render(<HistoryList items={[userHistoryItem]} />)
    expect(screen.getByTestId('atoms-ii-img')).toHaveAttribute(
      'src',
      'data:image/png;base64,test=='
    )
    expect(screen.getByTestId('molecules-hl-history-name').textContent).toBe(
      'テスト太郎'
    )
  })
  test('システム・ユーザ混在履歴の場合、それぞれ配列の昇順で表示する。', () => {
    render(<HistoryList items={[sysHistoryItem, userHistoryItem]} />)
    expect(
      screen.queryAllByTestId('molecules-hl-history-name')[0].textContent
    ).toBe('システム')
    expect(
      screen.queryAllByTestId('molecules-hl-history-name')[1].textContent
    ).toBe('テスト太郎')
  })
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { PopupCard } from '../../../../index'

const Dummy = () => <span>dummy</span>
const Ref = jest.fn()

describe('ポップアップカードのレンダリング確認', () => {
  test('propsに設定した値でレンダリングされる。', () => {
    render(
      <PopupCard
        title="test title"
        width={100}
        isShow={true}
        cardRef={Ref}
        className="test"
      >
        <Dummy />
      </PopupCard>
    )
    expect(screen.getByTestId('molecules-pc-wrap')).toHaveAttribute(
      'width',
      '100'
    )
    expect(screen.getByTestId('molecules-pc-title').textContent).toBe(
      'test title'
    )
    expect(screen.getByTestId('molecules-pc-content')).toContainHTML(
      '<span>dummy</span>'
    )

    fireEvent.click(screen.getByTestId('molecules-pc-wrap'))
    expect(Ref).toHaveBeenCalledTimes(1)
  })
})

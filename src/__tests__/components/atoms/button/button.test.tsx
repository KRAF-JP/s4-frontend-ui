import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../../../components/atoms/button'

test('require label text', () => {
  render(<Button label="label text" />)
  expect(screen.getByRole('button')).toHaveAttribute('label', 'label text')
  expect(screen.getByRole('button')).toHaveTextContent('label text')
})

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button label="click" handleClick={handleClick} />)
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

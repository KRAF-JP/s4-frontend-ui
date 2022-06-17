import { composeValidators, email } from '../../../../index'

const falsyValues = [
  'check@examplecom',
  'check@example..com',
  ' check@example.com',
]
const truthyValues = ['', 'check@example.com']

describe.each(falsyValues)('email - 不正なメールアドレスの時', (v) => {
  test(`value: ${v} の時、設定したエラーメッセージが返る。`, () => {
    expect(composeValidators(email)(v)).toBe(
      '正しいメールアドレスを入力してください'
    )
  })
})

describe.each(truthyValues)('email - 正しいメールアドレスの時', (v) => {
  test(`value: ${v} の時、undefined が返る。`, () => {
    expect(composeValidators(email)(v)).toBe(undefined)
  })
})

import React, { useReducer } from 'react'
import { render } from '@testing-library/react'
import { initialUserState, userState } from '../store/interfaces'
import { globalStateReducer } from '../store/reducer'
import Context from '../store/context'

const Renderer: React.FC = ({
  children,
}: React.PropsWithChildren<Record<string, any>>) => {
  const initialState: userState = initialUserState
  const [state, dispatch] = useReducer(globalStateReducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}
const contextProvider = (ui, options = {}) =>
  render(ui, {
    wrapper: Renderer,
    ...options,
  })

export * from '@testing-library/react'
export { contextProvider as render }

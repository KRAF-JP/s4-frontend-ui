import { createContext, Dispatch } from 'react'
import { userState, Action } from './interfaces'

const GlobalContext =
  createContext<{ state: userState; dispatch: Dispatch<Action> }>(null)

export default GlobalContext

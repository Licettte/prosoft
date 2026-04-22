import { type ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../store'

export const StoreProvider = (component: () => ReactNode) => () => {
  return <Provider store={store}>{component()}</Provider>
}

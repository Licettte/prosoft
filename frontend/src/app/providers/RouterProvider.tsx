import { type ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const RouterProvider = (component: () => ReactNode) => () => {
  return <BrowserRouter>{component()}</BrowserRouter>
}

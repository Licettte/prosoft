import {AntProvider, RouterProvider, StoreProvider} from 'app/providers'
import compose from 'compose-function'

export const withProviders = compose( RouterProvider, StoreProvider, AntProvider )

import React from "react"
import drawerReducer from "@/reducers/drawer"
import routeReducer from "@/reducers/route"
import pageOptionsReducer, {
  FONT_ZOOM_LOCALSTORAGE_KEY,
} from "@/reducers/pageOptions"
import { loadFromLocalStorage } from "@/utils"

export const drawerInitialState = {
  open: false,
}

export const routeInitialState = {
  path: "/",
  fullPath: "/",
}

export const pageOptionsInitialState = {
  closedAlerts: [],
  fontZoom: parseFloat(
    loadFromLocalStorage(FONT_ZOOM_LOCALSTORAGE_KEY) || "1.0"
  ),
}

const ContextStore = React.createContext({
  drawer: drawerInitialState,
  route: routeInitialState,
  pageOptions: pageOptionsInitialState,
})

export const ContextStoreProvider = props => {
  const { initialStore = {} } = props

  const [drawerState, drawerDispatch] = React.useReducer(drawerReducer, {
    ...drawerInitialState,
    ...initialStore.drawer,
  })

  const [routeState, routeDispatch] = React.useReducer(routeReducer, {
    ...routeInitialState,
    ...initialStore.route,
  })

  const [pageOptionsState, pageOptionsDispatch] = React.useReducer(
    pageOptionsReducer,
    {
      ...pageOptionsInitialState,
      ...initialStore.pageOptions,
    }
  )

  return (
    <ContextStore.Provider
      value={{
        drawer: {
          state: drawerState,
          dispatch: drawerDispatch,
        },
        route: {
          state: routeState,
          dispatch: routeDispatch,
        },
        pageOptions: {
          state: pageOptionsState,
          dispatch: pageOptionsDispatch,
        },
      }}
      {...props}
    />
  )
}

export default ContextStore

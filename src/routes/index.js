// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'



export const createRoutes = (store) => {
/*  Note: Instead of using JSX, we are using react-router PlainRoute,
    a simple javascript object to provide route definitions.
    When creating a new async route, pass the instantiated store!   */
  const routes = {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Counter').default(store),
          require('./Account').default(store),
          require('./Login').default(store),
          require('./Register').default(store),
          require('./Offline').default(store),
          require('./History').default,
          require('./NotFound').default
        ])
      })
    },

  }

  return routes
}

export default createRoutes

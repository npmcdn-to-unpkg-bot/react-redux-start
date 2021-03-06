import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'register',
  getComponent (nextState, next) {
    require.ensure([
      './containers/RegisterContainer',
      './modules/register'
    ], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const Register = require('./containers/RegisterContainer').default
      const reducer = require('./modules/register').default

      injectReducer(store, { key: 'register', reducer })

      next(null, Register)
    })
  }
})

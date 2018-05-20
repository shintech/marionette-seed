import Marionette from 'marionette'

const Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'users': 'users',
    'devices': 'devices'
  }
})

export default Router

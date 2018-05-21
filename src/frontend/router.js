import Marionette from 'marionette'

const Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'users': 'users',
    'devices': 'devices',
    'login': 'login'
  }
})

export default Router

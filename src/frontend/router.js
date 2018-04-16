import Marionette from 'marionette'

const Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'about': 'about',
    'new': 'create'
  }
})

export default Router

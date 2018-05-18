import Marionette from 'marionette'

const Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'about': 'about'
  }
})

export default Router

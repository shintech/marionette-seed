import Marionette from 'marionette'

const Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'users': 'users',
    'devices': 'devices',
    'login': 'login'
  },

  initialize: function (app) {
    this.app = app
  },

  onRoute: function (route) {
    let app = this.app

    if (!app.session.get('authenticated')) {
      if (route === 'index') route = '/'
      if (route !== 'login') app.session.set('redirectFrom', route)
    }
    
    if (app.pagination) {
      app.pagination.destroy()
    }    
  }
})

export default Router

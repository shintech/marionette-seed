import Marionette from 'marionette'
import Users from './collections/Users'
import UsersView from './views/UsersView'
import AboutView from './views/AboutView'
import FormView from './views/FormView'
import SingleUserView from './views/SingleUserView'
import NavigationView from './views/NavigationView'
import ModalView from './views/ModalView'

const Controller = Marionette.Object.extend({
  initialize: async function (app) {
    this.app = app
    let users

    app.users = new Users()

    try {
      users = await app.lookup(app.users)
    } catch (err) {
      console.error(err.message)
    }

    app.modalView = new ModalView(app)

    app.view.showChildView('modal', app.modalView)
    app.view.showChildView('header', new NavigationView({ app: app, collection: users }))
  },

  index: async function () {
    let app = this.app

    app.view.showChildView('content', new UsersView(app))

    app.view.on('modal:user', (model) => { // This is triggered in UserView.js
      app.modalView.showChildView('body', new SingleUserView({ app, model }))
      app.modalView.show()
    })

    app.view.on('modal:form', (model, collection) => { // This is triggered in NavigationView, SingleUserView
      app.modalView.showChildView('body', new FormView({ app, model, collection }))
      app.modalView.show()
    })
  },

  about: function () {
    let app = this.app

    app.view.showChildView('content', new AboutView())
  }
})

export default Controller

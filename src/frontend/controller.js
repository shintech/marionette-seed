import Marionette from 'marionette'
import Models from './collections/Models'
import ModelsView from './views/ModelsView'
import AboutView from './views/AboutView'
import FormView from './views/FormView'
import SingleModelView from './views/SingleModelView'
import NavigationView from './views/NavigationView'
import ModalView from './views/ModalView'

const Controller = Marionette.Object.extend({
  initialize: async function (app) {
    this.app = app
    let models

    app.models = new Models()

    try {
      models = await app.lookup(app.models)
    } catch (err) {
      console.error(err.message)
    }

    app.modalView = new ModalView(app)

    app.view.showChildView('modal', app.modalView)
    app.view.showChildView('header', new NavigationView({ app: app, collection: models }))
  },

  index: async function () {
    let app = this.app

    app.view.showChildView('content', new ModelsView(app))

    app.view.on('modal:model', (model) => { // This is triggered in ModelView.js
      app.modalView.showChildView('body', new SingleModelView({ app, model }))
      app.modalView.show()
    })

    app.view.on('modal:form', (model, collection) => { // This is triggered in NavigationView, SingleModelView
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

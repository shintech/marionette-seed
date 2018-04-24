import Marionette from 'marionette'
import Models from './collections/Models'
import ModelsView from './views/ModelsView'
import AboutView from './views/AboutView'
import FormView from './views/FormView'
import SingleModelView from './views/SingleModelView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options
    this.app.models = new Models()
  },

  index: function () {
    let app = this.app

    this.app.models.fetch({
      success: function (data) {
        app.modelsView = new ModelsView({ app: app, collection: data })

        app.view.showChildView('content', app.modelsView)

        app.modelsView.on('modelsView:trigger', (data) => {
          app.view.showChildView('modal', new SingleModelView({ model: data }))
        })
      },

      error: function (err) {
        console.log(err)
      }
    })
  },

  about: function () {
    let app = this.app

    app.view.showChildView('content', new AboutView())
  },

  create: function () {
    let app = this.app

    app.view.showChildView('content', new FormView())
  }
})

export default Controller

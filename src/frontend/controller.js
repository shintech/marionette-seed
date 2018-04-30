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

  index: async function () {
    let app = this.app
    let models

    try {
      models = await fetch(this.app.models)
    } catch (err) {
      console.error(err.message)
    }

    let modelsView = new ModelsView({ app: app, collection: models })

    app.view.showChildView('content', modelsView)

    app.view.on('modal:trigger', (model) => {
      app.view.showChildView('modal', new SingleModelView({ model: model }))
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

function fetch (models) {
  let defer = $.Deferred()

  models.fetch({
    success: function (data) {
      defer.resolve(data)
    },
    error: function (err) {
      defer.reject(err)
    }
  })

  return defer.promise()
}

export default Controller

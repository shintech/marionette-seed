import Marionette from 'marionette'
import Models from './collections/Models'
import ModelsView from './views/ModelsView'
import AboutView from './views/AboutView'
import FormView from './views/FormView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
    this.models = new Models()
  },

  index: function () {
    let app = this.app
    const models = this.models

    models.fetch({
      success: function (data) {
        app.view.showChildView('content', new ModelsView({ collection: data }))
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

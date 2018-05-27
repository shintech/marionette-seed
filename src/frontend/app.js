import Backbone from 'backbone'
import Marionette from 'marionette'
require('babel-polyfill')

const App = Marionette.Application.extend({
  region: 'body',

  lookup: function (collection) {
    let defer = $.Deferred()

    collection.fetch({
      success: function (data) {
        defer.resolve(data)
      },

      error: function (err) {
        defer.reject(err)
      }
    })

    return defer.promise()
  },

  onStart: function (app) {
    app.view.showChildView('modal', app.modalView)
    app.view.showChildView('header', app.navbar)

    app.showView(app.view)

    Backbone.history.start()
  }
})

export default App

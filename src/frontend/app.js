import Backbone from 'backbone'
import Marionette from 'marionette'
import FlashMessage from './views/FlashMessage'
require('babel-polyfill')

const App = Marionette.Application.extend({
  region: 'body',

  onStart: function () {
    this.showView(this.view)

    this.view.on('trigger:flash', (flash, message) => { // FormView.js
      let flashMessage = new FlashMessage({flash, message})

      this.view.showChildView('flash', flashMessage)
      flashMessage.show()
    })

    Backbone.history.start()
  },

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
  }
})

export default App

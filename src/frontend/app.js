import Backbone from 'backbone'
import Marionette from 'marionette'
import RootView from './views/RootView'

const App = Marionette.Application.extend({
  region: 'body',
  onStart: function () {
    this.view = new RootView()
    this.showView(this.view)
    Backbone.history.start()
  }
})

export default App

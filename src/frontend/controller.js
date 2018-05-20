import Marionette from 'marionette'
import Users from './collections/Users'
import UsersView from './views/UsersView'
import Devices from './collections/Devices'
import DevicesView from './views/DevicesView'
import AboutView from './views/AboutView'
import UserFormView from './views/UserFormView'
import DeviceFormView from './views/DeviceFormView'
import SingleUserView from './views/SingleUserView'
import SingleDeviceView from './views/SingleDeviceView'
import NavigationView from './views/NavigationView'
import ModalView from './views/ModalView'

const Controller = Marionette.Object.extend({
  initialize: async function (app) {
    this.app = app

    app.users = new Users()
    app.devices = new Devices()

    try {
      await app.lookup(app.users)
      await app.lookup(app.devices)
    } catch (err) {
      console.error(err.message)
    }

    app.modalView = new ModalView(app)

    app.view.showChildView('modal', app.modalView)
    app.view.showChildView('header', new NavigationView({ app }))
  },

  index: function () {
    let app = this.app

    app.view.showChildView('content', new AboutView())
  },

  users: function () {
    let app = this.app

    app.view.showChildView('content', new UsersView(app))

    app.view.on('modal:user', (model) => { // This is triggered in UserView.js
      app.modalView.showChildView('body', new SingleUserView({ app, model }))
      app.modalView.show()
    })

    app.view.on('modal:form', (model, collection) => { // This is triggered in NavigationView, SingleUserView
      app.modalView.showChildView('body', new UserFormView({ app, model }))
      app.modalView.show()
    })
  },

  devices: function () {
    let app = this.app

    app.view.showChildView('content', new DevicesView(app))

    app.view.on('modal:device', (model) => { // This is triggered in DeviceView.js
      app.modalView.showChildView('body', new SingleDeviceView({ app, model }))
      app.modalView.show()
    })

    app.view.on('modal:form', (model, collection) => { // This is triggered in NavigationView, SingleDeviceView
      app.modalView.showChildView('body', new DeviceFormView({ app, model }))
      app.modalView.show()
    })
  }
})

export default Controller

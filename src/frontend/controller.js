import Marionette from 'marionette'
import NavigationView from './views/main/NavigationView'
import ModalView from './views/main/ModalView'
import RootView from './views/main/RootView'
import AboutView from './views/main/AboutView'
import LoginView from './views/main/LoginView'

import Users from './collections/Users'
import UsersView from './views/Users/UsersView'
import UserFormView from './views/Users/UserFormView'
import SingleUserView from './views/Users/SingleUserView'

import Devices from './collections/Devices'
import DevicesView from './views/Devices/DevicesView'
import DeviceFormView from './views/Devices/DeviceFormView'
import SingleDeviceView from './views/Devices/SingleDeviceView'

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

    app.view = new RootView(app)
    app.navbar = new NavigationView({ app })
    app.modalView = new ModalView(app)

    app.view.showChildView('modal', app.modalView)
    app.view.showChildView('header', app.navbar)

    app.view.on('modal:login', (model, collection) => { // This is triggered in NavigationView
      app.modalView.showChildView('body', new LoginView({ app, model }))
      app.modalView.show()
    })

    app.start(app)
  },

  index: function () {
    let app = this.app

    $(`.nav-${app.menu}`).removeClass('active')

    app.menu = 'index' // *1

    app.navbar.configureMenu()

    app.view.showChildView('content', new AboutView(app))
  },

  users: function () {
    let app = this.app

    $(`.nav-${app.menu}`).removeClass('active')

    app.menu = 'users' // *1

    app.navbar.configureMenu()

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

    $(`.nav-${app.menu}`).removeClass('active')

    app.menu = 'devices' // *1

    app.navbar.configureMenu()

    app.view.showChildView('content', new DevicesView(app))

    app.view.on('modal:device', (model) => { // This is triggered in DeviceView.js
      app.modalView.showChildView('body', new SingleDeviceView({ app, model }))
      app.modalView.show()
    })

    app.view.on('modal:form', (model, collection) => { // This is triggered in NavigationView, SingleDeviceView
      app.modalView.showChildView('body', new DeviceFormView({ app, model }))
      app.modalView.show()
    })
  },

  login: function () {
    let app = this.app

    $(`.nav-${app.menu}`).removeClass('active')

    app.menu = 'login' // *1

    app.navbar.configureMenu()

    app.view.showChildView('content', new LoginView(app))
  }
})

export default Controller

/**
  1. app.navbar.onAttach and app.navbar.configureMenu use to check if there needs to be a create new item link
    added or removed from the drop down menu and to determine which tab is currently active. The jquery function
    $(`.nav-${app.menu}`).removeClass('active') is called before setting this variable in order to remove the
    active class from the previously active tab. The a tags in the navigation view template have the class name
    nav-${app.menu}.
**/

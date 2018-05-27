import Marionette from 'marionette'

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

    app.view.on('modal:login', (model, collection) => { // This is triggered in NavigationView
      app.modalView.showChildView('body', new LoginView({ app, model }))
      app.modalView.show()
    })
  },

  index: function () {
    let app = this.app

    $(`.nav-${app.menu}`).removeClass('active')

    if (!app.session.get('authenticated')) {
      app.session.set('redirectFrom', '/')

      Backbone.history.navigate('#login', { trigger: true })
    } else {
      app.menu = 'index' // *1

      app.navbar.configureMenu()

      app.view.showChildView('content', new AboutView(app))
    }
  },

  users: async function () {
    let app = this.app

    try {
      app.users = await app.lookup(app.users)
    } catch (err) {
      console.error(err.message)
    }

    $(`.nav-${app.menu}`).removeClass('active')

    app.menu = 'users' // *1

    app.navbar.configureMenu()

    app.view.showChildView('content', new UsersView(app, app.users))

    app.view.on('modal:user', (model) => { // This is triggered in UserView.js
      app.modalView.showChildView('body', new SingleUserView({ app, model }))
      app.modalView.show()
    })

    app.view.on('modal:form', (model, collection) => { // This is triggered in NavigationView, SingleUserView
      app.modalView.showChildView('body', new UserFormView({ app, model }))
      app.modalView.show()
    })
  },

  devices: async function () {
    let app = this.app

    try {
      app.devices = await app.lookup(app.devices)
    } catch (err) {
      console.error(err.message)
    }

    $(`.nav-${app.menu}`).removeClass('active')

    app.menu = 'devices' // *1

    app.navbar.configureMenu()

    app.view.showChildView('content', new DevicesView(app, app.devices))

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

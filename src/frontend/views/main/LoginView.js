const LoginView = Backbone.Marionette.View.extend({
  template: require('../../templates/login-view-template.html'),
  events: {
    'click .submit': 'handleSubmit'
  },

  initialize: function (options) {
    this.app = options.app
  },

  handleSubmit: function (e) {
    e.preventDefault()
    let app = this.app

    let attrs = {
      username: $('[name="username"]').val(),
      password: $('[name="password"]').val()
    }

    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: attrs,
      success: function (success) {
        if (success) {
          console.log('logged in...')

          app.view.triggerMethod('trigger:flash', 'success', 'Login success...') // RootView.js

          app.modalView.hide()
        } else {
          console.log('login failed...')

          app.view.triggerMethod('trigger:flash', 'error', 'Login failed...') // RootView.js

          app.modalView.hide()
        }
      },
      error: function (err) { // eslint-disable-line
        console.log('login failed...')

        app.view.triggerMethod('trigger:flash', 'error', 'Login failed...') // RootView.js

        app.modalView.hide()
      }
    })
  }
})

export default LoginView

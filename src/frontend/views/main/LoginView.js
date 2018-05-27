const LoginView = Backbone.Marionette.View.extend({
  template: require('../../templates/login-view-template.html'),
  tagName: 'form',
  className: 'content-view',
  events: {
    'click .submit': 'handleSubmit'
  },

  initialize: function (app) {
    this.app = app
    app.view.triggerMethod('trigger:flash', 'error', 'Please log in...') // RootView.js
  },

  handleSubmit: function (e) {
    e.preventDefault()
    let app = this.app

    let attrs = {
      username: $('[name="username"]').val(),
      password: $('[name="password"]').val()
    }

    app.session.login({username: attrs.username, password: attrs.password})
  }
})

export default LoginView

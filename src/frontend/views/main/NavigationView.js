const NavigationView = Backbone.Marionette.View.extend({
  tagName: 'nav',

  className: 'navbar',

  events: {
    'click #create-new': function () {
      this.app.view.triggerMethod('modal:form', null)
    },

    'click #logout': 'logout'
  },

  template: require('../../templates/navigation-view-template.html'),

  serializeData: function () {
    return {
      'title': this.title
    }
  },

  initialize: function (options) {
    this.app = options.app
    this.title = options.title || 'Default'
  },

  onAttach: function () {
    this.configureMenu()
  },

  configureMenu: function () {
    if (this.app.session.get('authenticated')) {
      $('.dropbtn').html(`${this.app.session.get('user').username} &blacktriangledown;`)
      $('#login').hide()
      $('#logout').show()

      if (this.app.menu === 'index') {
        $('#create-new').hide()
      } else {
        $('#create-new').show().css('display', 'block')
      }
    } else {
      $('.dropbtn').html(`actions &blacktriangledown;`)
      $('#login').show()
      $('#logout').hide()
      $('#create-new').hide()
    }

    $(`.nav-${this.app.menu}`).addClass('active')
  },

  logout: function () {
    let app = this.app

    app.session.logout(function () {
      console.log('success')
      app.view.triggerMethod('trigger:flash', 'success', 'Logged out...') // RootView.js
    })

    this.configureMenu()
  }
})

export default NavigationView

import FlashMessage from './FlashMessage'

const RootView = Backbone.Marionette.View.extend({
  className: 'root',

  template: require('../../templates/root-view-template.html'),

  initialize: function (app) {
    this.on('trigger:flash', (flash, message) => { // FormView.js, LoginView.js
      let flashMessage = new FlashMessage({flash, message})

      this.showChildView('flash', flashMessage)
      flashMessage.show()
    })
  },

  regions: {
    header: {
      el: '.header',
      replaceElement: true
    },
    flash: {
      el: '.flash',
      replaceElement: true
    },
    content: {
      el: '.content'
    },
    modal: {
      el: '.modal',
      replaceElement: true
    },
    footer: {
      el: '.footer'
    }
  }
})

export default RootView

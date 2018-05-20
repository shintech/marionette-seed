const NavigationView = Backbone.Marionette.View.extend({
  tagName: 'nav',

  className: 'navbar',

  events: {
    'click #create-new': function () {
      this.app.view.triggerMethod('modal:form', null)
    }
  },

  template: require('../templates/navigation-view-template.html'),

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
    if (this.app.menu === 'index') {
      $('#create-new').hide()
    }
  },

  configureMenu: function (route) {
    if (route === 'index') {
      $('#create-new').hide()
    } else {
      $('#create-new').show().css('display', 'block')
    }
  }
})

export default NavigationView

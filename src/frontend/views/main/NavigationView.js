const NavigationView = Backbone.Marionette.View.extend({
  tagName: 'nav',

  className: 'navbar',

  events: {
    'click #create-new': function () {
      this.app.view.triggerMethod('modal:form', null)
    },

    'click #login': function () {
      this.app.view.triggerMethod('modal:login', null)
    }
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
    if (this.app.menu === 'index') {
      $('#create-new').hide()
    } else {
      $('#create-new').show().css('display', 'block')
    }

    $(`.nav-${this.app.menu}`).addClass('active')
  }
})

export default NavigationView

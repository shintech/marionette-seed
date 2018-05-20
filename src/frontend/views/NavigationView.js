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
    this.users = options.users
    this.devices = options.devices
  }
})

export default NavigationView

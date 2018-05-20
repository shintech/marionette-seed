const DeviceView = Backbone.Marionette.View.extend({
  initialize: function (app) {
    this.app = app
  },

  className: 'device-view',

  tagName: 'li',

  template: require('../templates/device-view-template.html'),

  events: {
    'click': 'handleClick'
  },

  handleClick: function (e) {
    this.app.view.triggerMethod('modal:device', this.model) // controller.js
  }
})

export default DeviceView

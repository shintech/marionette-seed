const SingleDeviceView = Backbone.Marionette.View.extend({
  tagName: 'div',
  template: require('../templates/single-device-view-template.html'),
  events: {
    'click .edit': 'handleClick'
  },

  initialize: function (options) {
    this.app = options.app
  },

  handleClick: function () {
    this.app.view.triggerMethod('modal:form', this.model)
  }
})

export default SingleDeviceView

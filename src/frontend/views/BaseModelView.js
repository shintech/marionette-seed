const BaseModelView = Backbone.Marionette.View.extend({
  tagName: 'div',

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

export default BaseModelView

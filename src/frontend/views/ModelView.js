const ModelView = Backbone.Marionette.View.extend({
  initialize: function (app) {
    this.app = app
  },

  tagName: 'li',

  template: require('../templates/model-view-template.html'),

  events: {
    'click button': 'handleClick'
  },

  handleClick: function (e) {
    this.app.view.triggerMethod('modal:model', this.model)
  }
})

export default ModelView

const BaseItemView = Backbone.Marionette.View.extend({
  initialize: function (app) {
    this.app = app
  },

  tagName: 'li'
})

export default BaseItemView

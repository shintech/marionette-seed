const UserView = Backbone.Marionette.View.extend({
  initialize: function (app) {
    this.app = app
  },

  tagName: 'li',

  template: require('../templates/user-view-template.html'),

  events: {
    'click button': 'handleClick'
  },

  handleClick: function (e) {
    this.app.view.triggerMethod('modal:user', this.model) // controller.js
  }
})

export default UserView

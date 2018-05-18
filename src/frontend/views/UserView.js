const UserView = Backbone.Marionette.View.extend({
  initialize: function (app) {
    this.app = app
  },

  className: 'user-view',

  tagName: 'li',

  template: require('../templates/user-view-template.html'),

  events: {
    'click': 'handleClick'
  },

  handleClick: function (e) {
    this.app.view.triggerMethod('modal:user', this.model) // controller.js
  }
})

export default UserView

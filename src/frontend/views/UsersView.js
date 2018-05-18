import UserView from './UserView'

const UsersView = Backbone.Marionette.CollectionView.extend({
  initialize: function (app) {
    this.app = app
    this.collection = app.users
    this.collection.on('sync', this.render)
  },

  className: 'content-view',

  tagName: 'ul',

  childView: UserView,

  childViewOptions: function () {
    return this.app
  }
})

export default UsersView

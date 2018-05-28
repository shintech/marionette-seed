const BaseCollectionView = Backbone.Marionette.CollectionView.extend({
  initialize: function (app, collection) {
    this.app = app
    this.collection = collection
    this.collection.on('sync', this.render)
  },

  tagName: 'ul',

  childViewOptions: function () {
    return this.app
  }
})

export default BaseCollectionView

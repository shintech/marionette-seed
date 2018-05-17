import ModelView from './ModelView'

const ModelsView = Backbone.Marionette.CollectionView.extend({
  initialize: function (app) {
    this.app = app
    this.collection = app.models
    this.collection.on('sync', this.render)
  },

  className: 'content-view',

  tagName: 'ul',

  childView: ModelView,

  childViewOptions: function () {
    return this.app
  }
})

export default ModelsView

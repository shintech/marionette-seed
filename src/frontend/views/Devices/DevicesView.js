import DeviceView from './DeviceView'

const DevicesView = Backbone.Marionette.CollectionView.extend({
  initialize: function (app, collection) {
    this.app = app
    this.collection = collection
    this.collection.on('sync', this.render)
  },

  className: 'content-view',

  tagName: 'ul',

  childView: DeviceView,

  childViewOptions: function () {
    return this.app
  }
})

export default DevicesView

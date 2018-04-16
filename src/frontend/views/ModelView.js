import SingleModelView from './SingleModelView'

const ModelView = Backbone.Marionette.View.extend({
  initialize: function (options) {
    this.app = options.app
  },

  tagName: 'li',

  template: require('../templates/model-view-template.html'),

  events: {
    'click button': 'handleClick'
  },

  regions: {
    singleModel: {
      el: '.single-model'
    }
  },

  handleClick: function (e) {
    console.log(this.model.get('id'))
    this.showChildView('singleModel', new SingleModelView({ model: this.model }))
  }
})

export default ModelView

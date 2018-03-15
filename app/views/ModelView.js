const ModelView = Backbone.Marionette.View.extend({
  tagName: 'li',

  template: require('../templates/model-view-template.html'),

  events: {
    'click button': 'handleClick'
  },

  handleClick: function (e) {
    console.log(this.model.get('id'))
  }
})

export default ModelView

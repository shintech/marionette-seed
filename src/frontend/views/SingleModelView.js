const SingleModelView = Backbone.Marionette.View.extend({
  tagName: 'div',

  className: 'single-model',

  template: require('../templates/single-model-view-template.html'),

  id: 'single-model-view'
})

export default SingleModelView

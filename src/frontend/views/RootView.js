const RootView = Backbone.Marionette.View.extend({
  className: 'root',

  template: require('../templates/root-view-template.html'),

  regions: {
    header: {
      el: '.header',
      replaceElement: true
    },
    flash: {
      el: '.flash',
      replaceElement: true
    },
    content: {
      el: '.content'
    },
    modal: {
      el: '.modal',
      replaceElement: true
    }
  }
})

export default RootView

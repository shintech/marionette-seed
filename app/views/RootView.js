const RootView = Backbone.Marionette.View.extend({
  className: 'main',
  template: require('../templates/root-view-template.html'),
  regions: {
    main: {
      el: '#main-view'
    }
  }
})

export default RootView

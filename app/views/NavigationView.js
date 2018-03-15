const NavigationView = Backbone.Marionette.View.extend({
  className: 'header',
  tagName: 'nav',
  template: require('../templates/navigation-view-template.html')
})

export default NavigationView

import NavigationView from './NavigationView'

const RootView = Backbone.Marionette.View.extend({
  className: 'root',
  template: require('../templates/root-view-template.html'),
  regions: {
    header: {
      el: '.header',
      replaceElement: true
    },
    content: {
      el: '.content'
    }
  },
  onRender: function () {
    this.showChildView('header', new NavigationView())
  }
})

export default RootView

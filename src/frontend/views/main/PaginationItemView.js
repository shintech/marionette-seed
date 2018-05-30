const PageNavigationItemView = Backbone.Marionette.View.extend({
  tagName: 'li',

  template: require('../../templates/pagination-view-template.html'),
  
  initialize: function (options) {
    this.parent = options.parent
    this.page = this.model.get('page')
  },
  
  onRender: function () {
    if (this.model.get('active') === 'active') {
      this.el.className = 'active'
    } else if (this.model.get('active') === 'disabled') {
      this.el.className = 'disabled'
    }
  },
  
  events: {
    'click': 'handleClick'
  },
  
  handleClick: function (e) {
    e.preventDefault()
    this.model.set('page', this.page)
    this.parent.triggerMethod('page:change', this.page)
  }
})

export default PageNavigationItemView

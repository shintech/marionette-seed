const ModalView = Backbone.Marionette.View.extend({
  className: 'modal fade',

  template: require('../templates/modal-view-template.html'),

  regions: {
    head: {
      el: '.modal-header'
    },
    body: {
      el: '.modal-body'
    }
  },

  events: {
    'click .close': 'hide'
  },

  initialize: function (options) {
    const view = this

    window.onclick = function (event) {
      if (event.target.classList.contains('modal')) {
        view.$el.toggle()
      }
    }
  },

  show: function () {
    this.$el.show()
  },

  hide: function () {
    this.$el.hide()
  }
})

export default ModalView

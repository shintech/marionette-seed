const FlashMessage = Backbone.Marionette.View.extend({
  className: 'flash',
  template: require('../templates/flash-message-template.html'),

  serializeData: function () {
    let message = this.message

    return {
      message: message
    }
  },

  events: {
    'click .close': 'hide'
  },

  initialize: function (options) {
    this.message = options.message
    this.flash = options.flash
  },

  show: function () {
    this.$el.addClass(this.flash)
    this.$el.show()

    if (this.flash !== 'error') {
      setTimeout(() => {
        this.$el.hide()
        this.destroy()
      }, 10000)
    }
  },

  hide: function () {
    this.$el.hide()
    this.destroy()
  }
})

export default FlashMessage

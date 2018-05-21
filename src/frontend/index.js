import App from './app'
import Router from './router'
import Controller from './controller'
require('../../public/less/index.less')

let previousError

_.extend(Backbone.Validation.callbacks, {
  valid: function (view, attr, selector) {
    const $el = view.$('[name=' + attr + ']')
    const $group = $el.closest('.form-group')
    const helpBlock = $group.find('.help-block')

    if (attr === 'first_name') {
      previousError = false
    }

    if (attr === 'last_name' && !previousError) {
      $('.name-help-block').removeClass('has-error')
      $('.name-help-block').html('').addClass('hidden')
    } else {
      helpBlock.removeClass('has-error')
      $group.find('.help-block').html('').addClass('hidden')
    }
  },
  invalid: function (view, attr, error, selector) {
    const $el = view.$('[name=' + attr + ']')
    const $group = $el.closest('.form-group')
    const helpBlock = $group.find('.help-block')

    if (attr === 'first_name') {
      previousError = true
    }

    if (attr === 'first_name' || attr === 'last_name') {
      $('.name-help-block').addClass('has-error')
      $('.name-help-block').html(error).removeClass('hidden')
    } else {
      helpBlock.addClass('has-error')
      $group.find('.help-block').html(error).removeClass('hidden')
    }
  }
})

const app = new App() // app is instantiated here but started in app.controller.initialize

app.controller = new Controller(app)

app.Router = new Router(app)

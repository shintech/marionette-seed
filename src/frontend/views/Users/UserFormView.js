import BaseFormView from '../BaseFormView'
import User from '../../models/User'

const FormView = BaseFormView.extend({
  template: require('../../templates/user-form-template.html'),

  events: {
    'click .submit': 'submitForm'
  },

  initialize: function (options) {
    this.app = options.app
    this.collection = this.app.users
    this.model = this.model || new User()

    Backbone.Validation.bind(this, {
      model: this.model
    })
  },

  serializeData: function () {
    let user = this.model

    return {
      first_name: user.get('first_name'),
      last_name: user.get('last_name'),
      email: user.get('email'),
      message: user.get('message'),
      optional: user.get('optional'),
      username: user.get('username'),
      password: user.get('password')
    }
  },

  submitForm: function (e) {
    e.preventDefault()
    let app = this.app
    let user = this.model

    let attrs = {
      first_name: $('[name="first_name"]').val(),
      last_name: $('[name="last_name"]').val(),
      email: $('[name="email"]').val(),
      message: $('[name="message"]').val(),
      optional: $('[name="optional"]').val(),
      username: $('[name="username"]').val(),
      password: $('[name="password"]').val()
    }

    user.set(attrs)

    if (user.isValid(true)) {
      user.save(attrs, {
        success: () => {
          console.log('success')

          this.collection.add(user)
          app.modalView.hide()
          app.view.triggerMethod('trigger:flash', 'success', 'Success...') // app.js

          Backbone.Validation.unbind(this)
        },

        error: (err) => {
          console.error(err)

          app.view.triggerMethod('trigger:flash', 'error', 'Error...') // app.js
        }
      })
    }
  }
})

export default FormView

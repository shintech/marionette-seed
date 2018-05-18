import Model from '../models/Model'

const FormView = Backbone.Marionette.View.extend({
  template: require('../templates/form-view-template.html'),

  tagName: 'form',

  events: {
    'click .submit': 'submitForm'
  },

  className: 'form',

  initialize: function (options) {
    this.app = options.app
    this.model = this.model || new Model()
  },

  serializeData: function () {
    let model = this.model

    return {
      first_name: model.get('first_name'),
      last_name: model.get('last_name'),
      email: model.get('email'),
      optional: model.get('optional'),
      message: model.get('message')
    }
  },

  submitForm: function (e) {
    e.preventDefault()
    let app = this.app
    let model = this.model
    const modelAttrs = {
      first_name: $('[name="first_name"]').val(),
      last_name: $('[name="last_name"]').val(),
      email: $('[name="email"]').val(),
      message: $('[name="message"]').val(),
      optional: $('[name="optional"]').val()
    }

    model.set(modelAttrs)

    model.save(modelAttrs, {
      success: () => {
        console.log('success')

        this.collection.add(model)
        app.modalView.hide()
      },

      error: (err) => {
        console.error(err)
      }
    })
  }
})

export default FormView

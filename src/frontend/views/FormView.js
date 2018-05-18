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
  },

  submitForm: function (e) {
    e.preventDefault()
    let app = this.app
    let model = new Model()

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

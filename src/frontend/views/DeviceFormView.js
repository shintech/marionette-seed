import Device from '../models/Device'

const FormView = Backbone.Marionette.View.extend({
  tagName: 'form',

  template: require('../templates/device-form-template.html'),

  events: {
    'click .submit': 'submitForm'
  },

  className: 'form',

  initialize: function (options) {
    this.app = options.app
    this.collection = this.app.devices
    this.model = this.model || new Device()
  },

  serializeData: function () {
    let device = this.model

    return {
      serial: device.get('serial'),
      model: device.get('model'),
      manufacturer: device.get('manufacturer')
    }
  },

  submitForm: function (e) {
    e.preventDefault()
    let app = this.app
    let device = this.model

    let attrs = {
      serial: $('[name="serial"]').val(),
      model: $('[name="model"]').val(),
      manufacturer: $('[name="manufacturer"]').val()
    }

    device.set(attrs)

    device.save(attrs, {
      success: () => {
        console.log('success')

        this.collection.add(device)
        app.modalView.hide()
        app.view.triggerMethod('trigger:flash', 'success', 'Success...') // app.js
      },

      error: (err) => {
        console.error(err)

        app.view.triggerMethod('trigger:flash', 'error', 'Error...') // app.js
      }
    })
  }
})

export default FormView

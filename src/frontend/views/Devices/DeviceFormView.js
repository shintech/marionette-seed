import BaseFormView from '../BaseFormView'
import Device from '../../models/Device'

const FormView = BaseFormView.extend({
  template: require('../../templates/device-form-template.html'),

  events: {
    'click .submit': 'submitForm'
  },

  initialize: function (options) {
    this.app = options.app
    this.collection = this.app.devices
    this.model = this.model || new Device()

    Backbone.Validation.bind(this, {
      model: this.model
    })
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

    this.constructor.prototype.submit.call(this, app, device, attrs)
  }
})

export default FormView

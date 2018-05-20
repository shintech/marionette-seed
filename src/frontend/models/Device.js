import validation from 'backbone-validation' // eslint-disable-line

const Device = Backbone.Model.extend({
  urlRoot: '/api/devices',
  validation: {
    manufacturer: [
      { required: true, msg: 'Please choose a manufacturer...' }
    ],

    model: [
      { required: true, msg: 'Please choose a model...' }
    ],

    serial: [
      { required: true, msg: 'Please enter a serial number...' }
    ]
  }
})

export default Device

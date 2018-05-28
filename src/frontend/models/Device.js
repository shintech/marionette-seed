import BaseModel from './BaseModel'

const Device = BaseModel.extend({
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

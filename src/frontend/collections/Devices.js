import Device from '../models/Device'

const Devices = Backbone.Collection.extend({
  model: Device,

  url: '/api/devices',

  parse: function (data) {
    return data['response']
  }
})

export default Devices

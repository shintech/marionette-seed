import BaseCollection from './BaseCollection'
import Device from '../models/Device'

const Devices = BaseCollection.extend({
  model: Device,
  url: '/api/devices'
})

export default Devices

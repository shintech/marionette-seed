import BaseCollection from './BaseCollection'
import Device from '../models/Device'

const Devices = BaseCollection.extend({
  model: Device,
  url: '/api/devices',
  initialize: function (app) {
    this.app = app
    
    this.page =  1
    this.url = `/api/devices?page=${this.page}`
  },
  
  parse: function (data) {
    this.meta = data['meta']
    
    return data['response']
  },  
  
  changeURL: function (page) {
    if (page > 0) {
      this.url = `/api/devices?page=${page}`
      this.app.currentPage = page
      this.trigger('change:url', this.meta) // DevicesView.js      
    }
  }  
})

export default Devices

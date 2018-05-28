import BaseItemView from '../BaseItemView'
import Device from '../../models/Device'

const DeviceView = BaseItemView.extend({
  className: 'device-view',

  model: Device,

  template: require('../../templates/device-view-template.html'),

  events: {
    'click': 'handleClick'
  },

  handleClick: function (e) {
    this.app.view.triggerMethod('modal:device', this.model) // controller.js
  }
})

export default DeviceView

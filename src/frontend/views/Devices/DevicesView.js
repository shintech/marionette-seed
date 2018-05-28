import BaseCollectionView from '../BaseCollectionView'
import DeviceView from './DeviceView'

const DevicesView = BaseCollectionView.extend({
  className: 'content-view',
  childView: DeviceView
})

export default DevicesView

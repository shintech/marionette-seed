import BaseCollectionView from '../BaseCollectionView'
import UserView from './UserView'

const UsersView = BaseCollectionView.extend({
  className: 'content-view',
  childView: UserView
})

export default UsersView

import BaseCollectionView from '../BaseCollectionView'
import UserView from './UserView'

const UsersView = BaseCollectionView.extend({
  className: 'content-view',
  childView: UserView,

  initialize: function (app, collection) {
    this.app = app
    let models

    this.collection = collection
    // this.collection.on('sync', this.render)
    this.collection.on('change:url', async function () { // triggered in Users.js
      try {
        await this.app.lookup(collection)
      } catch (err) {
        console.log(err)
      }
    })
  },

  childViewOptions: function () {
    return this.app
  }

})

export default UsersView

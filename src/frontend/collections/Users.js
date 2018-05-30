import BaseCollection from './BaseCollection'
import User from '../models/User'

const Users = BaseCollection.extend({
  model: User,
  initialize: function (app) {
    this.app = app
    
    this.page =  1
    this.url = `/api/users?page=${this.page}`
  },
  
  parse: function (data) {
    this.meta = data['meta']

    return data['response']
  },  
  
  changeURL: function (page) {
    if (page > 0) {
      this.url = `/api/users?page=${page}`
      this.app.currentPage = page
      this.trigger('change:url', this.meta) // UsersView.js      
    }
  }
})

export default Users

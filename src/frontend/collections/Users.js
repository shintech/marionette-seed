import User from '../models/User'

const Users = Backbone.Collection.extend({
  model: User,

  url: '/api/users'
})

export default Users

import User from '../models/User'

const Users = Backbone.Collection.extend({
  model: User,

  url: '/api/users',

  parse: function (data) {
    return data['response']
  }
})

export default Users

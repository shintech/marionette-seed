import BaseCollection from './BaseCollection'
import User from '../models/User'

const Users = BaseCollection.extend({
  model: User,
  url: '/api/users'
})

export default Users

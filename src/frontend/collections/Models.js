import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,

  url: '/api/models'
})

export default Models

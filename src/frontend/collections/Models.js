import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,

  url: '/api/models'

  // parse: function (data) {
  //   return data['results']
  // }
})

export default Models

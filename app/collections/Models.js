import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,
  url: 'http://skynet.shintech.ninja:8000/api/models',
  parse: function (data) {
    return data['body'].results
  }
})

export default Models

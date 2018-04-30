import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,

  url: '/api/models',

  parse: function (data) {
    return data['results']
  },

  asyncFetch: function () {
    let defer = $.Deferred()

    this.fetch({
      success: function (data) {
        defer.resolve(data)
      },

      error: function (err) {
        defer.reject(err)
      }
    })

    return defer.promise()
  }
})

export default Models

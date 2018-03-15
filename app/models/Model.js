const Model = Backbone.Model.extend({
  urlRoot: '/api/models',

  parse: function (data) {
    const object = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      optional: data.optional,
      created_at: data.created_at
    }

    object['fullName'] = `${object.firstName} ${object.lastName}`

    return object
  }
})

export default Model

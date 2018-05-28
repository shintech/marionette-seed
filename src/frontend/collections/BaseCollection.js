const BaseCollection = Backbone.Collection.extend({
  parse: function (data) {
    return data['response']
  }
})

export default BaseCollection

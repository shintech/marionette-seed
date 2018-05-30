import PaginationModel from '../models/PaginationModel'

const PageNavigationCollection = Backbone.Collection.extend({
  model: PaginationModel
})

export default PageNavigationCollection

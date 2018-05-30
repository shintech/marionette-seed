
import PaginationModel from '../../models/PaginationModel'
import PaginationCollection from '../../collections/PaginationCollection'
import PaginationItemView from './PaginationItemView'
import '../../../lib/math.js'
const PaginationView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pagination',
  
  childView: PaginationItemView,
  
  initialize: function (app, collection) {
    this.app = app
    this.currentPage = 1
    this.pageCount = collection.meta.pageCount
    this.collection = new PaginationCollection()
    
    this.on('page:change', function (page) {
      this.collection.reset()
      
      if (page <= 0) page = 1
      if (page !== 1) this.collection.add(new PaginationModel({ page: page - 1, active: false, text: 'Previous Page' }))
      
      this.currentPage = page

      this.collection.add(new PaginationModel({ page: this.currentPage, active: false, text: this.currentPage }))
      
      if (page < this.pageCount) this.collection.add(new PaginationModel({ page: this.currentPage + 1, active: false, text: 'Next Page' }))      
      
      collection.changeURL(page)
    })
  },
  
  onAttach: function () {
    if (this.currentPage !== 1) this.collection.add(new PaginationModel({ page: this.currentPage - 1, active: false, text: 'Previous Page' }))
    const currentPage = new PaginationModel({ page: this.currentPage, active: false, text: this.currentPage })
    const nextPage = new PaginationModel({ page: this.currentPage + 1, active: false, text: 'Next Page' })
    
    this.collection.add(currentPage)
    this.collection.add(nextPage)
  },
  
  childViewOptions: function () {
    return { parent: this }
  },
  
  pageChange: function () {
    console.log('page change')
  }
})

export default PaginationView
import BaseItemView from '../BaseItemView'
import User from '../../models/User'

const UserView = BaseItemView.extend({
  className: 'user-view',

  model: User,

  template: require('../../templates/user-view-template.html'),

  events: {
    'click': 'handleClick'
  },

  handleClick: function (e) {
    this.app.view.triggerMethod('modal:user', this.model) // controller.js
  }
})

export default UserView

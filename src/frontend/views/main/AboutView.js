const AboutView = Backbone.Marionette.View.extend({
  className: 'content-view',

  template: require('../../templates/about-view-template.html'),

  events: {
    'dragenter .drop-zone': 'enterDropZone',
    'dragleave .drop-zone': 'leaveDropZone',
    'drop .drop-zone': 'handleDrop',

    'dragover .drop-zone': function (e) {
      e.preventDefault()
    },
    'dragstart': 'startDrag'
  },

  initialize: function (app) {
    this.draggable = ''
    this.users = app.users
    this.devices = app.devices
  },

  serializeData: function () {
    let users = this.users
    let devices = this.devices

    return {
      users: users,
      devices: devices
    }
  },

  enterDropZone: function (e) {
    console.log('enter')
    $(e.currentTarget).addClass('drop-zone-highlight')
  },

  leaveDropZone: function (e) {
    console.log('leave')
    $(e.currentTarget).removeClass('drop-zone-highlight')
  },

  startDrag: function (e) {
    this.draggable = e.target.id
    console.log('start')
  },

  handleDrop: function (e) {
    e.preventDefault()
    console.log(`drop: -> ${this.draggable}`)

    $(e.currentTarget).removeClass('drop-zone-highlight')
    $(e.target).append($(document.getElementById(this.draggable)))

    $('.images').html('You chose:')
    $('.images').append(`<h1 style="color:red;">${this.draggable}!</h1>`)
  }
})

export default AboutView

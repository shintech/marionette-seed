import validation from 'backbone-validation' // eslint-disable-line

const User = Backbone.Model.extend({
  urlRoot: '/api/users',
  validation: {
    first_name: [
      {
        required: true,
        msg: 'Full name is required...'
      }
    ],

    last_name: [
      {
        required: true,
        msg: 'Full name is required...'
      }
    ],

    email: [
      {
        required: true,
        msg: 'Email is required...'
      },
      {
        pattern: 'email',
        msg: 'Please enter a valid email address...'
      }
    ],

    optional: [
      {
        required: true,
        msg: 'Option is required...'
      }
    ],

    message: [
      {
        required: true,
        msg: 'Message is required....'
      }
    ]
  }
})

export default User

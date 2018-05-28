const BaseFormView = Backbone.Marionette.View.extend({
  tagName: 'form',

  className: 'form',

  submit: function (app, model, attrs) {
    model.set(attrs)

    if (model.isValid(true)) {
      model.save(attrs, {
        success: () => {
          console.log('success')

          this.collection.add(model)
          app.modalView.hide()
          app.view.triggerMethod('trigger:flash', 'success', 'Success...') // app.js

          Backbone.Validation.unbind(this)
        },

        error: (err) => {
          console.error(err)

          app.view.triggerMethod('trigger:flash', 'error', 'Error...') // app.js
        }
      })
    }
  }
})

export default BaseFormView

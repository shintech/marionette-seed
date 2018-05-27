const Session = Backbone.Model.extend({
  url: '/session',
  initialize: function (app) {
    this.app = app

    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': csrf
      }
    })

    if (Storage && sessionStorage) {
      this.supportStorage = true
    }
  },

  changeFunction () {
    console.log('changed')
  },

  get: function (key) {
    if (this.supportStorage) {
      var data = sessionStorage.getItem(key)

      if (data && data[0] === '{') {
        return JSON.parse(data)
      } else {
        return data
      }
    } else {
      return Backbone.Model.prototype.get.call(this, key)
    }
  },

  set: function (key, value) {
    if (this.supportStorage) {
      sessionStorage.setItem(key, value)
    } else {
      Backbone.Model.prototype.set.call(this, key, value)
    }

    return this
  },

  unset: function (key) {
    if (this.supportStorage) {
      sessionStorage.removeItem(key)
    } else {
      Backbone.Model.prototype.unset.call(this, key)
    }

    return this
  },

  clear: function () {
    if (this.supportStorage) {
      sessionStorage.clear()
    } else {
      Backbone.Model.prototype.clear(this)
    }
  },

  login: function (credentials) {
    let that = this
    let app = this.app

    $.ajax({
      url: `${this.url}/login`,
      data: credentials,
      type: 'POST'
    })

      .done(function (response) {
        app.session.set('authenticated', true)
        app.session.set('user', JSON.stringify(response.user))
        app.view.triggerMethod('trigger:flash', 'success', `Logged in as user ${response.user.fullName}...`) // RootView.js
        // app.modalView.hide()

        if (that.get('redirectFrom')) {
          let path = that.get('redirectFrom')
          that.unset('redirectFrom')
          Backbone.history.navigate(path, { trigger: true })
        } else {
          Backbone.history.navigate('', { trigger: true })
        }
      })

      .fail(function () {
        console.log('failed')
        app.view.triggerMethod('trigger:flash', 'error', `Login failed...`) // RootView.js

        Backbone.history.navigate('login', { trigger: true })
      })
  },

  logout: function (callback) {
    let app = this.app
    let that = this

    $.ajax({
      url: `${this.url}/logout`,
      type: 'DELETE'
    })

      .done(function (response) {
        that.clear()
        csrf = response.csrf // eslint-disable-line
        that.initialize(app)

        Backbone.history.navigate('login', { trigger: true })

        callback()
      })
  }
})

export default Session

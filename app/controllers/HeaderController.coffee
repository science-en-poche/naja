App = require 'app'

module.exports = App.HeaderController = Em.Controller.extend
  isAuthenticated: false

  login: ->
    @set('isAuthenticated', true)

  logout: ->
    @set('isAuthenticated', false)

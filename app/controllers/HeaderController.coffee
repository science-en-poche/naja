App = require 'app'

module.exports = App.HeaderController = App.AuthenticatedController.extend
  login: ->
    navigator.id.request()

  logout: ->
    navigator.id.logout()

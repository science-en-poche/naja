App = require 'app'

module.exports = App.ApplicationController = App.AuthenticatedController.extend
  needs: ['authentication']

  initAuth: ->
    @get('controllers.authentication').initAuth()

  login: ->
    navigator.id.request()

  logout: ->
    navigator.id.logout()

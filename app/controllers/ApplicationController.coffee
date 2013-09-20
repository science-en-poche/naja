App = require 'app'

module.exports = App.ApplicationController = Em.Controller.extend
  isAuthenticated: false

  login: ->
    navigator.id.request()

  logout: ->
    navigator.id.logout()

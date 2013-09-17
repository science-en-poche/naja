App = require 'app'

module.exports = App.ApplicationController = Em.Controller.extend
  isAuthenticated: false

  login: ->
    @set 'isAuthenticated', true

  logout: ->
    @set 'isAuthenticated', false

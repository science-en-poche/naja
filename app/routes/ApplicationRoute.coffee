App = require 'app'

module.exports = App.ApplicationRoute = Em.Controller.extend
  model: ->
    console.log 'loading ApplicationRoute model'

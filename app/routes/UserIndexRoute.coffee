App = require 'app'

module.exports = App.UserIndexRoute = Em.Route.extend
  model: (params) ->
    @modelFor('user')

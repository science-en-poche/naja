App = require 'app'

module.exports = App.UserIndexRoute = Em.Route.extend
  model: (params) ->
    App.User.find(params.user_id)

App = require 'app'

module.exports = App.UserIndexRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    console.log 'getting model for user'
    App.User.find(params.user_id)

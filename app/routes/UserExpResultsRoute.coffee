App = require 'app'

module.exports = App.UserExpResultsRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    if @get('isAuthenticated')
      exp = @modelFor('user.exp')
      App.Result.find
        exp_id: exp.id
        access: 'private'

App = require 'app'

module.exports = App.ExpIndexRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    if @get('isAuthenticated')
      exp = @modelFor('exp')
      App.Result.find
        exp_id: exp.id
        access: 'private'

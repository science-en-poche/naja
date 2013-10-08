App = require 'app'

module.exports = App.UserExpResultsRoute = Em.Route.extend
  model: (params) ->
    if @controllerFor('user.exp').get('currentUserHasAccess')
      exp = @modelFor('user.exp')
      App.Result.find
        exp_id: exp.id
        access: 'private'
    else
      null

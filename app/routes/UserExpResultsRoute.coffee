App = require 'app'

module.exports = App.UserExpResultsRoute = Em.Route.extend
  model: (params) ->
    console.log 'getting user.exp.results model'
    exp = @modelFor('user.exp')
    App.Result.find
      exp_id: exp.id
      access: 'private'

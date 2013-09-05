App = require 'app'

module.exports = App.UserExpIndexRoute = Em.Route.extend
  model: (params) ->
    App.Exp.find(params.exp_id)

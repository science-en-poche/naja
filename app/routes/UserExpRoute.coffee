App = require 'app'

module.exports = App.UserExpRoute = Em.Route.extend
  model: (params) ->
    console.log "UserExpRoute, user_id: #{params.user_id}, exp_id: #{params.exp_id}"
    App.Exp.find(params.exp_id)

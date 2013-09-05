App = require 'app'

module.exports = App.UserRoute = Em.Route.extend
  model: (params) ->
    console.log 'UserRoute'
    App.User.find(params.user_id)

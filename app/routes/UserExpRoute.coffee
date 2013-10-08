App = require 'app'

module.exports = App.UserExpRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    user = @modelFor('user')
    hash = CryptoJS.SHA256("#{user.id}/#{params.exp_name}")
    exp_id = hash.toString(CryptoJS.enc.Hex)
    App.Exp.find(exp_id)

  serialize: (model) ->
    exp_name: model.get('name')

  afterModel: (model) ->
    @transitionTo 'user.exp.results'

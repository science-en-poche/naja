App = require 'app'

module.exports = App.ExpRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    owner = App.User.find(params.owner_id)
    hash = CryptoJS.SHA256("#{owner.id}/#{params.exp_name}")
    exp_id = hash.toString(CryptoJS.enc.Hex)
    App.Exp.find(exp_id)

  serialize: (model) ->
    owner_id: model.get('owner.id')
    exp_name: model.get('name')

  afterModel: (model) ->
    @transitionTo 'exp.results'

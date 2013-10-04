App = require 'app'

module.exports = App.IndexRoute = Ember.Route.extend
  setupController: (controller, model) ->
    @_super(controller, model)  # FIXME: is this the correct way to call super?
    controller.set 'users', App.User.find()
    controller.set 'exps', App.Exp.find()

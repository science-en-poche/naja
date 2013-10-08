App = require 'app'

module.exports = App.ApplicationRoute = Ember.Route.extend App.AuthenticatedRouteMixin,
  beforeModel: ->
    # Return a promise here so that Ember resolves it before anything else
    @controllerFor('authentication').resolveCurrentUser()

App = require 'app'

module.exports = App.ApplicationRoute = Em.Route.extend
  model: ->
    # Try to catch a 401 (TODO: clean)
    App.User.find('me')
      .then =>
        console.log 'Authenticated'
        @controllerFor('header').set 'isAuthenticated', true
      , =>
        console.log 'Not authenticated'
        @controllerFor('header').set 'isAuthenticated', false

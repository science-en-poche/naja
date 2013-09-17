App = require 'app'

module.exports = App.ApplicationRoute = Em.Route.extend
  setupController: (controller, model) ->
    # Try to catch a 401 (TODO: clean)
    controller.set 'model',
      App.User.find('me')
        .then ->
          console.log 'Authenticated'
          controller.set 'isAuthenticated', true
        , ->
          console.log 'Not authenticated'
          controller.set 'isAuthenticated', false

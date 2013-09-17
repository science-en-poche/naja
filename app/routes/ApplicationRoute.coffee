App = require 'app'

module.exports = App.ApplicationRoute = Em.Route.extend
  setupController: (controller, model) ->
    # Try to catch a 401 (TODO: clean)
    App.User.find('sl')
      .then (currentUser) ->
        console.log "Authenticated as '#{currentUser.id}'"
        controller.set 'currentUser', currentUser
        controller.set 'isAuthenticated', true
      , ->
        console.log 'Not authenticated'
        controller.set 'isAuthenticated', false

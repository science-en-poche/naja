App = require 'app'

module.exports = App.ApplicationRoute = Em.Route.extend
  setupController: (controller, model) ->
    # Try to catch a 401 (TODO: clean)
    hash =
      url: App.CONFIG.authUrl
      type: 'GET'
      dataType: 'json'
      contentType: 'application/json; charset=utf-8'
      success: (json) ->
        userId = json.user.id
        App.User.find(userId)
        .then (currentUser) ->
          console.log "Authenticated as '#{currentUser.id}'"
          controller.set 'currentUser', currentUser
          controller.set 'isAuthenticated', true
      error: ->
        console.log "Ajax error"
        console.log arguments
    Em.$.ajax(hash)

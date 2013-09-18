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
        App.User.find
          id: json.user.id
          access: 'private'
        .then (currentUsers) ->
          currentUser = currentUsers.get(0)
          console.log "Authenticated as '#{currentUser.id}'"
          controller.set 'currentUser', currentUser
          controller.set 'isAuthenticated', true
      error: (response) ->
        if response.status == 401
          console.log 'Unauthenticated'
          controller.set 'isAuthenticated', false
        else
          alert 'Something went wrong'

    Em.$.ajax(hash)

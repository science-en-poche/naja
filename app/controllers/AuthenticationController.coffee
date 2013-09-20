App = require 'app'

module.exports = App.AuthenticationController = Em.Controller.extend
  isAuthenticated: false

  login: ->
    navigator.id.request()

  logout: ->
    navigator.id.logout()

  onLogin: (assertion) ->
    Em.$.ajax
      url: App.CONFIG.loginUrl
      type: 'POST'
      xhrFields:
        withCredentials: true
      data:
        assertion: assertion
      success: (res, status, xhr) ->
        console.log 'Logged in, reloading...'
        window.location.reload()
      error: (xhr, status, err) ->
        navigator.id.logout()
        alert 'Login failure: ' + err

  onLogout: ->
    Em.$.ajax
      url: App.CONFIG.logoutUrl
      type: 'POST'
      xhrFields:
        withCredentials: true
      success: (res, status, xhr) ->
        console.log 'Logged out, reloading...'
        window.location.reload()
      error: (xhr, status, err) ->
        alert 'Logout failure: ' + err

  personaWatch: ->
    navigator.id.watch
      loggedInUser: @currentUser?.get('personaEmail') || null
      onlogin: @onLogin
      onlogout: @onLogout

  initAuth: ->
    Em.$.ajax
      url: App.CONFIG.meUrl
      type: 'GET'
      xhrFields:
        withCredentials: true
      dataType: 'json'
      contentType: 'application/json; charset=utf-8'
      success: (res, status, xhr) =>
        App.User.find
          ids: [res.user.id]
          access: 'private'
        .then (currentUsers) =>
          currentUser = currentUsers.objectAt(0)
          console.log "Cookie authenticates as '#{currentUser.id}'"
          @set 'currentUser', currentUser
          @set 'isAuthenticated', true
          @personaWatch()
      error: (xhr, status, err) =>
        if xhr.status == 401
          console.log 'Cookie does not authenticate'
          @set 'isAuthenticated', false
          @personaWatch()
        else
          alert 'Something went wrong'

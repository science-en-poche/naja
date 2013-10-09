module.exports = App.AuthenticationController = Em.Controller.extend
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

  personaWatch: (currentUser) ->
    navigator.id.watch
      loggedInUser: currentUser?.get('personaEmail') or null
      onlogin: @onLogin
      onlogout: @onLogout

  resolveCurrentUser: ->
    currentUserPromise = @get('currentUserPromise')
    currentUserPromise ||= Em.RSVP.Promise (resolve, reject) ->
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
            resolve(currentUser)
        error: (xhr, status, err) =>
          if xhr.status == 401
            resolve(null)
          else
            reject('Something went wrong')
            alert('Something went wrong')
    .then (currentUser) =>
      @set('currentUser', currentUser)
      @personaWatch(currentUser)
      if currentUser
        console.log "Cookie authenticates as '#{currentUser.id}'"
      else
        console.log 'Cookie does not authenticate'
    @set 'currentUserPromise', currentUserPromise
    currentUserPromise

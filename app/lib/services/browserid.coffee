config = require 'config'
mediator = require 'mediator'
ServiceProvider = require 'lib/services/service_provider'
User = require 'models/user'

module.exports = class BrowserID extends ServiceProvider
  name: 'browserid'
  baseUrl: config.api.versionRoot

  constructor: ->
    super

  load: ->
    @resolve()
    this

  isLoaded: ->
    yes

  ajax: (type, url, data) ->
    url = @baseUrl + url
    $.ajax {url, data, type, dataType: 'json', xhrFields:
      withCredentials: true}

  # Trigger login popup
  triggerLogin: (loginContext) ->
    navigator.id.get @gotAssertion

  # Callback for the assertion ajax call
  loginHandler: (response, status) =>
    eventPayload = {provider: this, response: response}
    if status is 'error'
      @publishEvent 'loginFail', eventPayload
      alert "login failure: " + status
    else
      # Publish successful login
      @publishEvent 'loginSuccessful', eventPayload

      # Publish the session and the user data
      @getUserData().always([@loginStatusHandler, @processUserData])

  getUserData: ->
    @ajax('get', '/users/me')

  processUserData: (response, status) =>
    if not response or status is 'error'
      return false
    @publishEvent 'userData', response

  getLoginStatus: (callback = @loginStatusHandler, force = false) ->
    @getUserData().always(callback)

  loginStatusHandler: (response, status) =>
    if not response or status is 'error'
      @publishEvent 'logout'
    else
      @publishEvent 'serviceProviderSession',
        _.extend provider: this, response

  gotAssertion: (assertion) =>
    if assertion
      @ajax('post', '/auth/browserid/login',
        assertion: assertion).always(@loginHandler)

  triggerLogout: =>
    navigator.id.logout()

    @ajax('post', '/auth/browserid/logout')
      .always(@logoutHandler)
    false

  logoutHandler: (response, status) =>
    if status isnt 'error'
      @publishEvent 'logoutSuccessful'
    else
      alert "logout failure: " + status
    @publishEvent 'logoutDone'

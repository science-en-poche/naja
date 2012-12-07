config = require 'config'
mediator = require 'mediator'
ServiceProvider = require 'lib/services/service_provider'
User = require 'models/user'

module.exports = class BrowserID extends ServiceProvider
  name: 'browserid'
  baseUrl: config.api.root

  constructor: ->
    super

  load: ->
    @resolve()
    this

  isLoaded: ->
    yes

  ajax: (type, url, data) ->
    url = @baseUrl + url
    $.ajax {url, data, type, dataType: 'json'}

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

      # Reload page
      #location.reload true

  getUserData: ->
    @ajax('get', '/me')

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
        provider: this
        userId: response.userId

  gotAssertion: (assertion) =>
    if assertion
      @ajax('post', '/auth/browserid/login',
        assertion: assertion).always(@loginHandler)

  triggerLogout: =>
    navigator.id.logout()

    @ajax('post', '/auth/browserid/logout')
      .done(@logoutSuccessCallback)
      .fail(@logoutErrorCallback)
    false

  logoutSuccessCallback: ->
    # location.reload true
    false

  logoutErrorCallback: (res, status, xhr) ->
    console.log res
    alert "logout failure: " + status

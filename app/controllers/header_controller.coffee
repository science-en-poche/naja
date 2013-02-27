Controller = require 'controllers/base/controller'
Header = require 'models/header'
HeaderView = require 'views/header_view'
mediator = require 'mediator'

module.exports = class HeaderController extends Controller
  initialize: ->
    super
    @model = new Header()
    @view = new HeaderView({@model})

    @subscribeEvent 'login', @login
    @subscribeEvent 'logoutDone', @logoutDone

    @subscribeEvent 'loginClicked', @triggerLogin
    @subscribeEvent 'logoutClicked', @triggerLogout

  login: (user) =>
    # Did we come from a button click?
    if @loginFromTriggered
      @loginFromTriggered = no

      if !user.get('login_is_set') and window.location.pathname != '/settings/profile'
        # If the login isn't set, go to settings
        window.location = '/settings/profile'
      else if window.location.pathname == '/'
        # If we're at the welcome page, go to user's home
        window.location = "/#{user.get('login')}"
      else
        # Otherwise, just reload the page
        window.location.reload()

    else

      # If the login isn't set, go to settings
      if !user.get('login_is_set') and window.location.pathname != '/settings/profile'
        console.log "redirecting to settings"
        @redirectTo '/settings/profile'

  logoutDone: =>
    if @logoutFromTriggered
      @logoutFromTriggered = no
      window.location = '/'

  triggerLogin: =>
    @loginFromTriggered = yes
    @publishEvent '!login', 'browserid'

  triggerLogout: =>
    @logoutFromTriggered = yes
    @publishEvent '!logout'

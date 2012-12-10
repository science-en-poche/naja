Controller = require 'controllers/base/controller'
Header = require 'models/header'
HeaderView = require 'views/header_view'

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
    if !user.get('name')
      alert('will redirect to settings')
      @redirectTo '/settings/profile'

  logoutDone: =>
    if @logoutFromTriggered
      window.location.reload()
    @logoutFromTriggered = no

  triggerLogin: =>
    @publishEvent '!login', 'browserid'

  triggerLogout: =>
    @logoutFromTriggered = yes
    @publishEvent '!logout'

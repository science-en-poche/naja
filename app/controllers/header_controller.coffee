Controller = require 'controllers/base/controller'
Header = require 'models/header'
HeaderView = require 'views/header_view'

module.exports = class HeaderController extends Controller
  initialize: ->
    super
    @model = new Header()
    @view = new HeaderView({@model})

    #@subscribeEvent 'login', @login
    #@subscribeEvent '!logout', @logout

    @subscribeEvent 'loginClicked', @triggerLogin
    @subscribeEvent 'logoutClicked', @triggerLogout

  #login: (user) =>
    #if !user.name
      #@redirectTo '/settings/profile'
    #else
      #@redirectTo '/home'

  #logout: =>
    #@redirectTo '/'

  triggerLogin: =>
    @publishEvent '!login', 'browserid'

  triggerLogout: =>
    @publishEvent '!logout'

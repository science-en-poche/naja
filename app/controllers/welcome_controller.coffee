Controller = require 'controllers/base/controller'
WelcomePageView = require 'views/welcome_page_view'

module.exports = class WelcomeController extends Controller
  title: 'Welcome'
  historyURL: 'welcome'

  initialize: ->

    @subscribeEvent 'loginTriggered', @loginTriggered
    @subscribeEvent 'login', @login

  loginTriggered: =>
    @loginFromTriggered = yes

  login: (user) =>
    if @loginFromTriggered and user.get('name')
      @redirectTo "/#{user.get('email')}"
    @loginFromTriggered = no

  index: ->
    @view = new WelcomePageView()

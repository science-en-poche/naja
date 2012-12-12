Controller = require 'controllers/base/controller'
WelcomePageView = require 'views/welcome_page_view'

module.exports = class WelcomeController extends Controller
  title: 'Welcome'
  historyURL: 'welcome'

  initialize: ->
    super
    @subscribeEvent 'loginReload', @loginReload

  loginReload: (user) =>
    if user.get('name')
      @redirectTo "/#{user.get('email')}"

  index: ->
    @view = new WelcomePageView()

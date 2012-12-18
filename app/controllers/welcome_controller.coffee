Controller = require 'controllers/base/controller'
WelcomePageView = require 'views/welcome_page_view'

module.exports = class WelcomeController extends Controller
  title: 'Welcome'
  historyURL: 'welcome'

  initialize: ->
    super
    @subscribeEvent 'loginReload', @loginReload

  loginReload: (user) =>
    if user.get('login_is_set')
      @redirectTo "/#{user.get('login')}"

  index: ->
    @view = new WelcomePageView()

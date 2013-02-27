Controller = require 'controllers/base/controller'
WelcomePageView = require 'views/welcome_page_view'

module.exports = class WelcomeController extends Controller
  title: 'Welcome'
  historyURL: 'welcome'

  initialize: ->
    super

  index: ->
    @view = new WelcomePageView()

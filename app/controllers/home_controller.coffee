Controller = require 'controllers/base/controller'
HomePageView = require 'views/home_page_view'

module.exports = class HomeController extends Controller
  title: 'Home'
  historyURL: 'home'

  index: ->
    @view = new HomePageView()

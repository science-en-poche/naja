Controller = require 'controllers/base/controller'
HomePageView = require 'views/home_page_view'
User = require 'models/user'
mediator = require 'mediator'
utils = require 'lib/utils'

module.exports = class HomeController extends Controller
  title: 'Home'
  historyURL: 'home'

  constructor: ->
    super

    # Mixin a Deferred
    _(this).extend $.Deferred()

    utils.deferMethods
      deferred: this
      methods: ['show']

  initialize: ->
    super
    @subscribeEvent 'loginStatus', @loginStatus

  loginStatus: =>
    @resolve()

  show: =>
    @model = new User({email: mediator.user.get('email')})
    @view = new HomePageView({@model})
    @model.fetch()

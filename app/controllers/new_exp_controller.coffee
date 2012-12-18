Controller = require 'controllers/base/controller'
NewExpPageView = require 'views/exp/new_exp_page_view'
User = require 'models/user'
mediator = require 'mediator'
utils = require 'lib/utils'

module.exports = class NewExpController extends Controller
  title: 'New Exp'
  historyURL: 'new-exp'

  constructor: ->
    super

    # Mixin a Deferred
    _(this).extend $.Deferred()

    utils.deferMethods
      deferred: this
      methods: ['show']
      onDeferral: @checkUser

  initialize: ->
    super
    @subscribeEvent 'loginStatus', @loginStatus

  checkUser: =>
    if mediator.user
      @resolve()

  loginStatus: (status) =>
    if status
      @checkUser()

  show: =>
    @model = new User({login: mediator.user.get('login')})
    @view = new NewExpPageView({@model})
    @model.fetch()

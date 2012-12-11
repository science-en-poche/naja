Controller = require 'controllers/base/controller'
UserPageView = require 'views/user/user_page_view'
User = require 'models/user'
mediator = require 'mediator'
utils = require 'lib/utils'

module.exports = class UsersController extends Controller
  title: 'User'
  historyURL: 'user'

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

  show: (params) =>
    @model = new User({email: params.email})
    @view = new UserPageView({@model})
    @model.fetch()

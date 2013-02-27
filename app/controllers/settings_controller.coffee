Controller = require 'controllers/base/controller'
SettingsPageView = require 'views/settings/settings_page_view'
User = require 'models/user'
mediator = require 'mediator'
utils = require 'lib/utils'

module.exports = class SettingsController extends Controller
  title: 'Settings'
  historyURL: 'settings'

  constructor: ->
    super

    # Mixin a Deferred
    _(this).extend $.Deferred()

    utils.deferMethods
      deferred: this
      methods: ['show', 'profile']
      onDeferral: @checkUser

  initialize: ->
    super
    @subscribeEvent 'loginStatus', @loginStatus
    @subscribeEvent 'user:change', @updateUserLogin

  checkUser: =>
    if mediator.user
      @resolve()

  loginStatus: (status) =>
    if status
      @checkUser()

  updateUserLogin: ->
    window.location.reload()

  show: =>
    @redirectTo '/settings/profile'

  profile: =>
    @model = new User({login: mediator.user.get('login')})
    @view = new SettingsPageView({@model})
    @model.fetch()

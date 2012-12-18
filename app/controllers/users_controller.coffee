Controller = require 'controllers/base/controller'
UserPageView = require 'views/user/user_page_view'
User = require 'models/user'
mediator = require 'mediator'
utils = require 'lib/utils'

module.exports = class UsersController extends Controller
  title: 'User'
  historyURL: 'user'

  show: (params) =>
    @model = new User({login: params.login})
    @view = new UserPageView({@model})
    @model.fetch()

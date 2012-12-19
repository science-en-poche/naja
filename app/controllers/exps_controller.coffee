Controller = require 'controllers/base/controller'
ExpPageView = require 'views/exp/exp_page_view'
Exp = require 'models/exp'
mediator = require 'mediator'
utils = require 'lib/utils'

module.exports = class UsersController extends Controller
  title: 'Exp'
  historyURL: 'exp'

  show: (params) =>
    @model = new Exp
      owner:
        login: params.login
      name: params.name
    @view = new ExpPageView({@model})
    @model.fetch()

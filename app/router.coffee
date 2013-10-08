App = require 'app'

App.Router.map ->
  @route 'about'
  @resource 'user', {path: '/:user_id'}, ->
    @resource 'user.index', {path: '/'}
  @resource 'exp', {path: '/:owner_id/:exp_name'}, ->
    @resource 'exp.results', {path: '/results'}

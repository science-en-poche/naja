App = require 'app'


App.Router.map ->
  @resource 'about'
  @resource 'user', {path: '/:user_id'}, ->
    @route 'exp', {path: '/:exp_id'}

App = require 'app'


App.Router.map ->
  @route 'about'
  @resource 'user', {path: '/:user_id'}, ->
    @resource 'user.exp', {path: '/:exp_id'}

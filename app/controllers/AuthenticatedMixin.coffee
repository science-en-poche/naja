App = require 'app'

module.exports = App.AuthenticatedMixin = Em.Mixin.create
  needs: ['authentication']

  currentUser: ((key, value) ->
    authenticationController = @get 'controllers.authentication'
    # Setter
    if arguments.length > 1
      authenticationController.set 'currentUser', value

    # Getter
    authenticationController.get 'currentUser'
  ).property('controllers.authentication.currentUser')

  isAuthenticated: ((key, value) ->
    authenticationController = @get 'controllers.authentication'
    # Setter
    if arguments.length > 1
      authenticationController.set 'isAuthenticated', value

    # Getter
    authenticationController.get 'isAuthenticated'
  ).property('controllers.authentication.isAuthenticated')

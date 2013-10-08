App = require 'app'

module.exports = App.AuthenticatedControllerMixin = Em.Mixin.create
  needs: ['authentication']

  currentUser: ((key, value) ->
    authenticationController = @get 'controllers.authentication'

    # Setter
    if arguments.length > 1
      throw new Error("Can't set 'currentUser' manually")

    # Getter
    authenticationController.get('currentUser')
  ).property('controllers.authentication.currentUser')

  isAuthenticated: ((key, value) ->
    authenticationController = @get 'controllers.authentication'

    # Setter
    if arguments.length > 1
      throw new Error("Can't set 'isAuthenticated' manually")

    # Getter
    authenticationController.get('currentUser')?
  ).property('controllers.authentication.currentUser')

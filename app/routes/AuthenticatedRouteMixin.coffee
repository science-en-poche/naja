App = require 'app'

module.exports = App.AuthenticatedRouteMixin = Em.Mixin.create
  currentUser: ((key, value) ->
    authenticationController = @controllerFor 'authentication'

    # Setter
    if arguments.length > 1
      throw new Error("Can't set 'currentUser' manually")

    # Getter
    authenticationController.get('currentUser')
  ).property('controllers.authentication.currentUser')

  isAuthenticated: ((key, value) ->
    authenticationController = @controllerFor 'authentication'

    # Setter
    if arguments.length > 1
      throw new Error("Can't set 'isAuthenticated' manually")

    # Getter
    authenticationController.get('currentUser')?
  ).property('controllers.authentication.currentUser')

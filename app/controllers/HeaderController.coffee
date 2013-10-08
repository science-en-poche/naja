module.exports = App.HeaderController = Em.Controller.extend App.AuthenticatedControllerMixin,
  login: ->
    navigator.id.request()

  logout: ->
    navigator.id.logout()

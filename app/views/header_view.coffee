View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
  template: template
  id: 'header'
  className: 'header'
  container: '#header-container'
  autoRender: true

  initialize: ->
    super
    @subscribeEvent 'loginStatus', @render
    @subscribeEvent 'startupController', @render

    @delegate 'click', '.browserid-login', @loginClicked
    @delegate 'click', '.browserid-logout', @logoutClicked

  loginClicked: =>
    @publishEvent 'loginClicked'

  logoutClicked: =>
    @publishEvent 'logoutClicked'

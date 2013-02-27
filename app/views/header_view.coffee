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
    @subscribeEvent 'loginStatus', @loginRender
    @subscribeEvent 'loginTriggered', =>
      @loginStatusReload = yes
    @subscribeEvent 'logoutTriggered', =>
      @loginStatusReload = yes

    @delegate 'click', '.browserid-login', @loginClicked
    @delegate 'click', '.browserid-logout', @logoutClicked

  loginRender: =>
    @render() unless @loginStatusReload

  loginClicked: =>
    @publishEvent 'loginClicked'

  logoutClicked: =>
    @publishEvent 'logoutClicked'

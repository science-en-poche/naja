template = require 'views/templates/user'
View = require 'views/base/view'

module.exports = class UserView extends View
  className: 'user'
  tagName: 'div'
  template: template
  autoRender: yes

  initialize: ->
    super
    @modelBind 'change', @render

View = require 'views/base/view'

module.exports = class PageView extends View
  container: '#page-container'
  renderedSubviews: no

  initialize: ->
    super
    if @model or @collection
      rendered = no
      @modelBind 'change', =>
        @render() unless rendered
        rendered = yes

  renderSubviews: ->
    return

  render: ->
    super
    unless @renderedSubviews
      @renderSubviews()
      @renderedSubviews = yes

  dispose: ->
    return if @disposed
    delete this[attr] for attr in ['rendered', 'renderedSubviews']
    super

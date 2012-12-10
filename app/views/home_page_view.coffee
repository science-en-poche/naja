template = require 'views/templates/home_page'
PageView = require 'views/base/page_view'
Collection = require 'models/base/collection'
Exp = require 'models/exp'
ExpsView = require 'views/exp/exps_view'

module.exports = class HomePageView extends PageView
  template: template
  className: 'home-page'

  renderSubviews: ->
    # Main exps collection.
    @exps = new Collection null, model: Exp
    @exps.url = @model.url('/exps/')
    @subview 'exps', new ExpsView
      collection: @exps,
      container: @$('.home-exp-list-container')
    @exps.fetch()

  dispose: ->
    return if @disposed
    ['exps'].forEach (attr) =>
      this[attr].dispose()
      delete this[attr]
    super

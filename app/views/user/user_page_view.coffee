template = require 'views/templates/user_page'
PageView = require 'views/base/page_view'
Collection = require 'models/base/collection'
Exp = require 'models/exp'
ExpsView = require 'views/exp/exps_view'
UserView = require 'views/user/user_view'

module.exports = class UserPageView extends PageView
  template: template
  className: 'user-page'

  renderSubviews: ->
    # User view
    @subview 'user', new UserView
      model: @model
      container: @$('.user-container')

    # Main exps collection.
    @exps = new Collection null, model: Exp
    @exps.url = @model.url('/exps/')
    @subview 'exps', new ExpsView
      collection: @exps,
      container: @$('.user-exp-list-container')
    @exps.fetch()

  dispose: ->
    return if @disposed
    ['exps', 'user'].forEach (attr) =>
      this[attr].dispose()
      delete this[attr]
    super

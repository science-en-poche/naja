template = require 'views/templates/new_exp_page'
PageView = require 'views/base/page_view'
Exp = require 'models/exp'
NewExpFormView = require 'views/exp/new_exp_form_view'
UserView = require 'views/user/user_view'

module.exports = class NewExpPageView extends PageView
  template: template
  className: 'new-exp-page'

  renderSubviews: ->
    @subview 'newExpForm', new NewExpFormView
      model: new Exp({owner: @model}),
      container: @$('.new-exp-form-container')

  dispose: ->
    return if @disposed
    [].forEach (attr) =>
      this[attr].dispose()
      delete this[attr]
    super

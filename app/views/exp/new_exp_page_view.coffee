template = require 'views/templates/new_exp_page'
PageView = require 'views/base/page_view'
Exp = require 'models/exp'
NewExpFormView = require 'views/exp/new_exp_form_view'
UserView = require 'views/user/user_view'

module.exports = class NewExpPageView extends PageView
  template: template
  className: 'new-exp-page'
  autoRender: yes

  renderSubviews: ->
    # User view
    @subview 'user', new UserView
      model: @model
      container: @$('.user-container')

    createNewExp = =>
      newExp = new Exp({owner: @model})
      newExpView = new NewExpFormView
        model: newExp,
        container: @$('.new-exp-form-container')
      newExpView.on 'dispose', =>
        setTimeout createNewExp, 0
      @subview 'newExpForm', newExpView
    createNewExp()

  dispose: ->
    return if @disposed
    [].forEach (attr) =>
      this[attr].dispose()
      delete this[attr]
    super

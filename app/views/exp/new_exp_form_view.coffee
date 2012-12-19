FormView = require 'views/base/form_view'
template = require 'views/templates/new_exp_form'

module.exports = class NewExpFormView extends FormView
  className: 'exp-create'
  saveEvent: 'exp:new'
  template: template

  initialize: ->
    super
    @pass 'name', '.new-exp-name'
    @pass 'description', '.new-exp-description'
    @delegate 'keyup keydown', '.new-exp-name', @changeName
    @delegate 'keyup keydown', '.new-exp-description', @changeDescription
    @delegate 'click', '.new-exp-submit-button', @submit

  submit: =>
    @$el.trigger('submit')
    false

  # Update model data by default, save on ⌘R.
  changeName: (event) =>
    if event.metaKey and event.keyCode is 13
      @submit()
    else
      @model.set(name: $(event.currentTarget).val())

  # Update model data by default, save on ⌘R.
  changeDescription: (event) =>
    @model.set(description: $(event.currentTarget).val())

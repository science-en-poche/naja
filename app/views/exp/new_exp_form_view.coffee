FormView = require 'views/base/form_view'
template = require 'views/templates/new_exp_form'

module.exports = class NewExpFormView extends FormView
  className: 'exp-create form-horizontal'
  saveEvent: 'exp:new'
  template: template

  initialize: ->
    super
    @pass 'name', '.new-exp-name'
    @pass 'description', '.new-exp-description'
    @delegate 'keyup keydown', '.new-exp-name', @changeName
    @delegate 'keyup keydown', '.new-exp-description', @changeDescription

  render: =>
    super
    @newExpName = @$('.new-exp-name')
    @newExpSubmitButton = @$('.new-exp-submit-button')

  saveDone: (response) =>
    super

  saveFail: (response) =>
    super
    responseText = JSON.parse(response.responseText)
    title = 'Oops!'
    content = responseText.message
    if responseText.type == 'NotUniqueError'
      content = 'You already have an exp with this name'
    else
      title += ' There was an unknown error...'
    @newExpName.popover
      trigger: 'manual'
      title: title
      content: content
    @newExpName.popover('show')
    @hasPopOver = true

  saveAlways: (response) =>
    super

  changeName: (event) =>
    oldval = @model.get('name')
    newval = $(event.currentTarget).val()
    if oldval != newval
      @model.set(name: $(event.currentTarget).val())
      @newExpSubmitButton.toggleClass('disabled', !@el.checkValidity())
      if @hasPopOver
        @newExpName.popover('hide')
        @hasPopOver = false

  changeDescription: (event) =>
    @model.set(description: $(event.currentTarget).val())

View = require 'views/base/view'

module.exports = class FormView extends View
  autoRender: yes
  tagName: 'form'

  initialize: ->
    super
    @subscribeEvent 'loginStatus', @render
    @delegate 'click', '.cancel-form', @dismiss
    @delegate 'submit', (event) =>
      event.preventDefault()
      @save event if event.currentTarget.checkValidity()

  render: =>
    super
    @submitButton = @$('.submit-form')

  publishSave: (response) ->
    @publishEvent @saveEvent, response if @saveEvent

  dismiss: (event) =>
    event?.preventDefault()
    @trigger 'dispose'
    @dispose()

  saveDone: (response) =>
    @publishSave response
    @dismiss()

  saveFail: (response) =>

  saveAlways: (response) =>
    @submitButton.button('reset')

  save: (event) =>
    @submitButton.button('loading')
    @model.save()
      .done(@saveDone)
      .fail(@saveFail)
      .always(@saveAlways)

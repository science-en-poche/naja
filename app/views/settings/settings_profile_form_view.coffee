FormView = require 'views/base/form_view'
template = require 'views/templates/settings_profile_form'

module.exports = class SettingsProfileFormView extends FormView
  className: 'settings-profile form-horizontal'
  saveEvent: 'user:change'
  template: template

  initialize: ->
    super
    @pass 'login_claim', '.user-login-claim'
    @delegate 'keyup keydown', '.user-login-claim', @changeLoginClaim

  render: =>
    super
    @loginClaim = @$('.user-login-claim')
    @submitButton = @$('.settings-profile-submit-button')
    if @model.get('login_is_set')
      @loginClaim.val @model.get('login')

  saveDone: (response) =>
    super

  saveFail: (response) =>
    super
    responseText = JSON.parse(response.responseText)
    title = 'Oops!'
    content = responseText.message
    if responseText.type == 'NotUniqueError'
      content = 'Someone else has already chosen that login'
    else
      title += ' There was an unknown error...'
    @loginClaim.popover
      trigger: 'manual'
      title: title
      content: content
    @loginClaim.popover('show')
    @hasPopOver = true

  saveAlways: (response) =>
    super

  changeLoginClaim: (event) =>
    # We use 'login_claim' as the attribute to make sure 'login' isn't set when
    # the model gets PUTed to the server. That way the PUT url is
    # (...)/users/<old-login> instead of (...)/users/<new-login>
    oldval = @model.get('login_claim')
    newval = $(event.currentTarget).val()
    if oldval != newval
      @model.set(login_claim: $(event.currentTarget).val())
      @submitButton.toggleClass('disabled', !@el.checkValidity())
      if @hasPopOver
        @loginClaim.popover('hide')
        @hasPopOver = false

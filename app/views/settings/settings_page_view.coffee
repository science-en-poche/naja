template = require 'views/templates/settings_page'
PageView = require 'views/base/page_view'
SettingsProfileFormView = require 'views/settings/settings_profile_form_view'

module.exports = class SettingsPageView extends PageView
  template: template
  className: 'settings-page'

  renderSubviews: ->
    @subview('settingsProfileForm', new SettingsProfileFormView
      model: @model,
      container: @$('.settings-profile-form-container')
    )

  dispose: ->
    return if @disposed
    [].forEach (attr) =>
      this[attr].dispose()
      delete this[attr]
    super

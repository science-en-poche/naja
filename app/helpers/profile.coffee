module.exports = Em.Handlebars.helper 'profile', (profile, options) ->
  profileResultsUrl = "#{App.CONFIG.api.url}/#{App.CONFIG.api.version}/results?profile_id=#{profile.id}&access=private"
  new Handlebars.SafeString "<code><a title=\"Results by this profile\" href=\"#{profileResultsUrl}\">#{profile.id.slice(0, 10)}</a></code>"
,
  'id'

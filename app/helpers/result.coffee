App = require 'app'

module.exports = Em.Handlebars.helper 'result', (result, options) ->
  resultUrl = "#{App.CONFIG.api.url}/#{App.CONFIG.api.version}/results/#{result.id}?access=private"
  new Handlebars.SafeString "<code><a title=\"Detailed result\" href=\"#{resultUrl}\">#{result.id.slice(0, 10)}</a></code>"
,
  'id'

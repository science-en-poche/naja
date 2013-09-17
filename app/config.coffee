App = require 'app'

# linkTo and action handlebars helpers are looked up if not quoted
Ember.ENV.HELPER_PARAM_LOOKUPS = yes

# some configuration
module.exports = App.CONFIG =
  api:
    url: 'http://api.dev.naja.cc:5000'
    version: 'v1'

App.CONFIG.authUrl = "#{App.CONFIG.api.url}/#{App.CONFIG.api.version}/users/me"

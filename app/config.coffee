# linkTo and action handlebars helpers are looked up if not quoted
Ember.ENV.HELPER_PARAM_LOOKUPS = yes

mode = "{!mode!}"

# API urls
modeMap =
  dev:
    url: 'http://api.dev.naja.cc:5000'
    version: 'v1'
  qa:
    url: 'http://api.qa.naja.cc'
    version: 'v1'
  prod:
    url: 'http://api.naja.cc'
    version: 'v1'

module.exports = App.CONFIG =
  api: modeMap[mode]

App.CONFIG.meUrl = "#{App.CONFIG.api.url}/#{App.CONFIG.api.version}/users/me"
App.CONFIG.loginUrl = "#{App.CONFIG.api.url}/#{App.CONFIG.api.version}/auth/browserid/login"
App.CONFIG.logoutUrl = "#{App.CONFIG.api.url}/#{App.CONFIG.api.version}/auth/browserid/logout"

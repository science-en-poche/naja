config = {api: {}}

heroku_dev = true

if heroku_dev
  config.api.root = 'http://yelandur.herokuapp.com'
else
  re = new RegExp(document.domain.replace(/\./g, '\\.') + '[^\\/]*', 'i')
  domain = document.documentURI.match(re)[0]
  scheme = document.documentURI.match(/^.*\/\//)[0]
  config.api.root = scheme + 'api.' + domain

config.api.versionRoot = config.api.root + '/v1'

module.exports = config

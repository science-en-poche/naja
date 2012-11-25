config = {api: {}}

production = no

config.api.root = if production
  'http://api.naja.io'
else
  'http://dev.naja.io.:3000'

config.api.versionRoot = config.api.root + '/v1'

module.exports = config

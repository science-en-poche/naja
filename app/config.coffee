config = {api: {}}

production = no

config.api.root = if production
  'http://api.naja.org'
else
  'http://dev.naja.org:3000'

config.api.versionRoot = config.api.root + '/v1'

module.exports = config

config = {api: {}}

production = no

config.api.root = if production
  'http://naja.cc/api'
else
  'http://naja.cc/api'

config.api.versionRoot = config.api.root + '/v1'

module.exports = config

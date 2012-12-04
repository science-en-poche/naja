config = {api: {}}

production = no

config.api.root = if production
  'http://api.naja.cc'
else
  'http://dev.naja.cc:3000'

config.api.versionRoot = config.api.root + '/v1'

module.exports = config

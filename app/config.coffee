config = {api: {}}

re = new RegExp('^.*' + document.domain.replace(/\./g, '\\.') + '[^\\/]*', 'i')
origin = document.documentURI.match(re)[0]

config.api.root = origin + '/api'
config.api.versionRoot = config.api.root + '/v1'

module.exports = config

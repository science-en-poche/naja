config = {api: {}}

re = new RegExp(document.domain.replace(/\./g, '\\.') + '[^\\/]*', 'i')
domain = document.documentURI.match(re)[0]
scheme = document.documentURI.match(/^.*\/\//)[0]

config.api.root = scheme + 'api.' + domain
config.api.versionRoot = config.api.root + '/v1'

module.exports = config

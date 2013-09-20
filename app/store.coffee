App = require 'app'

module.exports = App.Store = DS.Store.extend
  revision: 12
  adapter: DS.RESTAdapter.extend
    url: App.CONFIG.api.url
    namespace: App.CONFIG.api.version
    ajax: (url, type, hash) ->
      hash = hash or {}
      hash.xhrFields =
        withCredentials: true
      @_super(url, type, hash)

adapter =  DS.RESTAdapter.extend
  url: App.CONFIG.api.url
  namespace: App.CONFIG.api.version
  ajax: (url, type, hash) ->
    hash = hash or {}
    hash.xhrFields =
      withCredentials: true
    @_super(url, type, hash)

adapter.registerTransform 'object',
  serialize: (value) ->
    value
  deserialize: (value) ->
    if value
      Ember.create(value)
    else
      null

module.exports = App.Store = DS.Store.extend
  revision: 12
  adapter: adapter

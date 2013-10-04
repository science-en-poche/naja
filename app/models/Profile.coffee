App = require 'app'

module.exports = App.Profile = DS.Model.extend
  data: DS.attr 'string'  # FIXME: see if this works to store arbitrary data
  device: DS.belongsTo 'App.Device'
  exp: DS.belongsTo 'App.Exp'
  nResults: DS.attr 'number'
  vkPem: DS.attr 'string'

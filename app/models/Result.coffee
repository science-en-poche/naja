App = require 'app'

module.exports = App.Result = DS.Model.extend
  data: DS.attr 'string'  # FIXME: see if this works to store arbitrary data
  profile: DS.belongsTo 'App.Profile'
  exp: DS.belongsTo 'App.Exp'
  createdAt: DS.attr 'date'  # FIXME: see if this works to store a date

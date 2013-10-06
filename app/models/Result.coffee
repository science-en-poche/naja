App = require 'app'

module.exports = App.Result = DS.Model.extend
  resultData: DS.attr 'object'
  profile: DS.belongsTo 'App.Profile'
  exp: DS.belongsTo 'App.Exp'
  createdAt: DS.attr 'date'

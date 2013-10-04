App = require 'app'

module.exports = App.User = DS.Model.extend
  exps: DS.hasMany 'App.Exp'
  gravatarId: DS.attr 'string'
  nDevices: DS.attr 'number'
  nProfiles: DS.attr 'number'
  nResults: DS.attr 'number'
  nExps: DS.attr 'number'
  userIdIsSet: DS.attr 'boolean'
  personaEmail: DS.attr 'string'

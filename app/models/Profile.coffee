module.exports = App.Profile = DS.Model.extend
  profileData: DS.attr 'object'
  device: DS.belongsTo 'App.Device'
  exp: DS.belongsTo 'App.Exp'
  nResults: DS.attr 'number'
  vkPem: DS.attr 'string'

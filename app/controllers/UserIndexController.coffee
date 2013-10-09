module.exports = App.UserIndexController = Em.ArrayController.extend App.AuthenticatedControllerMixin,
  sortProperties: ['nProfiles', 'nResults']
  sortAscending: false

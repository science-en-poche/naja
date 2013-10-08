module.exports = App.IndexUsersController = Em.ArrayController.extend App.AuthenticatedControllerMixin,
  sortProperties: ['nProfiles', 'nResults']
  sortAscending: false

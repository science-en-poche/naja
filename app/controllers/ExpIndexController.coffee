module.exports = App.ExpIndexController = Em.ArrayController.extend App.AuthenticatedControllerMixin,
  sortProperties: ['createdAt', 'profile.id']
  sortAscending: false

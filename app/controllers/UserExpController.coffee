App = require 'app'

module.exports = App.UserExpController = App.AuthenticatedObjectController.extend
  currentUserHasAccess: (->
    currentId = @get('currentUser.id')
    ownerAuth = currentId == @get('model.owner.id')
    collaborators = @get('model.collaborators')
    if collaborators
      collabAuth = currentId in @get('model.collaborators').map (collaborator) ->
        collaborator.id
    ownerAuth or collabAuth
  ).property('currentUser.id', 'model.owner.id', 'model.collaborators')
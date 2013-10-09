module.exports = App.ExpIndexRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    if @get('isAuthenticated')
      exp = @modelFor('exp')
      # Preload the profiles
      App.Profile.find
        exp_id: exp.id
        access: 'private'
      App.Result.find
        exp_id: exp.id
        access: 'private'

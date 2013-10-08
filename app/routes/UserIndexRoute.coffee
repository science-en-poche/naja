module.exports = App.UserIndexRoute = Em.Route.extend App.AuthenticatedRouteMixin,
  model: (params) ->
    @modelFor('user').get('exps')

Model = require 'models/base/model'
User = require 'models/user'

module.exports = class Exp extends Model
  urlKey: 'name'

  urlPath: ->
    owner = if @owner?
      @owner
    else
      @get('owner')
    login = if owner.login?
      owner.login
    else
      owner.get('login')
    "/users/#{login}/exps/"

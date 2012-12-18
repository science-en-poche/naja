Model = require 'models/base/model'
User = require 'models/user'

module.exports = class Exp extends Model
  urlKey: 'name'

  urlPath: ->
    "/users/#{@get('owner').get('login')}/exps/"

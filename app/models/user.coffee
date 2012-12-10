Model = require 'models/base/model'

module.exports = class User extends Model
  urlKey: 'email'

  urlPath: ->
    '/users/'

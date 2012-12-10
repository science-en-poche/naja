Chaplin = require 'chaplin'
Model = require 'models/base/model'

module.exports = class Collection extends Chaplin.Collection
  model: Model

  initialize: (models, options) ->
    @url = options.url if options?.url?
    super

  dispose: ->
    return if @disposed
    delete @url
    super

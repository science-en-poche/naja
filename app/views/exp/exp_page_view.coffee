template = require 'views/templates/exp_page'
PageView = require 'views/base/page_view'
Collection = require 'models/base/collection'
ResultsCollectionView = require 'views/result/results_collection_view'

module.exports = class ExpPageView extends PageView
  template: template
  className: 'exp-page'

  renderSubviews: ->
    # Main results view.
    @results = new Collection()
    @results.url = @model.url('/results/')
    @subview 'results', new ResultsCollectionView
      collection: @results,
      container: @$('.exp-result-table-container')
    @results.fetch()

  dispose: ->
    return if @disposed
    ['results'].forEach (attr) =>
      this[attr].dispose()
      delete this[attr]
    super

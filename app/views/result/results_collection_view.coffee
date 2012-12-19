CollectionView = require 'views/base/collection_view'
ResultView = require 'views/result/result_view'

module.exports = class ResultsCollectionView extends CollectionView
  className: 'exp-result-table-collection'
  itemView: ResultView
  tagName: 'tbody'

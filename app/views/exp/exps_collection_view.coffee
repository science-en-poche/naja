CollectionView = require 'views/base/collection_view'
ExpView = require 'views/exp/exp_view'

module.exports = class ExpsCollectionView extends CollectionView
  className: 'user-exp-list'
  itemView: ExpView
  tagName: 'div'

CollectionView = require 'views/base/collection_view'
Exp = require 'views/exp/exp_view'

module.exports = class ExpsView extends CollectionView
  className: 'user-exp-list'
  itemView: Exp
  tagName: 'div'

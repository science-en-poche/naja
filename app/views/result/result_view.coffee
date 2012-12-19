View = require 'views/base/view'
template = require 'views/templates/result'

module.exports = class ResultView extends View
  className: 'user-exp-result'
  tagName: 'tr'
  template: template

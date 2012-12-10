View = require 'views/base/view'
template = require 'views/templates/exp'

module.exports = class ExpView extends View
  className: 'user-exp'
  tagName: 'li'
  template: template

View = require 'views/base/view'
template = require 'views/templates/exp'

module.exports = class ExpView extends View
  className: 'media user-exp'
  tagName: 'div'
  template: template

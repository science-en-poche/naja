template = require 'views/templates/welcome_page'
PageView = require 'views/base/page_view'

module.exports = class WelcomePageView extends PageView
  template: template
  className: 'welcome-page'
  autoRender: yes

App = require 'app'

module.exports = App.PersonaView = Em.View.extend
  templateName: 'persona'
  classNames: ['persona']
  click: (event) ->
    console.log 'view clicked'
    navigator.id.request()

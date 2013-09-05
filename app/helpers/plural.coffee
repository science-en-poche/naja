module.exports = Em.Handlebars.helper 'plural', (number, options) ->
  if number == 1
    p = ''
  else
    p = 's'
  "#{number} #{options.hash.word}#{p}"

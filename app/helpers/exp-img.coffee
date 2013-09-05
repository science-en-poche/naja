module.exports = Em.Handlebars.helper 'exp-img', (exp, options) ->
  new Handlebars.SafeString "<img class=\"#{options.hash.class}\"
                                  src=\"img/flask-48.png\">"
